import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Overlay from './Overlay';
import axios from 'axios';

export default function ResetPassword() {
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState({ show: false, message: '', type: 'success' });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!formData.email || !formData.newPassword || !formData.confirmPassword) {
            showOverlay('Por favor completa todos los campos', 'error');
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            showOverlay('Ingresa un email válido', 'error');
            return false;
        }

        if (formData.newPassword.length < 6) {
            showOverlay('La contraseña debe tener al menos 6 caracteres', 'error');
            return false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            showOverlay('Las contraseñas no coinciden', 'error');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await axios.put('http://localhost:3000/auth/reset-password', {
                email: formData.email,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            });

            showOverlay('Contraseña actualizada correctamente', 'success');
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error('Error al resetear contraseña:', error);
            const errorMessage = error.response?.data?.message || 'Error al cambiar la contraseña';
            showOverlay(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    const showOverlay = (message, type = 'success') => {
        setOverlay({ show: true, message, type });
    };

    const closeOverlay = () => {
        setOverlay({ show: false, message: '', type: 'success' });
        if (overlay.type === 'success') {
            navigate('/login');
        }
    };

    return (
        <div className='min-vh-100 d-flex align-items-center' style={{ background: 'linear-gradient(135deg, #d7a9a9 0%, #ba7b7c 100%)', fontFamily: "'Georgia', serif" }}>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-6 col-lg-5'>
                        <div className='card shadow-lg border-0'>
                            <div className='card-header bg-gradient text-white text-center py-4' style={{ background: 'linear-gradient(135deg, #c88e83 0%, #ba7b7c 100%)' }}>
                                <h3 className="mb-0 fw-bold">
                                    <i className="fas fa-key me-2"></i>
                                    Cambiar Contraseña
                                </h3>
                            </div>
                            <div className='card-body p-4' style={{ backgroundColor: '#f2e2e2' }}>

                                <div className="alert alert-info mb-4" style={{ backgroundColor: '#e5c5c5', borderColor: '#ba7b7c', color: '#8a5a5b' }}>
                                    <i className="fas fa-info-circle me-2"></i>
                                    Ingresa tu email y define una nueva contraseña
                                </div>

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

                                    <div className='mb-3'>
                                        <label htmlFor='newPassword' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                                            <i className="fas fa-lock me-1" style={{ color: '#ba7b7c' }}></i>
                                            Nueva Contraseña
                                        </label>
                                        <div className="input-group">
                                            <input
                                                className="form-control form-control-lg border-2"
                                                type={showNewPassword ? 'text' : 'password'}
                                                name='newPassword'
                                                id='newPassword'
                                                placeholder="Ingresa tu nueva contraseña"
                                                required
                                                disabled={loading}
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                style={{ borderColor: '#d7a9a9' }}
                                            />
                                            <button
                                                type="button"
                                                className="btn border-2"
                                                style={{ borderColor: '#d7a9a9', backgroundColor: '#e5c5c5' }}
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                            >
                                                <i className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: '#ba7b7c' }}></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className='mb-4'>
                                        <label htmlFor='confirmPassword' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                                            <i className="fas fa-lock me-1" style={{ color: '#ba7b7c' }}></i>
                                            Confirmar Contraseña
                                        </label>
                                        <div className="input-group">
                                            <input
                                                className="form-control form-control-lg border-2"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name='confirmPassword'
                                                id='confirmPassword'
                                                placeholder="Confirma tu nueva contraseña"
                                                required
                                                disabled={loading}
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                style={{ borderColor: '#d7a9a9' }}
                                            />
                                            <button
                                                type="button"
                                                className="btn border-2"
                                                style={{ borderColor: '#d7a9a9', backgroundColor: '#e5c5c5' }}
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: '#ba7b7c' }}></i>
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
                                                    Actualizando contraseña...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-save me-2"></i>
                                                    Cambiar Contraseña
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>

                                <hr className="my-4" style={{ borderColor: '#d7a9a9' }} />

                                <div className="text-center">
                                    <p className="mb-2" style={{ color: '#9d6b6c' }}>¿Recordaste tu contraseña?</p>
                                    <Link
                                        to="/login"
                                        className="btn px-4 py-2 rounded-pill fw-semibold"
                                        style={{ backgroundColor: '#e5c5c5', borderColor: '#ba7b7c', color: '#8a5a5b', border: '2px solid' }}
                                    >
                                        <i className="fas fa-sign-in-alt me-2"></i>
                                        Volver al Login
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