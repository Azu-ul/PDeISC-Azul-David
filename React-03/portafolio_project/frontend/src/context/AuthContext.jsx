import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const getStoredToken = () => {
    try {
      return localStorage.getItem('token'); // Cambiar a 'token' para consistencia
    } catch (error) {
      console.error('Error accediendo a localStorage:', error);
      return null;
    }
  };

  const setStoredToken = (token) => {
    try {
      if (token) {
        localStorage.setItem('token', token); // Cambiar a 'token' para consistencia
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    const storedToken = getStoredToken();
    if (storedToken) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          setUser(response.data);
          setToken(storedToken);
        } catch (error) {
          console.error('Error al validar token:', error);
          logout();
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  // CORREGIR: Esta función debe recibir los datos de respuesta del login, no email/password
  const login = (responseData) => {
    try {
      setStoredToken(responseData.token);
      setToken(responseData.token);
      // El usuario se obtiene del token o de una llamada adicional
      // Por ahora, creamos un objeto user básico basado en la respuesta
      const userData = {
        rol: responseData.rol,
        // Otros campos se pueden obtener después con /api/auth/me
      };
      setUser(userData);
      return { success: true, message: 'Inicio de sesión exitoso' };
    } catch (error) {
      console.error('Error en el login:', error);
      return { success: false, message: 'Error procesando el login' };
    }
  };

  const register = async (userData) => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', userData);
      return { success: true, message: 'Registro exitoso' };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || 'Error en el registro' };
    }
  };
  
  const logout = () => {
    setStoredToken(null);
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const isAdmin = () => {
    return user?.rol === 'admin';
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};