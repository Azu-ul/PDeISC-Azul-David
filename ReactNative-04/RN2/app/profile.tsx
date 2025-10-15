import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  Image, Alert, ActivityIndicator, Platform
} from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as DocumentPicker from 'expo-document-picker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api, { API_URL } from '../config/api';
import CustomModal from "./components/CustomModal";
import ImagePickerModal from "./components/ImagePickerModal";

type User = {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  phone?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  profile_image_url?: string;
  document_image_url?: string | null;
  auth_provider: string;
};

type ProfileFormData = {
  full_name?: string;
  phone?: string;
  email?: string;
};

const profileSchema = yup.object({
  email: yup.string()
    .transform((value) => value?.trim() || '')
    .test('required-if-filled', 'Email requerido', function (value) {
      if (value === undefined || value === '') return true;
      return value.length > 0;
    })
    .test('valid-email', 'Email inválido', function (value) {
      if (!value || value.length === 0) return true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }),
  full_name: yup.string()
    .transform((value) => value?.trim() || '')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre es demasiado largo')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, 'El nombre solo puede contener letras'),
  phone: yup.string()
    .transform((value) => value?.trim() || '')
    .test('min-if-filled', 'El teléfono debe tener al menos 8 caracteres', function (value) {
      if (!value || value.length === 0) return true;
      return value.length >= 8;
    })
    .max(20, 'El teléfono es demasiado largo')
    .matches(/^[\+\d\s\-()]*$/, 'El teléfono solo puede contener números, espacios, paréntesis y guiones'),
}).required();

