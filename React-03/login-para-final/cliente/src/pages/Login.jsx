import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Overlay from './Overlay';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState({ show: false, message: '', type: 'success' });
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showOverlay('Por favor completa todos los campos', 'error');
      return;
    }

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      showOverlay('Inicio de sesión exitoso', 'success');
      setTimeout(() => navigate('/'), 1500);
    } else {
      showOverlay(result.message, 'error');
    }
  };

  const showOverlay = (message, type = 'success') => {
    setOverlay({ show: true, message, type });
  };

  const closeOverlay = () => {
    setOverlay({ show: false, message: '', type: 'success' });
  };

  return (
    <div className='min-vh-100 d-flex align-items-center' style={{ background: 'linear-gradient(135deg, #d7a9a9 0%, #ba7b7c 100%)', fontFamily: "'Georgia', serif" }}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6 col-lg-5'>
            <div className='card shadow-lg border-0'>
              <div className='card-header bg-gradient text-white text-center py-4' style={{ background: 'linear-gradient(135deg, #c88e83 0%, #ba7b7c 100%)' }}>
                <h3 className="mb-0 fw-bold">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Iniciar Sesión
                </h3>
              </div>
              <div className='card-body p-4' style={{ backgroundColor: '#f2e2e2' }}>

                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label htmlFor='email' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                      <i className="fas fa-envelope me-1" style={{ color: '#ba7b7c' }}></i>
                      Email
                    </label>
                    <input
                      className="form-control form-control-lg border-2"
                      type='email'
                      name='email'
                      id='email'
                      placeholder="ejemplo@correo.com"
                      required
                      disabled={loading}
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{ borderColor: '#d7a9a9' }}
                    />
                  </div>

                  <div className='mb-4'>
                    <label htmlFor='password' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                      <i className="fas fa-lock me-1" style={{ color: '#ba7b7c' }}></i>
                      Contraseña
                    </label>
                    <div className="input-group">
                      <input
                        className="form-control form-control-lg border-2"
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        id='password'
                        placeholder="Ingresa tu contraseña"
                        required
                        disabled={loading}
                        value={formData.password}
                        onChange={handleInputChange}
                        style={{ borderColor: '#d7a9a9' }}
                      />
                      <button
                        type="button"
                        className="btn border-2"
                        style={{ borderColor: '#d7a9a9', backgroundColor: '#e5c5c5' }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: '#ba7b7c' }}></i>
                      </button>
                    </div>
                  </div>

                  <div className='d-grid mb-3'>
                    <button
                      type='submit'
                      className='btn btn-lg py-3 fw-bold shadow'
                      style={{ background: 'linear-gradient(135deg, #c88e83 0%, #ba7b7c 100%)', color: 'white', border: 'none' }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Iniciando sesión...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-sign-in-alt me-2"></i>
                          Iniciar Sesión
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <hr className="my-4" style={{ borderColor: '#d7a9a9' }} />

                <div className="text-center">
                  <p className="mb-2" style={{ color: '#9d6b6c' }}>¿No tienes una cuenta?</p>
                  <Link
                    to="/register"
                    className="btn px-4 py-2 rounded-pill fw-semibold"
                    style={{ backgroundColor: '#e5c5c5', borderColor: '#ba7b7c', color: '#8a5a5b', border: '2px solid' }}
                  >
                    <i className="fas fa-user-plus me-2"></i>
                    Registrarse
                  </Link>
                </div>

                {/* Nueva sección para cambiar contraseña */}
                <div className="text-center mt-3">
                  <p className="mb-2" style={{ color: '#9d6b6c' }}>¿Olvidaste tu contraseña?</p>
                  <Link 
                    to="/reset-password" 
                    className="btn px-4 py-2 rounded-pill fw-semibold"
                    style={{ backgroundColor: '#d7a9a9', borderColor: '#ba7b7c', color: '#8a5a5b', border: '2px solid' }}
                  >
                    <i className="fas fa-key me-2"></i>
                    Cambiar Contraseña
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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