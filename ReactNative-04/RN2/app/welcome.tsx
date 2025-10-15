import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { API_URL } from '../config/api';
import CustomModal from './components/CustomModal';

type User = {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  profile_image_url?: string;
  auth_provider?: string;
};

export default function Welcome() {
  const { user, token } = useLocalSearchParams();
  const router = useRouter();
  const [userObj, setUserObj] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    loadUserData();
  }, [user, token]);

  const loadUserData = async () => {
    try {
      setLoading(true);

      if (user) {
        try {
          const parsed: User = JSON.parse(user as string);
          setUserObj(parsed);
          await AsyncStorage.setItem('user', user as string);
        } catch (e) {
          console.error('Error parsing user from URL:', e);
        }
      }

      if (token) {
        const tokenStr = Array.isArray(token) ? token[0] : token;
        await AsyncStorage.setItem('token', tokenStr);
      }

      if (!user) {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');

        if (storedUser) {
          const parsed: User = JSON.parse(storedUser);
          setUserObj(parsed);
        } else if (storedToken) {
          try {
            const res = await api.get('/user/profile', {
              headers: { 'Authorization': `Bearer ${storedToken}` }
            });
            const userData = res.data.user;
            setUserObj(userData);
            await AsyncStorage.setItem('user', JSON.stringify(userData));
          } catch (error) {
            console.error('Error fetching user profile:', error);
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
          }
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setLogoutModalVisible(true);

  const goToProfile = () => {
    router.push('/profile');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FA8072" />
      </View>
    );
  }

  if (!userObj) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>No hay sesión activa</Text>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => router.replace('/')}
          >
            <Text style={styles.primaryButtonText}>Ir al inicio</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.profileSection}>
            {userObj?.profile_image_url ? (
              <Image
                source={{
                  uri: userObj.profile_image_url.startsWith('http')
                    ? userObj.profile_image_url
                    : `${API_URL.replace('/api', '')}${userObj.profile_image_url}`
                }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImageText}>
                  {userObj?.full_name?.[0]?.toUpperCase() || userObj?.username?.[0]?.toUpperCase() || '?'}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>
            ¡Bienvenido, {userObj?.full_name || userObj?.username || 'Usuario'}!
          </Text>

          <Text style={styles.email}>{userObj?.email}</Text>

          {userObj?.auth_provider && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {userObj.auth_provider === 'google' ? 'Autenticado con Google ✮⋆˙' :
                    'Cuenta creada localmente'}
              </Text>
            </View>
          )}

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>⋆✴︎˚｡⋆ Tu cuenta está lista!</Text>
            <Text style={styles.infoText}>
              Gestiona tu perfil, actualiza tu información personal, sube tu foto y documento.
            </Text>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={goToProfile}>
            <Text style={styles.primaryButtonText}>❤︎ Ver mi perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>(·•᷄_•᷅ ) Cerrar sesión</Text>
          </TouchableOpacity>

          <CustomModal
            visible={logoutModalVisible}
            type="delete"
            title="Cerrar sesión"
            message="¿Estás seguro que deseas cerrar sesión?"
            confirmText="Sí, salir"
            cancelText="Cancelar"
            showCancel={true}
            onConfirm={async () => {
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('user');
              setLogoutModalVisible(false);
              router.replace('/'); 
            }}
            onCancel={() => setLogoutModalVisible(false)}
          />

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F3',
    padding: 14
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F3',
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center'
  },
  profileSection: {
    marginBottom: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FA8072',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFB6A3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FA8072',
  },
  profileImageText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
    textAlign: 'center',
    color: '#FA8072',
    fontWeight: 'bold'
  },
  email: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center'
  },
  badge: {
    backgroundColor: '#FFF5F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFB6A3',
  },
  badgeText: {
    fontSize: 11,
    color: '#FA8072',
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: '#FA8072',
    padding: 11,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E74C3C',
    padding: 11,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  logoutButtonText: {
    color: '#E74C3C',
    fontSize: 13,
    fontWeight: '600',
  },
});