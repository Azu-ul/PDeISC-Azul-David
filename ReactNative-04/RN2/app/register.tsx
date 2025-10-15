import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as WebBrowser from 'expo-web-browser';
import api, { API_URL } from '../config/api';
import { Platform } from 'react-native';
import GoogleIcon from '../assets/google-icon.png';
import CustomModal from './components/CustomModal';

WebBrowser.maybeCompleteAuthSession();

type FormData = {
  username: string;
  email: string;
  full_name: string;
  password: string;
  password2: string;
};

const schema = yup.object({
  username: yup.string()
    .required('Nombre requerido')
    .min(3, 'Mínimo 3 caracteres'),
  email: yup.string()
    .required('Email requerido')
    .email('Email inválido')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'El email debe contener @ y un dominio válido (ej: usuario@dominio.com)'
    ),
  full_name: yup.string()
    .required('Nombre completo requerido')
    .min(3, 'Mínimo 3 caracteres'),
  password: yup.string()
    .required('Contraseña requerida')
    .min(6, 'Mínimo 6 caracteres'),
  password2: yup.string()
    .required('Confirmación requerida')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
});

export default function Register() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'info' | 'delete'>('info');
  const [modalTitle, setModalTitle] = useState('Aviso');
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const isMobile = screenWidth < 768;

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched'
  });

  useEffect(() => {
    if (Platform.OS !== 'web') {
      if (params.token && params.user) {
        handleOAuthCallback(params.token as string, params.user as string);
      }
      if (params.error) {
        if (params.error === 'account_exists') {
          const provider = params.provider as string;
          showModal(
            'delete',
            'Cuenta Existente',
            `Esta cuenta ya está registrada con ${provider === 'local' ? 'contraseña' : 'Google'}. Por favor, inicia sesión en lugar de registrarte.`
          );
        } else {
          showModal('delete', 'Error', 'No se pudo completar el registro con Google');
        }
      }
    }
  }, [params]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleMessage = (event: MessageEvent) => {
        console.log('📨 Message received in register:', event.data);
        
        const clientUrl = API_URL.replace('/api', '');
        if (event.origin !== clientUrl && event.origin !== window.location.origin) {
          console.warn('⚠️ Message from untrusted origin:', event.origin);
          return;
        }

        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          console.log('✅ Google auth success');
          handleOAuthCallback(event.data.token, event.data.user);
        } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          console.log('❌ Google auth error:', event.data);
          if (event.data.error === 'account_exists') {
            const provider = event.data.provider || 'local';
            console.log('🚫 Account exists with provider:', provider);
            showModal(
              'delete',
              'Cuenta Existente',
              `Esta cuenta ya está registrada con ${provider === 'local' ? 'contraseña' : 'Google'}. Por favor, inicia sesión en lugar de registrarte.`
            );
          } else {
            showModal('delete', 'Error', 'No se pudo completar el registro con Google');
          }
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, []);

  const showModal = (type: 'info' | 'delete', title: string, message: string) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleOAuthCallback = async (token: string, userStr: string) => {
    try {
      await AsyncStorage.setItem('token', token);
      const user = JSON.parse(decodeURIComponent(userStr));
      await AsyncStorage.setItem('user', JSON.stringify(user));

      router.replace({
        pathname: '/welcome',
        params: { user: JSON.stringify(user) }
      });
    } catch (error) {
      showModal('delete', 'Error', 'Error al procesar el registro');
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const payload = {
        username: data.username,
        email: data.email,
        full_name: data.full_name,
        password: data.password
      };
      const res = await api.post('/auth/register', payload);
      const { token, user } = res.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      router.replace({
        pathname: '/welcome',
        params: { user: JSON.stringify(user) }
      });
    } catch (err: any) {
      const errorMsg = err?.response?.data?.error || 'Error al registrar';
      showModal('delete', 'Error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      if (Platform.OS === 'web') {
        const width = 500;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
          `${API_URL}/auth/google`,
          'Google Register',
          `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
        );

        if (!popup) {
          showModal(
            'delete',
            'Error',
            'No se pudo abrir la ventana de autenticación. Verifica que no estés bloqueando popups.'
          );
        }
      } else {
        const result = await WebBrowser.openAuthSessionAsync(
          `${API_URL}/auth/google`,
          'authapp://'
        );
      }
    } catch (error) {
      showModal('delete', 'Error', 'No se pudo registrar con Google');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>

          <View style={isMobile ? styles.columnLayout : styles.rowLayout}>
            <View style={isMobile ? styles.fullWidth : styles.halfWidth}>
              <Controller
                control={control}
                name="username"
                defaultValue=""
                render={({ field: { onChange, value, onBlur } }) => (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Usuario"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      autoCapitalize="words"
                    />
                    {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}
                  </>
                )}
              />
            </View>

            <View style={isMobile ? styles.fullWidth : styles.halfWidth}>
              <Controller
                control={control}
                name="full_name"
                defaultValue=""
                render={({ field: { onChange, value, onBlur } }) => (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Nombre y apellido"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      autoCapitalize="words"
                    />
                    {errors.full_name && <Text style={styles.error}>{errors.full_name.message}</Text>}
                  </>
                )}
              />
            </View>
          </View>

          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field: { onChange, value, onBlur } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  autoCapitalize="none"
                />
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
              </>
            )}
          />

          <View style={isMobile ? styles.columnLayout : styles.rowLayout}>
            <View style={isMobile ? styles.fullWidth : styles.halfWidth}>
              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field: { onChange, value, onBlur } }) => (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Contraseña"
                      secureTextEntry
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                    />
                    {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                  </>
                )}
              />
            </View>

            <View style={isMobile ? styles.fullWidth : styles.halfWidth}>
              <Controller
                control={control}
                name="password2"
                defaultValue=""
                render={({ field: { onChange, value, onBlur } }) => (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Repetir contraseña"
                      secureTextEntry
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                    {errors.password2 && <Text style={styles.error}>{errors.password2.message}</Text>}
                  </>
                )}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Registrar</Text>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>O regístrate con</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleRegister}>
            <Image source={GoogleIcon} style={{ width: 15, height: 15, marginRight: 8, marginTop: 2 }} />
            <Text style={styles.socialButtonText}>Registrarse con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.link}>¿Ya tenés cuenta? Ingresá acá</Text>
          </TouchableOpacity>
        </View>

        <CustomModal
          visible={modalVisible}
          type={modalType}
          title={modalTitle}
          message={modalMessage}
          confirmText="Aceptar"
          onConfirm={() => setModalVisible(false)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F3',
    padding: 16
  },
  card: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
    textAlign: 'center',
    color: '#FA8072',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFB6A3',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: 14
  },
  error: {
    color: '#E74C3C',
    alignSelf: 'flex-start',
    marginBottom: 4,
    marginTop: -6,
    fontSize: 11
  },
  button: {
    backgroundColor: '#FA8072',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12
  },
  buttonDisabled: {
    opacity: 0.7
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd'
  },
  dividerText: {
    marginHorizontal: 8,
    color: '#666',
    fontSize: 12
  },
  socialButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  socialButtonText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500'
  },
  link: {
    color: '#FA8072',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 13,
    fontWeight: '500'
  },
  rowLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 0,
  },
  columnLayout: {
    flexDirection: 'column',
    gap: 0,
    marginBottom: 0,
  },
  halfWidth: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
});