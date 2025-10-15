import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
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
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string()
    .required('El email es requerido')
    .email('Email inválido'),
  password: yup.string()
    .required('Contraseña requerida')
    .min(6, 'Mínimo 6 caracteres'),
}).required();

export default function Login() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('Aviso');
  const [loading, setLoading] = useState(false);

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
        if (params.error === 'email_conflict') {
          const provider = params.provider as string;
          setModalTitle('Cuenta Existente');
          setModalMessage(
            `Este email ya está registrado con ${provider === 'local' ? 'contraseña' : 'Google'}. ` +
            `Por favor inicia sesión con ${provider === 'local' ? 'tu contraseña' : 'Google'}.`
          );
        } else {
          setModalTitle('Error');
          setModalMessage('No se pudo completar la autenticación');
        }
        setModalVisible(true);
      }
    }
  }, [params]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleMessage = (event: MessageEvent) => {
        const clientUrl = API_URL.replace('/api', '');
        if (event.origin !== clientUrl && event.origin !== window.location.origin) {
          console.warn('Mensaje de origen no confiable:', event.origin);
          return;
        }

        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          handleOAuthCallback(event.data.token, event.data.user);
        } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          setModalTitle('Error');
          setModalMessage('No se pudo completar la autenticación con Google');
          setModalVisible(true);
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, []);

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
      console.error('Error al procesar autenticación:', error);
      setModalTitle('Error');
      setModalMessage('Error al procesar autenticación');
      setModalVisible(true);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/login', data);
      const { token, user } = res.data;
      await AsyncStorage.setItem('token', token);
      router.replace({
        pathname: '/welcome',
        params: { user: JSON.stringify(user) }
      });
    } catch (err: any) {
      const message = err?.response?.data?.error || 'Error en el servidor';
      setModalTitle('Error');
      setModalMessage(message);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (Platform.OS === 'web') {
        const width = 500;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
          `${API_URL}/auth/google`,
          'Google Login',
          `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
        );

        if (!popup) {
          setModalTitle('Error');
          setModalMessage('No se pudo abrir la ventana de autenticación. Verifica que no estés bloqueando popups.');
          setModalVisible(true);
        }
      } else {
        const result = await WebBrowser.openAuthSessionAsync(
          `${API_URL}/auth/google`,
          'authapp://'
        );
      }
    } catch (error) {
      console.error('Error en Google login:', error);
      setModalTitle('Error');
      setModalMessage('No se pudo iniciar sesión con Google');
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({ field: { onChange, value, onBlur } }) => (
            <>
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          defaultValue=""
          render={({ field: { onChange, value, onBlur } }) => (
            <>
              <TextInput
                placeholder="Contraseña"
                style={styles.input}
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
              {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            </>
          )}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Ingresar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>O continúa con</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
          <Image source={GoogleIcon} style={{ width: 15, height: 15, marginRight: 8, marginTop: 2 }} />
          <Text style={styles.socialButtonText}>Continuar con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        visible={modalVisible}
        type={modalTitle === 'Error' ? 'delete' : 'info'}
        title={modalTitle}
        message={modalMessage}
        confirmText="Aceptar"
        onConfirm={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F3',
    padding: 16
  },
  card: {
    width: '100%',
    maxWidth: 340,
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
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: 14
  },
  error: {
    color: '#E74C3C',
    alignSelf: 'flex-start',
    marginBottom: 6,
    fontSize: 11
  },
  button: {
    backgroundColor: '#FA8072',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 14
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
    marginVertical: 12
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
    marginTop: 10,
    fontSize: 13,
    fontWeight: '500'
  }
});