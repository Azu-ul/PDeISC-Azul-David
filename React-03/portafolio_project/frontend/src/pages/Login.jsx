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
      login(response.data); // Pasamos la respuesta completa del servidor
      showOverlay('Inicio de sesión exitoso', 'success');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      showOverlay(error.response?.data?.error || 'Error de inicio de sesión', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Iniciar Sesión</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor='email' className="form-label">Email</label>
                  <input 
                    type='email' 
                    className="form-control"
                    name='email' 
                    id='email' 
                    required 
                    disabled={loading} 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder="Ingresa tu email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor='password' className="form-label">Contraseña</label>
                  <input 
                    type='password' 
                    className="form-control"
                    name='password' 
                    id='password' 
                    required 
                    disabled={loading} 
                    value={formData.password} 
                    onChange={handleInputChange}
                    placeholder="Ingresa tu contraseña" 
                  />
                </div>
                <button 
                  type='submit' 
                  className="btn btn-primary w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Iniciando sesión...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
              </form>
              
              <hr />
              
              <div className="text-center">
                <p className="mb-2">¿No tienes una cuenta?</p>
                <Link to="/register" className="btn btn-outline-primary btn-sm">
                  Registrarse
                </Link>
              </div>
              
              <div className="text-center mt-3">
                <p className="mb-2">¿Olvidaste tu contraseña?</p>
                <Link to="/reset-password" className="btn btn-outline-secondary btn-sm">
                  Cambiar Contraseña
                </Link>
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