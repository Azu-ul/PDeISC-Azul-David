import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    email: '',
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
      await axios.put('http://localhost:5000/api/auth/reset-password', formData);
      setMessage('Contraseña reseteada con éxito. Por favor inicia sesión.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error al resetear la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Resetear Contraseña</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' required disabled={loading} value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor='newPassword'>Nueva Contraseña</label>
          <input type='password' name='newPassword' id='newPassword' required disabled={loading} value={formData.newPassword} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirmar Contraseña</label>
          <input type='password' name='confirmPassword' id='confirmPassword' required disabled={loading} value={formData.confirmPassword} onChange={handleInputChange} />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Reseteando...' : 'Resetear Contraseña'}
        </button>
      </form>
      {message && <p>{message}</p>}
      <hr />
      <p>¿Recordaste tu contraseña?</p>
      <Link to="/login">Volver al Login</Link>
    </div>
  );
}