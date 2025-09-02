import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MiCuenta = () => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        setMessage('Error al cargar los datos de la cuenta.');
      }
    };
    
    fetchUserData();
  }, [user, navigate]);

  if (!userData) {
    return (
      <section className="py-5 bg-white text-center" style={{ minHeight: '50vh', fontFamily: 'Georgia, serif' }}>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
            <div>
              <div className="spinner-border text-dark" role="status" style={{ width: '2rem', height: '2rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading account data...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-5 bg-white" 
      style={{ 
        fontFamily: 'Georgia, serif', 
        minHeight: '100vh',
        paddingTop: '160px',  // Aumentado de calc(120px + 2rem) a 160px
        marginTop: '100px'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h2 
                className="display-4 fw-normal mb-5" 
                style={{ 
                  color: '#2c2c2c',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  letterSpacing: '-1px'
                  
                }}
              >
                My Account
              </h2>
            </div>

            {message && (
              <div className="alert alert-warning text-center mb-4 border-0" style={{ backgroundColor: '#fff5f5', color: '#666' }}>
                {message}
              </div>
            )}

            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                  <h3 
                    className="h4 mb-4 text-center" 
                    style={{
                      color: '#2c2c2c',
                      fontWeight: '400',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Personal Information
                  </h3>

                  <div className="row mb-4">
                    <div className="col-md-6 mb-4">
                      <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
                        <label 
                          style={{
                            display: 'block',
                            color: '#999',
                            fontSize: '0.85rem',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem'
                          }}
                        >
                          First Name
                        </label>
                        <p 
                          style={{
                            color: '#2c2c2c',
                            fontSize: '1.1rem',
                            margin: '0',
                            letterSpacing: '0.3px'
                          }}
                        >
                          {userData.nombre}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
                        <label 
                          style={{
                            display: 'block',
                            color: '#999',
                            fontSize: '0.85rem',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem'
                          }}
                        >
                          Last Name
                        </label>
                        <p 
                          style={{
                            color: '#2c2c2c',
                            fontSize: '1.1rem',
                            margin: '0',
                            letterSpacing: '0.3px'
                          }}
                        >
                          {userData.apellido}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
                        <label 
                          style={{
                            display: 'block',
                            color: '#999',
                            fontSize: '0.85rem',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem'
                          }}
                        >
                          Email
                        </label>
                        <p 
                          style={{
                            color: '#2c2c2c',
                            fontSize: '1.1rem',
                            margin: '0',
                            letterSpacing: '0.3px'
                          }}
                        >
                          {userData.email}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
                        <label 
                          style={{
                            display: 'block',
                            color: '#999',
                            fontSize: '0.85rem',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem'
                          }}
                        >
                          Role
                        </label>
                        <div className="d-flex align-items-center">
                          <span 
                            className="px-2 py-1"
                            style={{
                              fontSize: '0.8rem',
                              color: '#999',
                              border: '1px solid #eee',
                              backgroundColor: 'transparent',
                              letterSpacing: '0.5px',
                              textTransform: 'uppercase'
                            }}
                          >
                            {userData.rol}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sección adicional */}
                  <div className="row mt-5 pt-5" style={{ borderTop: '1px solid #eee' }}>
                    <div className="col-12 text-center">
                      <p 
                        className="mb-4" 
                        style={{ 
                          color: '#666', 
                          fontSize: '1.1rem',
                          lineHeight: '1.7'
                        }}
                      >
                        Want to change your password? <br />
                        Click below to update your account security.
                      </p>
                      <a 
                        onClick={() => navigate('/change-password')}
                        href="#"
                        className="text-decoration-none"
                        style={{
                          color: '#F79995',
                          fontSize: '0.9rem',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          fontWeight: '400',
                          borderBottom: '1px solid #F79995',
                          paddingBottom: '2px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.color = '#666';
                          e.target.style.borderColor = '#666';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.color = '#F79995';
                          e.target.style.borderColor = '#F79995';
                        }}
                      >
                        Change Password →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiCuenta;