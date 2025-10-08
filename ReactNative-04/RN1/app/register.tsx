import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormData = { username: string; email: string; password: string; password2: string; };

const schema = yup.object({
  username: yup.string().required('Usuario requerido').min(3, 'El usuario debe tener al menos 3 caracteres'),
  email: yup.string()
    .required('Email requerido')
    .test('email-format', 'El email debe contener @ y .', (value) => {
      if (!value) return false;
      return value.includes('@') && value.includes('.');
    }),
  password: yup.string().required('Contraseña requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  password2: yup.string().required('Confirmación de contraseña requerida').oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
});

export default function Register() {
  const router = useRouter();
  const [modalMsg, setModalMsg] = useState<string | null>(null);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const payload = { username: data.username, email: data.email, password: data.password };
      const res = await axios.post('http://localhost:3000/api/register', payload);
      const { token, user } = res.data;
      router.push({ pathname: '/welcome', params: { user: JSON.stringify(user), token }});
    } catch (err: any) {
      setModalMsg(err?.response?.data?.error || 'Error al registrar');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Registro</Text>

        <Controller
          control={control}
          name="username"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput 
                style={styles.input} 
                placeholder="Usuario" 
                onChangeText={onChange} 
                value={value}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
              {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput 
                style={styles.input} 
                placeholder="Email" 
                keyboardType="email-address" 
                onChangeText={onChange} 
                value={value}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
              {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput 
                style={styles.input} 
                placeholder="Contraseña" 
                secureTextEntry 
                onChangeText={onChange} 
                value={value}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
              {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="password2"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput 
                style={styles.input} 
                placeholder="Repetir contraseña" 
                secureTextEntry 
                onChangeText={onChange} 
                value={value}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
              {errors.password2 && <Text style={styles.error}>{errors.password2.message}</Text>}
            </>
          )}
        />

        <View style={styles.buttonContainer}>
          <Button title="Registrar" onPress={handleSubmit(onSubmit)} color="#FA8072" />
        </View>

        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.link}>¿Ya tenés cuenta? Ingresá acá</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={!!modalMsg} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{modalMsg}</Text>
            <Button title="Cerrar" onPress={() => setModalMsg(null)} color="#FA8072" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFF5F3',
    padding: 20 
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: { 
    fontSize: 28, 
    marginBottom: 24,
    textAlign: 'center',
    color: '#FA8072',
    fontWeight: 'bold'
  },
  input: { 
    width: '100%', 
    borderWidth: 1, 
    borderColor: '#FFB6A3', 
    padding: 12, 
    marginBottom: 5, 
    borderRadius: 8,
    backgroundColor: '#FFF'
  },
  error: { 
    color: '#E74C3C', 
    alignSelf: 'flex-start', 
    marginBottom: 8,
    fontSize: 12
  },
  buttonContainer: {
    marginVertical: 16
  },
  link: {
    color: '#FA8072',
    textAlign: 'center',
    marginTop: 12,
    textDecorationLine: 'underline'
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.4)' 
  },
  modalContent: { 
    width: '80%', 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FA8072'
  }
});