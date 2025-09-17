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

  // Función para obtener token del localStorage
  const getStoredToken = () => {
    try {
      return localStorage.getItem('authToken');
    } catch (error) {
      console.error('Error accediendo a localStorage:', error);
      return null;
    }
  };

  // Función para guardar token en localStorage
  const setStoredToken = (token) => {
    try {
      if (token) {
        localStorage.setItem('authToken', token);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
    }
  };

  // Configurar axios con el token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getStoredToken();
      if (storedToken) {
        setToken(storedToken);
        await verifyToken(storedToken);
      } else {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const verifyToken = async (tokenToVerify = null) => {
    const currentToken = tokenToVerify || token;

    if (!currentToken) {
      setLoading(false);
      return;
    }

    try {
      // Configurar header temporalmente para la verificación
      const config = {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      };

      const response = await axios.get('http://localhost:3000/auth/verify', config);

      // Si la verificación es exitosa, actualizar el estado
      setUser(response.data.user);
      if (!token) {
        setToken(currentToken);
      }

    } catch (error) {
      console.error('Token inválido:', error.response?.data?.message || error.message);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      });

      const { token: newToken, user: userData } = response.data;

      // Guardar en localStorage
      setStoredToken(newToken);

      // Actualizar estado
      setToken(newToken);
      setUser(userData);

      return { success: true };

    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error al iniciar sesión'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData);

      const { token: newToken, user: newUser } = response.data;

      // Guardar en localStorage
      setStoredToken(newToken);

      // Actualizar estado
      setToken(newToken);
      setUser(newUser);

      return { success: true };

    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error al registrarse'
      };
    }
  };
  // Agregar esta función después de la función register y antes de logout:

    const changePassword = async (newPassword, confirmPassword) => {
    try {
      const response = await axios.put('http://localhost:3000/auth/change-password', {
        newPassword,
        confirmPassword
      });

      return { success: true, message: response.data.message };
      
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error al cambiar la contraseña'
      };
    }
  };

  // Y actualizar el objeto value para incluir la nueva función:

  
  const logout = () => {
    // Limpiar localStorage
    setStoredToken(null);

    // Limpiar estado
    setToken(null);
    setUser(null);

    // Limpiar headers de axios
    delete axios.defaults.headers.common['Authorization'];
  };

  const isAdmin = () => {
    return user?.rol === 'admin';
  };

  const isAuthenticated = () => {
    return !!user && !!token;
  };

  // Interceptor para manejar errores de autenticación
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.log('Token expirado o inválido, cerrando sesión...');
          logout();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup del interceptor
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const value = {
    user,
    token,
    loading,
    login,
    register,
    changePassword,
    logout,
    isAdmin,
    isAuthenticated,
    verifyToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};