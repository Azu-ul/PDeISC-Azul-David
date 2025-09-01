import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/auth/change-password', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Contraseña actualizada con éxito');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Cambiar Contraseña</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='newPassword'>Nueva Contraseña</label>
          <input type='password' name='newPassword' id='newPassword' required disabled={loading} value={formData.newPassword} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirmar Contraseña</label>
          <input type='password' name='confirmPassword' id='confirmPassword' required disabled={loading} value={formData.confirmPassword} onChange={handleInputChange} />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}