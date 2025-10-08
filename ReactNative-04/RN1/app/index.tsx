import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormData = {
  identifier: string;
  password: string;
};

const schema = yup.object({
  identifier: yup.string().required('Email o usuario es requerido'),
  password: yup.string().required('Contraseña requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
}).required();

export default function Login() {
  const router = useRouter();
  const [modalMsg, setModalMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched'
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/login', data);
      const { token, user } = res.data;
      await AsyncStorage.setItem('token', token);
      router.push({
        pathname: '/welcome',
        params: { user: JSON.stringify(user) }
      });
    } catch (err: any) {
      const message = err?.response?.data?.error || 'Error en el servidor';
      setModalMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ingreso</Text>

        <Controller
          control={control}
          name="identifier"
          defaultValue=""
          render={({ field: { onChange, value, onBlur } }) => (
            <>
              <TextInput
                placeholder="Email o usuario"
                style={styles.input}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
              {errors.identifier && <Text style={styles.error}>{errors.identifier.message}</Text>}
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

        <View style={styles.buttonContainer}>
          <Button title={loading ? 'Ingresando...' : 'Ingresar'} onPress={handleSubmit(onSubmit)} disabled={loading} color="#FA8072" />
        </View>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.link}>¿No tenés cuenta? Registro</Text>
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