export default function Profile() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingDocument, setLoadingDocument] = useState(false);
  const [deletingDocument, setDeletingDocument] = useState(false);
  const [loadingProfileImage, setLoadingProfileImage] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingLocation, setUpdatingLocation] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [locationSaved, setLocationSaved] = useState(false);

  const [editingUsername, setEditingUsername] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteDocumentModalVisible, setDeleteDocumentModalVisible] = useState(false);
  const [deleteCountdown, setDeleteCountdown] = useState(10);
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      full_name: '',
      phone: '',
    }
  });

  const getToken = async () => {
    if (params.token) {
      const urlToken = Array.isArray(params.token) ? params.token[0] : params.token;
      await AsyncStorage.setItem('token', urlToken);
      return urlToken;
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      router.replace('/welcome');
    }
    return token;
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (deleteModalVisible && deleteCountdown > 0) {
      interval = setInterval(() => {
        setDeleteCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [deleteModalVisible, deleteCountdown]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('🎯 Profile screen focused - loading user profile');
      loadUserProfile();
      return () => {
        console.log('👋 Profile screen unfocused');
      };
    }, [])
  );

  const requestPermissions = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    await ImagePicker.requestCameraPermissionsAsync();
    await Location.requestForegroundPermissionsAsync();
  };

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading user profile...');
      const token = await getToken();

      if (!token) {
        console.log('❌ No token found, redirecting to welcome');
        router.replace('/welcome');
        return;
      }

      console.log('📡 Fetching fresh user profile from server...');
      const res = await api.get('/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const userData = res.data.user;
      console.log('👤 User data from server:', userData);

      setUser(userData);
      setUsername(userData.username || '');
      setFullName(userData.full_name || '');
      setPhone(userData.phone || '');
      setEmail(userData.email || '');
      setAddress(userData.address || '');

      // Actualizar valores del formulario
      setValue('email', userData.email || '');
      setValue('full_name', userData.full_name || '');
      setValue('phone', userData.phone || '');

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      console.log('💾 User profile saved to AsyncStorage');
    } catch (error) {
      console.error('❌ Error loading profile:', error);
      router.replace('/');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUsername = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }

    if (username.length < 3) {
      Alert.alert('Error', 'El nombre debe tener al menos 3 caracteres');
      return;
    }

    try {
      setUpdatingProfile(true);
      const res = await api.put('/user/username', { username: username.trim() });
      const updatedUser = { ...user, username: res.data.user.username };
      setUser(updatedUser as User);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setEditingUsername(false);
      Alert.alert('Éxito', 'Nombre actualizado correctamente');
    } catch (error: any) {
      const message = error?.response?.data?.error || 'Error al actualizar nombre';
      Alert.alert('Error', message);
      setUsername(user?.username || '');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleCancelUsernameEdit = () => {
    setUsername(user?.username || '');
    setEditingUsername(false);
  };

  const handleUpdateProfile = async (data: ProfileFormData) => {
    try {
      setUpdatingProfile(true);

      const payload: any = {};

      if (user?.auth_provider === 'local' && data.email?.trim()) {
        payload.email = data.email.trim();
      }

      if (data.full_name?.trim()) {
        payload.full_name = data.full_name.trim();
      }

      if (data.phone?.trim()) {
        payload.phone = data.phone.trim();
      }

      if (Object.keys(payload).length === 0) {
        Alert.alert('Error', 'No hay datos para actualizar');
        setUpdatingProfile(false);
        return;
      }

      console.log('📤 Enviando al servidor:', payload);
      const res = await api.put('/user/profile', payload);
      console.log('✅ Respuesta del servidor:', res.data.user);

      const updatedUser = res.data.user;
      setUser(updatedUser);
      setEmail(updatedUser.email || '');
      setFullName(updatedUser.full_name || '');
      setPhone(updatedUser.phone || '');

      // Actualizar formulario
      setValue('email', updatedUser.email || '');
      setValue('full_name', updatedUser.full_name || '');
      setValue('phone', updatedUser.phone || '');

      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      Alert.alert('Éxito', 'Perfil actualizado correctamente');

      // Mostrar "Guardado!" por 5 segundos
      setProfileSaved(true);
      setTimeout(() => {
        setProfileSaved(false);
      }, 5000);
    } catch (error: any) {
      console.error('❌ Error:', error?.response?.data);
      Alert.alert('Error', error?.response?.data?.error || 'Error al actualizar perfil');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const pickImageWeb = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        await uploadProfileImage(file);
      }
    };
    input.click();
  };

  const pickImageMobile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled && result.assets[0]) {
        await uploadProfileImageMobile(result.assets[0].uri);
      }
    } catch (error) {
      console.error('❌ Error in pickImageMobile:', error);
    }
  };

  const takePhoto = async () => {
    if (Platform.OS === 'web') {
      return pickImageWeb();
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled && result.assets[0]) {
        await uploadProfileImageMobile(result.assets[0].uri);
      }
    } catch (error) {
      console.error('❌ Error in takePhoto:', error);
    }
  };

  const pickImage = () => {
    if (Platform.OS === 'web') {
      pickImageWeb();
    } else {
      pickImageMobile();
    }
  };

  const uploadProfileImage = async (file: File) => {
    try {
      setLoadingProfileImage(true);
      const formData = new FormData();
      formData.append('image', file);

      const token = await AsyncStorage.getItem('token');
      const url = `${API_URL}/user/profile-image`;

      console.log('📤 Subiendo imagen a:', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al subir la imagen');
      }

      const data = await response.json();
      console.log('✅ Respuesta del servidor:', data);

      const updatedUser = { ...user, profile_image_url: data.profile_image_url };
      setUser(updatedUser as User);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      Alert.alert('Éxito', 'Foto de perfil actualizada');
    } catch (err: any) {
      console.error('❌ Error:', err.message);
      Alert.alert('Error', err.message || 'No se pudo subir la imagen');
    } finally {
      setLoadingProfileImage(false);
    }
  };

  const uploadProfileImageMobile = async (uri: string) => {
    try {
      setLoadingProfileImage(true);
      const filename = uri.split('/').pop() || 'photo.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      const formData = new FormData();
      const fileObject = {
        uri: Platform.OS === 'ios' && !uri.startsWith('file://') ? `file://${uri}` : uri,
        name: filename,
        type: type,
      };

      formData.append('image', fileObject as any);
      const token = await AsyncStorage.getItem('token');
      const url = `${API_URL}/user/profile-image`;

      console.log('📤 Subiendo imagen (mobile) a:', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al subir la imagen');
      }

      const data = await response.json();
      console.log('✅ Respuesta del servidor:', data);

      const updatedUser = { ...user, profile_image_url: data.profile_image_url };
      setUser(updatedUser as User);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      Alert.alert('Éxito', 'Foto de perfil actualizada');
    } catch (err: any) {
      console.error('❌ Error:', err.message);
      Alert.alert('Error', err.message || 'No se pudo subir la imagen');
    } finally {
      setLoadingProfileImage(false);
    }
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadDocument(result.assets[0].uri, result.assets[0].name);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar el documento');
    }
  };

  const uploadDocument = async (uri: string, filename: string) => {
    try {
      setLoadingDocument(true);
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? (match[1] === 'pdf' ? 'application/pdf' : `image/${match[1]}`) : 'image/jpeg';

      const formData = new FormData();

      if (Platform.OS === 'web') {
        const response = await fetch(uri);
        const blob = await response.blob();
        formData.append('document', blob, filename);
      } else {
        formData.append('document', {
          uri: Platform.OS === 'ios' && !uri.startsWith('file://') ? `file://${uri}` : uri,
          name: filename,
          type: type,
        } as any);
      }

      const token = await AsyncStorage.getItem('token');
      const url = `${API_URL}/user/document-image`;

      const uploadResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await uploadResponse.json();

      if (uploadResponse.ok) {
        const updatedUser = { ...user, document_image_url: responseData.document_image_url };
        setUser(updatedUser as User);
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        Alert.alert('Éxito', 'Documento subido correctamente');
      } else {
        throw new Error(responseData.error || 'Error al subir documento');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo subir el documento');
    } finally {
      setLoadingDocument(false);
    }
  };

  // Función para abrir el modal de confirmación
  const handleOpenDeleteDocumentModal = () => {
    setDeleteDocumentModalVisible(true);
  };

  const handleDeleteDocument = async () => {
    try {
      setDeletingDocument(true);
      setDeleteDocumentModalVisible(false); // Cerrar modal

      const token = await AsyncStorage.getItem('token');
      const url = `${API_URL}/user/document-image`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedUser = {
          ...user,
          document_image_url: null
        } as User;

        setUser(updatedUser);
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        Alert.alert('Éxito', 'Documento eliminado correctamente');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar documento');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo eliminar el documento');
    } finally {
      setDeletingDocument(false);
    }
  };

  const getAddressFromCoords = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'AuthApp/1.0',
          'Accept-Language': 'es'
        }
      });

      if (response.ok) {
        const data = await response.json();

        if (data.address) {
          const addr = data.address;
          const parts = [];

          if (addr.road) parts.push(addr.road);
          if (addr.house_number) parts.push(addr.house_number);
          if (addr.neighbourhood) parts.push(addr.neighbourhood);
          if (addr.suburb) parts.push(addr.suburb);
          if (addr.city || addr.town || addr.village) {
            parts.push(addr.city || addr.town || addr.village);
          }
          if (addr.state) parts.push(addr.state);
          if (addr.postcode) parts.push(`CP ${addr.postcode}`);
          if (addr.country) parts.push(addr.country);

          if (parts.length > 0) {
            return parts.filter(p => p).join(', ');
          }

          if (data.display_name) {
            return data.display_name;
          }
        }
      }

      return `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;

    } catch (error) {
      console.error('Error en geocodificación:', error);
      return `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;
    }
  };

  const handleUpdateLocation = async () => {
    try {
      if (!address.trim()) {
        Alert.alert('Error', 'Ingresa una dirección');
        return;
      }

      setUpdatingLocation(true);

      const res = await api.put('/user/location', {
        latitude: user?.latitude || 0,
        longitude: user?.longitude || 0,
        address: address.trim()
      });

      const updatedUser = { ...user, address: address.trim() };
      setUser(updatedUser as User);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      Alert.alert('Éxito', 'Ubicación actualizada');

      // Mostrar "Guardado!" por 5 segundos
      setLocationSaved(true);
      setTimeout(() => {
        setLocationSaved(false);
      }, 5000);
    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.error || 'Error al actualizar ubicación');
    } finally {
      setUpdatingLocation(false);
    }
  };

  const handleGetLocation = async () => {
    try {
      setLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita acceso a la ubicación');
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = location.coords;

      const addressStr = await getAddressFromCoords(latitude, longitude);

      const res = await api.put('/user/location', {
        latitude,
        longitude,
        address: addressStr
      });

      const updatedUser = { ...user, latitude, longitude, address: addressStr };
      setUser(updatedUser as User);
      setAddress(addressStr);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      Alert.alert('Éxito', `Ubicación actualizada\n${addressStr}`);
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      Alert.alert('Error', 'No se pudo obtener la ubicación');
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setLogoutModalVisible(false);
    router.replace('/');
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete('/user/account');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setDeleteModalVisible(false);
      Alert.alert('Cuenta eliminada', 'Tu cuenta ha sido eliminada permanentemente');
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.error || 'No se pudo eliminar la cuenta');
    }
  };

  const openDeleteModal = () => {
    setDeleteCountdown(10);
    setDeleteModalVisible(true);
  };

  const handleProfileImagePress = () => {
    setImagePickerModalVisible(true);
  };

  const getProfileImageUrl = () => {
    console.log('🔍 === DEBUG PROFILE IMAGE ===');
    console.log('User object:', JSON.stringify(user, null, 2));
    console.log('Profile image URL from user:', user?.profile_image_url);

    if (!user?.profile_image_url) {
      console.log('❌ No profile_image_url found');
      return null;
    }

    let finalUrl = user.profile_image_url;

    if (finalUrl.includes('googleusercontent.com')) {
      finalUrl = finalUrl.replace(/=s\d+-c/, '=s400-c');
      console.log('✅ Google image URL (modified):', finalUrl);
      return finalUrl;
    }

    if (finalUrl.startsWith('http://') || finalUrl.startsWith('https://')) {
      console.log('✅ External image URL:', finalUrl);
      return finalUrl;
    }

    const baseUrl = API_URL.replace('/api', '');
    finalUrl = `${baseUrl}${user.profile_image_url}`;
    console.log('🖼️ Local image URL:', finalUrl);

    return finalUrl;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={handleProfileImagePress}>
          {(() => {
            const imageUrl = getProfileImageUrl();
            console.log('🎨 Rendering with URL:', imageUrl);

            if (imageUrl) {
              return (
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.profileImage}
                  onLoadStart={() => console.log('⏳ Image loading started...')}
                  onLoad={() => console.log('✅ Image loaded successfully!')}
                  onError={(e) => {
                    console.error('❌ Image load error:', e.nativeEvent);
                    console.error('Failed URL:', imageUrl);
                  }}
                />
              );
            } else {
              return (
                <View style={styles.profileImagePlaceholder}>
                  <Text style={styles.profileImageText}>
                    {user?.username?.[0]?.toUpperCase() ||
                      user?.email?.[0]?.toUpperCase() || '?'}
                  </Text>
                </View>
              );
            }
          })()}

          <View style={styles.editBadge}>
            <Text style={styles.editBadgeText}>✏️</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.usernameContainer}>
          {editingUsername ? (
            <View style={styles.usernameEditContainer}>
              <TextInput
                style={styles.usernameInput}
                value={username}
                onChangeText={setUsername}
                placeholder="Tu nombre..."
                autoCapitalize="words"
                autoFocus
                onSubmitEditing={handleUpdateUsername}
                returnKeyType="done"
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleUpdateUsername}
                disabled={updatingProfile}
              >
                {updatingProfile ? (
                  <ActivityIndicator size="small" color="#4CAF50" />
                ) : (
                  <Text style={styles.saveIcon}>💾</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleCancelUsernameEdit}
              >
                <Text style={styles.cancelIcon}>✕</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.usernameViewContainer}>
              <Text style={styles.username}>{user?.username}</Text>
              <TouchableOpacity
                style={styles.editIconButton}
                onPress={() => setEditingUsername(true)}
              >
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Información Personal</Text>
        </View>

        {user?.auth_provider === 'local' && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text);
                      setEmail(text);
                    }}
                    onBlur={onBlur}
                    placeholder="Email..."
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  )}
                </>
              )}
            />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre y apellido</Text>
          <Controller
            control={control}
            name="full_name"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    setFullName(text);
                  }}
                  onBlur={onBlur}
                  placeholder="Nombre y apellido..."
                />
                {errors.full_name && (
                  <Text style={styles.errorText}>{errors.full_name.message}</Text>
                )}
              </>
            )}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Teléfono</Text>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    setPhone(text);
                  }}
                  onBlur={onBlur}
                  placeholder="Teléfono..."
                  keyboardType="phone-pad"
                />
                {errors.phone && (
                  <Text style={styles.errorText}>{errors.phone.message}</Text>
                )}
              </>
            )}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, profileSaved && styles.saveButtonSuccess]}
          onPress={handleSubmit(handleUpdateProfile)}
          disabled={updatingProfile || profileSaved}
        >
          {updatingProfile ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.saveButtonText}>
              {profileSaved ? '✓ ¡Guardado!' : '💾 Guardar cambios'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dirección</Text>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Tu dirección..."
            multiline
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.actionButtonHalf,
              locationSaved && styles.saveButtonSuccess
            ]}
            onPress={handleUpdateLocation}
            disabled={updatingLocation || locationSaved}
          >
            {updatingLocation ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.actionButtonText}>
                {locationSaved ? '✓ ¡Guardado!' : '💾 Guardar dirección'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonHalf, styles.actionButtonGPS]}
            onPress={handleGetLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.actionButtonText}>📍 Mi ubicación</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, styles.documentTitle]}>Documento de Identidad</Text>

        {user?.document_image_url ? (
          <View style={styles.documentPreview}>
            <Text style={styles.documentText}>✓ Documento cargado</Text>
            <Image
              source={{
                uri: user.document_image_url.startsWith('http')
                  ? user.document_image_url
                  : `${API_URL.replace('/api', '')}${user.document_image_url}`
              }}
              style={styles.documentThumbnail}
              resizeMode="cover"
            />

            {/* Botones cuando SÍ hay documento */}
            <View style={styles.documentButtonsRow}>
              <TouchableOpacity
                style={[styles.documentButton, styles.changeDocumentButton]}
                onPress={handlePickDocument}
                disabled={loadingDocument}
              >
                {loadingDocument ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.documentButtonText}>🔄 Cambiar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.documentButton, styles.deleteDocumentButton]}
                onPress={handleOpenDeleteDocumentModal}
                disabled={deletingDocument}
              >
                {deletingDocument ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.documentButtonText}>🗑️ Eliminar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* Botón cuando NO hay documento */
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handlePickDocument}
            disabled={loadingDocument}
          >
            {loadingDocument ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.actionButtonText}>📄 Subir documento</Text>
            )}
          </TouchableOpacity>
        )}

        <Text style={styles.helperText}>Imágenes (JPEG, PNG) o PDF - Máx. 5MB</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setLogoutModalVisible(true)}
      >
        <Text style={styles.logoutButtonText}>(·•᷄_•᷅ ) Cerrar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={openDeleteModal}
      >
        <Text style={styles.deleteButtonText}>🗑️ Eliminar cuenta</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/welcome')}>
          <Text style={styles.backLink}>← Volver</Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        visible={logoutModalVisible}
        type="delete"
        title="Cerrar sesión"
        message="¿Seguro que querés salir?"
        confirmText="Sí, salir"
        cancelText="Cancelar"
        showCancel={true}
        onConfirm={handleLogout}
        onCancel={() => setLogoutModalVisible(false)}
      />

      <CustomModal
        visible={deleteModalVisible}
        type="delete"
        title="⚠️ Eliminar cuenta"
        message={`Esta acción es IRREVERSIBLE. Se eliminarán todos tus datos permanentemente.\n\n${deleteCountdown > 0 ? `Espera ${deleteCountdown} segundos para continuar...` : 'Ahora puedes confirmar la eliminación.'}`}
        confirmText={deleteCountdown > 0 ? `Espera (${deleteCountdown}s)` : "Sí, eliminar mi cuenta"}
        cancelText="Cancelar"
        showCancel={true}
        onConfirm={deleteCountdown === 0 ? handleDeleteAccount : undefined}
        onCancel={() => {
          setDeleteModalVisible(false);
          setDeleteCountdown(10);
        }}
      />

      <CustomModal
        visible={deleteDocumentModalVisible}
        type="delete"
        title="Eliminar documento"
        message="¿Estás seguro de que querés eliminar tu documento de identidad? Esta acción no se puede deshacer."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        showCancel={true}
        onConfirm={handleDeleteDocument}
        onCancel={() => setDeleteDocumentModalVisible(false)}
      />

      <ImagePickerModal
        visible={imagePickerModalVisible}
        onClose={() => setImagePickerModalVisible(false)}
        onTakePhoto={takePhoto}
        onChooseGallery={pickImage}
        onCaptureWebcam={uploadProfileImage}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F3',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    maxWidth: 480,
    padding: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F3',
  },
  header: {
    backgroundColor: '#FA8072',
    padding: 14,
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 14,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 95,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 95,
    backgroundColor: '#FFB6A3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileImageText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FA8072',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  editBadgeText: {
    fontSize: 14,
  },
  usernameContainer: {
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
  },
  usernameViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  usernameEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  usernameInput: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    borderWidth: 1,
    borderColor: '#FFB6A3',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    minWidth: 120,
    textAlign: 'center',
  },
  editIconButton: {
    padding: 4,
  },
  editIcon: {
    fontSize: 14,
  },
  iconButton: {
    padding: 6,
    backgroundColor: '#FFF5F3',
    borderRadius: 6,
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveIcon: {
    fontSize: 16,
  },
  cancelIcon: {
    fontSize: 16,
    color: '#E74C3C',
  },
  email: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FA8072',
    marginBottom: 0,
  },
  documentTitle: {
    marginBottom: 12,
  },
  editButton: {
    color: '#FA8072',
    fontSize: 13,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFB6A3',
    padding: 8,
    borderRadius: 7,
    fontSize: 13,
    marginTop: 12,
    backgroundColor: '#fff',
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  actionButton: {
    backgroundColor: '#FA8072',
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 0,
  },
  actionButtonHalf: {
    flex: 1,
  },
  actionButtonGPS: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#FA8072',
    padding: 12,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 6,
  },
  saveButtonSuccess: {
    backgroundColor: '#4CAF50',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FA8072',
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 6,
  },
  secondaryButtonText: {
    color: '#FA8072',
    fontSize: 12,
    fontWeight: '600',
  },
  locationInfo: {
    backgroundColor: '#FFF5F3',
    padding: 10,
    borderRadius: 7,
    marginBottom: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  documentButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    width: '100%',
  },
  documentButton: {
    flex: 1,
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
  },
  changeDocumentButton: {
    backgroundColor: '#FA8072', // Coral
  },
  deleteDocumentButton: {
    backgroundColor: '#E74C3C', // Rojo
  },
  documentButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  documentPreview: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 7,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
  },
  documentText: {
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 12,
  },
  documentThumbnail: {
    width: 150,
    height: 110,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  helperText: {
    fontSize: 11,
    color: '#999',
    marginTop: 6,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E74C3C',
    margin: 12,
    marginBottom: 8,
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    width: '90%',
    maxWidth: 480,
  },
  logoutButtonText: {
    color: '#E74C3C',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    margin: 12,
    marginTop: 0,
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    width: '90%',
    maxWidth: 480,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#FFF5F3',
    width: '90%',
    maxWidth: 480,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFB6A3',
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#FA8072',
    fontWeight: '500',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 11,
    marginTop: 4,
    marginBottom: 4,
  },
  footer: {
    padding: 12,
    alignItems: 'center',
  },
  backLink: {
    color: '#FA8072',
    fontSize: 13,
    fontWeight: '500',
  },
});