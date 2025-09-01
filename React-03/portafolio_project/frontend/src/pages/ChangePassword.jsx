import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Overlay from '../components/Overlay';
import axios from 'axios';

export default function ChangePassword() {
  const [formData, setFormData] = useState({
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
    if (!formData.newPassword || !formData.confirmPassword) {
      showOverlay('Por favor completa todos los campos.', 'error');
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
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/auth/change-password', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      showOverlay('Contraseña actualizada con éxito.', 'success');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      showOverlay(error.response?.data?.error || 'Error al cambiar la contraseña.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
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