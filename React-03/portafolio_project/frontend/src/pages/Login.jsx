import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Overlay from '../components/Overlay';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      showOverlay('Por favor completa todos los campos', 'error');
      return false;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      showOverlay('Por favor ingresa un email válido', 'error');
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
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(response.data);
      showOverlay('Inicio de sesión exitoso', 'success');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      showOverlay(error.response?.data?.error || 'Error de inicio de sesión', 'error');
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
                Sign In
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '40px' }}>
                  <label style={labelStyle}>
                    Email
                  </label>
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
                
                <div style={{ marginBottom: '50px' }}>
                  <label style={labelStyle}>
                    Password
                  </label>
                  <input 
                    type='password' 
                    name='password' 
                    id='password' 
                    required 
                    disabled={loading} 
                    value={formData.password} 
                    onChange={handleInputChange}
                    placeholder="Your password"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderBottomColor = '#2c2c2c'}
                    onBlur={(e) => e.target.style.borderBottomColor = '#ddd'}
                  />
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
                    fontWeight: '400'
                  }}
                  onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#1a1a1a')}
                  onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#2c2c2c')}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
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
                  Don't have an account?
                </p>
                <Link 
                  to="/register" 
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
                  Create Account
                </Link>
              </div>
              
              <div style={{ 
                textAlign: 'center',
                marginTop: '30px'
              }}>
                <Link 
                  to="/reset-password" 
                  style={{
                    color: '#999',
                    textDecoration: 'none',
                    fontSize: '14px',
                    letterSpacing: '0.5px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#666'}
                  onMouseLeave={(e) => e.target.style.color = '#999'}
                >
                  Forgot your password?
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