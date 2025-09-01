import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
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
      await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage('Usuario registrado con éxito.');
      
      const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      login(loginResponse.data);
      setTimeout(() => navigate('/'), 1500);
      
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Registro de Usuario</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='nombre'>Nombre</label>
          <input type='text' name='nombre' id='nombre' required disabled={loading} value={formData.nombre} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor='apellido'>Apellido</label>
          <input type='text' name='apellido' id='apellido' required disabled={loading} value={formData.apellido} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' required disabled={loading} value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor='password'>Contraseña</label>
          <input type='password' name='password' id='password' required disabled={loading} value={formData.password} onChange={handleInputChange} />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </button>
      </form>
      {message && <p>{message}</p>}
      <hr />
      <div>
        <p>¿Ya tienes una cuenta?</p>
        <Link to="/login">Iniciar Sesión</Link>
      </div>
    </div>
  );
}