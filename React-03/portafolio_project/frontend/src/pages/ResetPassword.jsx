import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Overlay from '../components/Overlay';
import axios from 'axios';

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  const showOverlay = (message, type) => {
    setOverlay({ show: true, message, type });
  };

  const closeOverlay = () => {
    setOverlay({ ...overlay, show: false });
  };

  const validateForm = () => {
    if (!formData.email || !formData.newPassword || !formData.confirmPassword) {
      showOverlay('Por favor completa todos los campos.', 'error');
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      showOverlay('Ingresa un email válido.', 'error');
      return false;
    }
    if (formData.newPassword.length < 6 || !/\d/.test(formData.newPassword)) {
      showOverlay('La contraseña debe tener al menos 6 caracteres y un número.', 'error');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      showOverlay('Las contraseñas no coinciden.', 'error');
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      await axios.put('http://localhost:5000/api/auth/reset-password', formData);
      showOverlay('Contraseña reseteada con éxito. Por favor inicia sesión.', 'success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      showOverlay(error.response?.data?.error || 'Error al resetear la contraseña.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
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
      <hr />
      <p>¿Recordaste tu contraseña?</p>
      <Link to="/login">Volver al Login</Link>
      <Overlay
        show={overlay.show}
        type={overlay.type}
        title={overlay.type === 'success' ? 'Éxito' : 'Error'}
        message={overlay.message}
        onClose={closeOverlay}
      />
    </div>
  );
}