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
    // Validar campos requeridos
    if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.email.trim() || !formData.password.trim()) {
      showOverlay('Por favor completa todos los campos obligatorios.', 'error');
      return false;
    }

    // Validar longitud del nombre y apellido
    if (formData.nombre.trim().length < 2) {
      showOverlay('El nombre debe tener al menos 2 caracteres.', 'error');
      return false;
    }

    if (formData.apellido.trim().length < 2) {
      showOverlay('El apellido debe tener al menos 2 caracteres.', 'error');
      return false;
    }
    
    // Validar que nombre y apellido no contengan números
    if (/[0-9]/.test(formData.nombre) || /[0-9]/.test(formData.apellido)) {
      showOverlay('El nombre y el apellido no pueden contener números.', 'error');
      return false;
    }

    // Validar formato de email
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      showOverlay('Ingresa un email válido.', 'error');
      return false;
    }

    // Validar contraseña
    if (formData.password.length < 6) {
      showOverlay('La contraseña debe tener al menos 6 caracteres.', 'error');
      return false;
    }

    if (!/\d/.test(formData.password)) {
      showOverlay('La contraseña debe contener al menos un número.', 'error');
      return false;
    }

    // Verificar si el email ya existe
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
      // Registrar usuario
      await axios.post('http://localhost:5000/api/auth/register', formData);
      showOverlay('Usuario registrado con éxito.', 'success');
      
      // Auto-login después del registro exitoso
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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Registro de Usuario</h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor='nombre' className="form-label">Nombre *</label>
                    <input 
                      type='text' 
                      className="form-control"
                      name='nombre' 
                      id='nombre' 
                      required 
                      disabled={loading} 
                      value={formData.nombre} 
                      onChange={handleInputChange}
                      placeholder="Ingresa tu nombre"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor='apellido' className="form-label">Apellido *</label>
                    <input 
                      type='text' 
                      className="form-control"
                      name='apellido' 
                      id='apellido' 
                      required 
                      disabled={loading} 
                      value={formData.apellido} 
                      onChange={handleInputChange}
                      placeholder="Ingresa tu apellido"
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor='email' className="form-label">Email *</label>
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
                  <label htmlFor='password' className="form-label">Contraseña *</label>
                  <input 
                    type='password' 
                    className="form-control"
                    name='password' 
                    id='password' 
                    required 
                    disabled={loading} 
                    value={formData.password} 
                    onChange={handleInputChange}
                    placeholder="Mínimo 6 caracteres con al menos un número"
                  />
                  <div className="form-text">
                    La contraseña debe tener al menos 6 caracteres y contener un número.
                  </div>
                </div>
                
                <button 
                  type='submit' 
                  className="btn btn-primary w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creando cuenta...
                    </>
                  ) : (
                    'Crear Cuenta'
                  )}
                </button>
              </form>
              
              <hr />
              
              <div className="text-center">
                <p className="mb-2">¿Ya tienes una cuenta?</p>
                <Link to="/login" className="btn btn-outline-primary btn-sm">
                  Iniciar Sesión
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