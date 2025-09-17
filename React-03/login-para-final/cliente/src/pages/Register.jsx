import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Overlay from './Overlay';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    celular: '',
    direccion: '',
    fechaNacimiento: ''
  });
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState({ show: false, message: '', type: 'success' });
  const [showPassword, setShowPassword] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.email.trim() || !formData.password.trim()) {
      showOverlay('Por favor completa todos los campos obligatorios', 'error');
      return false;
    }

    if (formData.password.length < 6) {
      showOverlay('La contraseña debe tener al menos 6 caracteres', 'error');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showOverlay('Ingresa un email válido', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      showOverlay('Registro exitoso. Bienvenido!', 'success');
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
          <div className='col-md-8 col-lg-6'>
            <div className='card shadow-lg border-0'>
              <div className='card-header bg-gradient text-white text-center py-4' style={{ background: 'linear-gradient(135deg, #c88e83 0%, #ba7b7c 100%)' }}>
                <h3 className="mb-0 fw-bold">
                  <i className="fas fa-user-plus me-2"></i>
                  Crear Cuenta
                </h3>
              </div>
              <div className='card-body p-4' style={{ backgroundColor: '#f2e2e2' }}>
                
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-md-6 mb-3'>
                      <label htmlFor='nombre' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                        <i className="fas fa-user me-1" style={{ color: '#ba7b7c' }}></i>
                        Nombre <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg border-2"
                        type='text'
                        name='nombre'
                        id='nombre'
                        placeholder="Tu nombre"
                        required
                        disabled={loading}
                        value={formData.nombre}
                        onChange={handleInputChange}
                        style={{ borderColor: '#d7a9a9' }}
                      />
                    </div>

                    <div className='col-md-6 mb-3'>
                      <label htmlFor='apellido' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                        <i className="fas fa-user me-1" style={{ color: '#ba7b7c' }}></i>
                        Apellido <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg border-2"
                        type='text'
                        name='apellido'
                        id='apellido'
                        placeholder="Tu apellido"
                        required
                        disabled={loading}
                        value={formData.apellido}
                        onChange={handleInputChange}
                        style={{ borderColor: '#d7a9a9' }}
                      />
                    </div>
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='email' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                      <i className="fas fa-envelope me-1" style={{ color: '#ba7b7c' }}></i>
                      Email <span className="text-danger">*</span>
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

                  <div className='mb-3'>
                    <label htmlFor='password' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                      <i className="fas fa-lock me-1" style={{ color: '#ba7b7c' }}></i>
                      Contraseña <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        className="form-control form-control-lg border-2"
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        id='password'
                        placeholder="Mínimo 6 caracteres"
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

                  <div className='mb-3'>
                    <label htmlFor='celular' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                      <i className="fas fa-phone me-1" style={{ color: '#ba7b7c' }}></i>
                      Celular <span className="text-muted">(Opcional)</span>
                    </label>
                    <input
                      className="form-control form-control-lg border-2"
                      type='tel'
                      name='celular'
                      id='celular'
                      placeholder="Ej: +54 9 11 1234-5678"
                      disabled={loading}
                      value={formData.celular}
                      onChange={handleInputChange}
                      style={{ borderColor: '#d7a9a9' }}
                    />
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='direccion' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                      <i className="fas fa-home me-1" style={{ color: '#ba7b7c' }}></i>
                      Dirección <span className="text-muted">(Opcional)</span>
                    </label>
                    <input
                      className="form-control form-control-lg border-2"
                      type='text'
                      name='direccion'
                      id='direccion'
                      placeholder="Tu dirección completa"
                      disabled={loading}
                      value={formData.direccion}
                      onChange={handleInputChange}
                      style={{ borderColor: '#d7a9a9' }}
                    />
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='fechaNacimiento' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                      <i className="fas fa-calendar me-1" style={{ color: '#ba7b7c' }}></i>
                      Fecha de Nacimiento <span className="text-muted">(Opcional)</span>
                    </label>
                    <input
                      className="form-control form-control-lg border-2"
                      type='date'
                      name='fechaNacimiento'
                      id='fechaNacimiento'
                      disabled={loading}
                      value={formData.fechaNacimiento}
                      onChange={handleInputChange}
                      style={{ borderColor: '#d7a9a9' }}
                    />
                  </div>

                  <div className="mb-3">
                    <small className="text-muted">
                      <i className="fas fa-info-circle me-1"></i>
                      Los campos marcados con <span className="text-danger">*</span> son obligatorios
                    </small>
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
                          Creando cuenta...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-user-plus me-2"></i>
                          Crear Cuenta
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <hr className="my-4" style={{ borderColor: '#d7a9a9' }} />

                <div className="text-center">
                  <p className="mb-2" style={{ color: '#9d6b6c' }}>¿Ya tienes una cuenta?</p>
                  <Link 
                    to="/login" 
                    className="btn px-4 py-2 rounded-pill fw-semibold"
                    style={{ backgroundColor: '#e5c5c5', borderColor: '#ba7b7c', color: '#8a5a5b', border: '2px solid' }}
                  >
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Iniciar Sesión
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