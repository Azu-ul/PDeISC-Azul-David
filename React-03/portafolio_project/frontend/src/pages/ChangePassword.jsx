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

  const inputStyle = {
    width: '100%',
    padding: '20px 0',
    fontSize: '16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid #ddd',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    color: '#2c2c2c',
    letterSpacing: '0.3px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '12px',
    fontSize: '14px',
    color: '#666',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    fontWeight: '400'
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      paddingTop: '80px',
      fontFamily: 'Georgia, serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #f0f0f0',
              padding: '80px 60px'
            }}>
              <h2 style={{ 
                textAlign: 'center', 
                marginBottom: '60px',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: '400',
                color: '#2c2c2c',
                letterSpacing: '0.5px'
              }}>
                Change Password
              </h2>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '40px' }}>
                  <label style={labelStyle}>New Password</label>
                  <input 
                    type='password' 
                    name='newPassword' 
                    id='newPassword' 
                    required 
                    disabled={loading} 
                    value={formData.newPassword} 
                    onChange={handleInputChange}
                    placeholder="New password"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderBottomColor = '#2c2c2c'}
                    onBlur={(e) => e.target.style.borderBottomColor = '#ddd'}
                  />
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={labelStyle}>Confirm Password</label>
                  <input 
                    type='password' 
                    name='confirmPassword' 
                    id='confirmPassword' 
                    required 
                    disabled={loading} 
                    value={formData.confirmPassword} 
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderBottomColor = '#2c2c2c'}
                    onBlur={(e) => e.target.style.borderBottomColor = '#ddd'}
                  />
                  <div style={{
                    fontSize: '12px',
                    color: '#999',
                    marginTop: '12px',
                    letterSpacing: '0.3px'
                  }}>
                    Password must be at least 6 characters and contain a number.
                  </div>
                </div>

                <button 
                  type='submit' 
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '18px',
                    backgroundColor: '#2c2c2c',
                    color: 'white',
                    border: 'none',
                    fontSize: '14px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: loading ? 0.7 : 1,
                    marginTop: '30px',
                    fontWeight: '400'
                  }}
                  onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#1a1a1a')}
                  onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#2c2c2c')}
                >
                  {loading ? 'Updating...' : 'Change Password'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Overlay
        show={overlay.show}
        type={overlay.type}
        title={overlay.type === 'success' ? 'Success' : 'Error'}
        message={overlay.message}
        onClose={closeOverlay}
      />
    </div>
  );
}