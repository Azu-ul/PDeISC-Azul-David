import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Overlay from "./Overlay";

export default function Create() {
    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        celular: '',
        fechaNacimiento: '',
        email: ''
    });

    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState({ show: false, message: '', type: 'success' });
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        
        console.log('Enviando datos:', values);

        axios.post('http://localhost:3000/agregar_usuario', values)
            .then((res) => {
                console.log('Respuesta del servidor:', res);
                setLoading(false);
                showOverlay('Usuario agregado correctamente!', 'success');
                
                // Limpiar formulario
                setValues({
                    nombre: '',
                    apellido: '',
                    direccion: '',
                    celular: '',
                    fechaNacimiento: '',
                    email: ''
                });
                

            })
            .catch((err) => {
                console.error('Error al agregar usuario:', err);
                setLoading(false);
                showOverlay('Error al agregar el usuario: ' + (err.response?.data?.message || err.message), 'error');
            });
    }

    const showOverlay = (message, type = 'success') => {
        setOverlay({ show: true, message, type });
    };

    const closeOverlay = () => {
        setOverlay({ show: false, message: '', type: 'success' });
        // Si el overlay era de éxito, navegar al home
        if (overlay.type === 'success') {
            navigate('/');
        }
    };

    return (
        <div className='min-vh-100 d-flex align-items-center' style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <div className='card shadow-lg border-0'>
                            <div className='card-header bg-gradient text-white text-center py-4' style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                                <h3 className="mb-0 fw-bold">
                                    <i className="fas fa-user-plus me-2"></i>
                                    Agregar Usuario
                                </h3>
                            </div>
                            <div className='card-body p-4'>
                                <div className='d-flex justify-content-end mb-4'>
                                    <Link to='/' className='btn btn-outline-primary px-4 py-2 rounded-pill shadow-sm border-2 fw-semibold text-decoration-none position-relative overflow-hidden' style={{transition: 'all 0.3s ease'}}>
                                        <i className="fas fa-arrow-left me-2"></i>
                                        Volver al Inicio
                                    </Link>
                                </div>
                                
                                <form onSubmit={handleSubmit}>
                                    <div className='row'>
                                        <div className='col-md-6 mb-3'>
                                            <label htmlFor='nombre' className="form-label fw-semibold text-dark">
                                                <i className="fas fa-user me-1 text-primary"></i>
                                                Nombre
                                            </label>
                                            <input
                                                className="form-control form-control-lg border-2"
                                                type='text'
                                                name='nombre'
                                                id='nombre'
                                                placeholder="Ingresa tu nombre"
                                                required
                                                disabled={loading}
                                                value={values.nombre}
                                                onChange={(e) => setValues({ ...values, nombre: e.target.value })}
                                            />
                                        </div>

                                        <div className='col-md-6 mb-3'>
                                            <label htmlFor='apellido' className="form-label fw-semibold text-dark">
                                                <i className="fas fa-user me-1 text-primary"></i>
                                                Apellido
                                            </label>
                                            <input
                                                className="form-control form-control-lg border-2"
                                                type='text'
                                                name='apellido'
                                                id='apellido'
                                                placeholder="Ingresa tu apellido"
                                                required
                                                disabled={loading}
                                                value={values.apellido}
                                                onChange={(e) => setValues({ ...values, apellido: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor='direccion' className="form-label fw-semibold text-dark">
                                            <i className="fas fa-home me-1 text-success"></i>
                                            Dirección
                                        </label>
                                        <input
                                            className="form-control form-control-lg border-2"
                                            type='text'
                                            name='direccion'
                                            id='direccion'
                                            placeholder="Ingresa tu dirección completa"
                                            required
                                            disabled={loading}
                                            value={values.direccion}
                                            onChange={(e) => setValues({ ...values, direccion: e.target.value })}
                                        />
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6 mb-3'>
                                            <label htmlFor='celular' className="form-label fw-semibold text-dark">
                                                <i className="fas fa-phone me-1 text-info"></i>
                                                Celular
                                            </label>
                                            <input
                                                className="form-control form-control-lg border-2"
                                                type='tel'
                                                name='celular'
                                                id='celular'
                                                placeholder="Ej: +54 9 11 1234-5678"
                                                required
                                                disabled={loading}
                                                value={values.celular}
                                                onChange={(e) => setValues({ ...values, celular: e.target.value })}
                                            />
                                        </div>

                                        <div className='col-md-6 mb-3'>
                                            <label htmlFor='fechaNacimiento' className="form-label fw-semibold text-dark">
                                                <i className="fas fa-calendar me-1 text-warning"></i>
                                                Fecha de Nacimiento
                                            </label>
                                            <input
                                                className="form-control form-control-lg border-2"
                                                type='date'
                                                name='fechaNacimiento'
                                                id='fechaNacimiento'
                                                required
                                                disabled={loading}
                                                value={values.fechaNacimiento}
                                                onChange={(e) => setValues({ ...values, fechaNacimiento: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className='mb-4'>
                                        <label htmlFor='email' className="form-label fw-semibold text-dark">
                                            <i className="fas fa-envelope me-1 text-danger"></i>
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
                                            value={values.email}
                                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                                        />
                                    </div>

                                    <div className='d-grid'>
                                        <button 
                                            type='submit' 
                                            className='btn btn-lg py-3 fw-bold shadow' 
                                            style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none'}}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="spinner-border spinner-border-sm me-2" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    Guardando...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-save me-2"></i>
                                                    Guardar Usuario
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Overlay usando el componente reutilizable */}
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