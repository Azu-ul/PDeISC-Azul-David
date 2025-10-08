import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = { id: number; username: string; email: string; };

export default function Welcome() {
  const { user, token } = useLocalSearchParams();
  const router = useRouter();
  const [userObj, setUserObj] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      try {
        const parsed: User = JSON.parse(user as string);
        setUserObj(parsed);
      } catch (e) {
        setUserObj(null);
      }
    }
    if (token) {
      AsyncStorage.setItem('token', token as string);
    }
  }, [user, token]);

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bienvenido, {userObj?.username ?? 'Usuario'}</Text>
        <Text style={styles.email}>Email: {userObj?.email}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Cerrar sesión" onPress={logout} color="#FA8072" />
        </View>
      </View>
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
    padding: 40,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center'
  },
  title: { 
    fontSize: 28, 
    marginBottom: 16,
    textAlign: 'center',
    color: '#FA8072',
    fontWeight: 'bold'
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center'
  },
  buttonContainer: {
    width: '100%',
    marginTop: 8
  }
});