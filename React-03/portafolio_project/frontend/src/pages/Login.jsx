import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(response.data);
      setMessage('Inicio de sesión exitoso');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error de inicio de sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Iniciar Sesión</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' required disabled={loading} value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor='password'>Contraseña</label>
          <input type='password' name='password' id='password' required disabled={loading} value={formData.password} onChange={handleInputChange} />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
      {message && <p>{message}</p>}
      <hr />
      <div>
        <p>¿No tienes una cuenta?</p>
        <Link to="/register">Registrarse</Link>
      </div>
      <div>
        <p>¿Olvidaste tu contraseña?</p>
        <Link to="/reset-password">Cambiar Contraseña</Link>
      </div>
    </div>
  );
}