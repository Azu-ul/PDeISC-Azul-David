import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Overlay from '../components/Overlay';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState({ show: false, message: '', type: 'success' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const showOverlay = (message, type) => {
    setOverlay({ show: true, message, type });
  };

  const closeOverlay = () => {
    setOverlay({ ...overlay, show: false });
  };

  const validateForm = async () => {
    if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.email.trim() || !formData.password.trim()) {
      showOverlay('Por favor completa todos los campos obligatorios.', 'error');
      return false;
    }

    if (formData.nombre.trim().length < 2) {
      showOverlay('El nombre debe tener al menos 2 caracteres.', 'error');
      return false;
    }

    if (formData.apellido.trim().length < 2) {
      showOverlay('El apellido debe tener al menos 2 caracteres.', 'error');
      return false;
    }
    
    if (/[0-9]/.test(formData.nombre) || /[0-9]/.test(formData.apellido)) {
      showOverlay('El nombre y el apellido no pueden contener números.', 'error');
      return false;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      showOverlay('Ingresa un email válido.', 'error');
      return false;
    }

    if (formData.password.length < 6) {
      showOverlay('La contraseña debe tener al menos 6 caracteres.', 'error');
      return false;
    }

    if (!/\d/.test(formData.password)) {
      showOverlay('La contraseña debe contener al menos un número.', 'error');
      return false;
    }

    try {
      const emailExists = await axios.get(`http://localhost:5000/api/auth/check-email-exists?email=${formData.email}`);
      if (emailExists.data.exists) {
        showOverlay('El email ya está registrado.', 'error');
        return false;
      }
    } catch (error) {
      console.error('Error al verificar el email:', error);
      showOverlay('Ocurrió un error al verificar el email.', 'error');
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(await validateForm())) {
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      showOverlay('Usuario registrado con éxito.', 'success');
      
      const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      login(loginResponse.data);
      setTimeout(() => navigate('/'), 1500);
      
    } catch (error) {
      showOverlay(error.response?.data?.error || 'Error en el registro', 'error');
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
      paddingBottom: '40px',
      fontFamily: 'Georgia, serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
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
                Create Account
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6" style={{ marginBottom: '40px' }}>
                    <label style={labelStyle}>First Name</label>
                    <input 
                      type='text' 
                      name='nombre' 
                      id='nombre' 
                      required 
                      disabled={loading} 
                      value={formData.nombre} 
                      onChange={handleInputChange}
                      placeholder="Your first name"
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderBottomColor = '#2c2c2c'}
                      onBlur={(e) => e.target.style.borderBottomColor = '#ddd'}
                    />
                  </div>
                  
                  <div className="col-md-6" style={{ marginBottom: '40px' }}>
                    <label style={labelStyle}>Last Name</label>
                    <input 
                      type='text' 
                      name='apellido' 
                      id='apellido' 
                      required 
                      disabled={loading} 
                      value={formData.apellido} 
                      onChange={handleInputChange}
                      placeholder="Your last name"
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderBottomColor = '#2c2c2c'}
                      onBlur={(e) => e.target.style.borderBottomColor = '#ddd'}
                    />
                  </div>
                </div>
                
                <div style={{ marginBottom: '40px' }}>
                  <label style={labelStyle}>Email</label>
                  <input 
                    type='email' 
                    name='email' 
                    id='email' 
                    required 
                    disabled={loading} 
                    value={formData.email} 
                    onChange={handleInputChange}
                    placeholder="your.email@domain.com"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderBottomColor = '#2c2c2c'}
                    onBlur={(e) => e.target.style.borderBottomColor = '#ddd'}
                  />
                </div>
                
                <div style={{ marginBottom: '30px' }}>
                  <label style={labelStyle}>Password</label>
                  <input 
                    type='password' 
                    name='password' 
                    id='password' 
                    required 
                    disabled={loading} 
                    value={formData.password} 
                    onChange={handleInputChange}
                    placeholder="Minimum 6 characters with a number"
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
                    marginBottom: '40px',
                    marginTop: '30px',
                    fontWeight: '400'
                  }}
                  onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#1a1a1a')}
                  onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#2c2c2c')}
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
              
              <div style={{ 
                textAlign: 'center',
                paddingTop: '30px',
                borderTop: '1px solid #eee'
              }}>
                <p style={{ 
                  marginBottom: '20px',
                  color: '#666',
                  fontSize: '16px',
                  letterSpacing: '0.3px'
                }}>
                  Already have an account?
                </p>
                <Link 
                  to="/login" 
                  style={{
                    color: '#2c2c2c',
                    textDecoration: 'none',
                    fontSize: '14px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid #2c2c2c',
                    paddingBottom: '2px',
                    transition: 'all 0.3s ease',
                    fontWeight: '400'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#666';
                    e.target.style.borderColor = '#666';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#2c2c2c';
                    e.target.style.borderColor = '#2c2c2c';
                  }}
                >
                  Sign In
                </Link>
              </div>
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