import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Overlay from "./Overlay";

// Componente para crear o editar un usuario
export default function CreateEdit() {
    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        celular: '',
        fechaNacimiento: '',
        email: ''
    });

    // Estados para manejo de carga y overlay
    const [loading, setLoading] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const [overlay, setOverlay] = useState({ show: false, message: '', type: 'success' });
    const navigate = useNavigate();
    const { id } = useParams();

    // Determinar si estamos en modo edición
    const isEditing = Boolean(id);

    // Cargar datos del usuario si estamos editando
    useEffect(() => { if (isEditing) { fetchUser(); }}, [id, isEditing]);

    // Función para obtener datos del usuario a editar
    const fetchUser = async () => {
        setLoadingUser(true);
        try {
            console.log('Obteniendo usuario con ID:', id);

            // Llamada a la API para obtener el usuario por ID
            const response = await axios.get(`http://localhost:3000/usuario/${id}`);
            console.log('Datos del usuario:', response.data);

            // Formatear fecha de nacimiento para input date
            const userData = { ...response.data };
            if (userData.fecha_nacimiento) {
                const date = new Date(userData.fecha_nacimiento);
                userData.fechaNacimiento = date.toISOString().split('T')[0];
            }

            // Actualizar estado con los datos del usuario
            setValues({
                nombre: userData.nombre || '',
                apellido: userData.apellido || '',
                direccion: userData.direccion || '',
                celular: userData.celular || '',
                fechaNacimiento: userData.fechaNacimiento || '',
                email: userData.email || ''
            });
            // Si el usuario no existe, redirigir a la lista
        } catch (err) {
            console.error('Error al obtener usuario:', err);
            if (err.response?.status === 404) {
                showOverlay('Usuario no encontrado', 'error');
                setTimeout(() => navigate('/read'), 2000);
            } else {
                showOverlay('Error al cargar los datos del usuario', 'error');
            }
        }
        setLoadingUser(false);
    };

    // Función de validación del formulario 
    const validateForm = () => {

        // Validar nombre
        if (!values.nombre.trim()) {
            showOverlay('El nombre es requerido', 'error');
            return false;
        }
        if (values.nombre.trim().length < 2) {
            showOverlay('El nombre debe tener al menos 2 caracteres', 'error');
            return false;
        }
        if (/^\d+$/.test(values.nombre.trim())) {
            showOverlay('El nombre no puede ser solo números', 'error');
            return false;
        }

        // Validar apellido
        if (!values.apellido.trim()) {
            showOverlay('El apellido es requerido', 'error');
            return false;
        }
        if (values.apellido.trim().length < 2) {
            showOverlay('El apellido debe tener al menos 2 caracteres', 'error');
            return false;
        }
        if (/^\d+$/.test(values.apellido.trim())) {
            showOverlay('El apellido no puede ser solo números', 'error');
            return false;
        }

        // Validar celular
        if (!values.celular.trim()) {
            showOverlay('El celular es requerido', 'error');
            return false;
        }
        if (!/^[\d\s\-\+\(\)]+$/.test(values.celular.trim())) {
            showOverlay('El celular solo puede contener números, espacios, guiones, + y paréntesis', 'error');
            return false;
        }
        const soloDigitos = values.celular.replace(/[\s\-\+\(\)]/g, '');
        if (soloDigitos.length < 7) {
            showOverlay('El celular debe tener al menos 7 dígitos', 'error');
            return false;
        }

        // Validar email
        if (!values.email.trim()) {
            showOverlay('El email es requerido', 'error');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            showOverlay('Ingresa un email válido', 'error');
            return false;
        }

        // Validar fecha de nacimiento
        if (!values.fechaNacimiento) {
            showOverlay('La fecha de nacimiento es requerida', 'error');
            return false;
        }

        // La fecha debe ser anterior a hoy
        const fechaNac = new Date(values.fechaNacimiento);
        const hoy = new Date();
        if (fechaNac >= hoy) {
            showOverlay('La fecha de nacimiento debe ser anterior a hoy', 'error');
            return false;
        }

        // Validar dirección (opcional)
        if (values.direccion.trim() && values.direccion.trim().length < 5) {
            showOverlay('La dirección debe tener al menos 5 caracteres', 'error');
            return false;
        }

        return true;
    };

    // Manejar envío del formulario
    function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        // Definir URL y método según si es creación o edición
        const url = isEditing
            ? `http://localhost:3000/usuario/${id}`
            : 'http://localhost:3000/agregar_usuario';

        // Definir método HTTP
        const method = isEditing ? 'put' : 'post';

        console.log(`${isEditing ? 'Actualizando' : 'Creando'} usuario:`, values);

        // Llamada a la API para crear o actualizar el usuario
        axios[method](url, values)
            .then((res) => {
                console.log('Respuesta del servidor:', res);
                setLoading(false);
                showOverlay(
                    `Usuario ${isEditing ? 'actualizado' : 'agregado'} correctamente!`,
                    'success'
                );

                // Limpiar formulario si es creación
                if (!isEditing) {
                    setValues({
                        nombre: '',
                        apellido: '',
                        direccion: '',
                        celular: '',
                        fechaNacimiento: '',
                        email: ''
                    });
                }
            })
            .catch((err) => {
                console.error(`Error al ${isEditing ? 'actualizar' : 'agregar'} usuario:`, err);
                setLoading(false);
                showOverlay(
                    `Error al ${isEditing ? 'actualizar' : 'agregar'} el usuario: ` +
                    (err.response?.data?.message || err.message),
                    'error'
                );
            });
    }

    // Funciones para manejar el overlay
    const showOverlay = (message, type = 'success') => {
        setOverlay({ show: true, message, type });
    };

    const closeOverlay = () => {
        setOverlay({ show: false, message: '', type: 'success' });
        if (overlay.type === 'success') {
            navigate(isEditing ? '/read' : '/');
        }
    };

    // Loading mientras se cargan datos del usuario (solo en modo edición)
    if (isEditing && loadingUser) {
        return (
            <div className='min-vh-100 d-flex align-items-center justify-content-center' style={{ background: 'linear-gradient(135deg, #d7a9a9 0%, #ba7b7c 100%)', fontFamily: "'Georgia', serif" }}>
                <div className="text-center">
                    <div className="spinner-border mb-3" role="status" style={{ color: '#ba7b7c' }}>
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p style={{ color: '#8a5a5b' }}>Cargando datos del usuario...</p>
                </div>
            </div>
        );
    }

    // Render del formulario ya sea para crear o editar
    return (
        <div className='min-vh-100 d-flex align-items-center' style={{ background: 'linear-gradient(135deg, #d7a9a9 0%, #ba7b7c 100%)', fontFamily: "'Georgia', serif" }}>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <div className='card shadow-lg border-0'>
                            <div className='card-header bg-gradient text-white text-center py-4' style={{ background: 'linear-gradient(135deg, #c88e83 0%, #ba7b7c 100%)' }}>
                                <h3 className="mb-0 fw-bold">
                                    <i className={`fas ${isEditing ? 'fa-user-edit' : 'fa-user-plus'} me-2`}></i>
                                    {isEditing ? 'Editar Usuario' : 'Agregar Usuario'}
                                </h3>
                            </div>
                            <div className='card-body p-4' style={{ backgroundColor: '#f2e2e2' }}>
                                <div className='d-flex justify-content-end mb-4'>
                                    <Link
                                        to={isEditing ? '/read' : '/'}
                                        className='btn px-4 py-2 rounded-pill shadow-sm border-2 fw-semibold text-decoration-none position-relative overflow-hidden'
                                        style={{ transition: 'all 0.3s ease', backgroundColor: '#e5c5c5', borderColor: '#ba7b7c', color: '#8a5a5b' }}
                                    >
                                        <i className="fas fa-arrow-left me-2"></i>
                                        {isEditing ? 'Volver a la Lista' : 'Volver al Inicio'}
                                    </Link>
                                </div>

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
                                                placeholder="Ingresa tu nombre"
                                                required
                                                disabled={loading}
                                                value={values.nombre}
                                                onChange={(e) => setValues({ ...values, nombre: e.target.value })}
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
                                                placeholder="Ingresa tu apellido"
                                                required
                                                disabled={loading}
                                                value={values.apellido}
                                                onChange={(e) => setValues({ ...values, apellido: e.target.value })}
                                                style={{ borderColor: '#d7a9a9' }}
                                            />
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor='direccion' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                                            <i className="fas fa-home me-1" style={{ color: '#c88e83' }}></i>
                                            Dirección <span className="text-muted">(Opcional)</span>
                                        </label>
                                        <input
                                            className="form-control form-control-lg border-2"
                                            type='text'
                                            name='direccion'
                                            id='direccion'
                                            placeholder="Ingresa tu dirección completa"
                                            disabled={loading}
                                            value={values.direccion}
                                            onChange={(e) => setValues({ ...values, direccion: e.target.value })}
                                            style={{ borderColor: '#d7a9a9' }}
                                        />
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6 mb-3'>
                                            <label htmlFor='celular' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                                                <i className="fas fa-phone me-1" style={{ color: '#ba7b7c' }}></i>
                                                Celular <span className="text-danger">*</span>
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
                                                style={{ borderColor: '#d7a9a9' }}
                                            />
                                        </div>

                                        <div className='col-md-6 mb-3'>
                                            <label htmlFor='fechaNacimiento' className="form-label fw-semibold" style={{ color: '#8a5a5b' }}>
                                                <i className="fas fa-calendar me-1" style={{ color: '#c88e83' }}></i>
                                                Fecha de Nacimiento <span className="text-danger">*</span>
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
                                                style={{ borderColor: '#d7a9a9' }}
                                            />
                                        </div>
                                    </div>

                                    <div className='mb-4'>
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
                                            value={values.email}
                                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                                            style={{ borderColor: '#d7a9a9' }}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <small className="text-muted">
                                            <i className="fas fa-info-circle me-1"></i>
                                            Los campos marcados con <span className="text-danger">*</span> son obligatorios
                                        </small>
                                    </div>

                                    <div className='d-grid'>
                                        {/* Botón de envío */} 
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
                                                    {isEditing ? 'Actualizando...' : 'Guardando...'}
                                                </>
                                            
                                            ) : (
                                                <>
                                                    <i className="fas fa-save me-2"></i>
                                                    {isEditing ? 'Actualizar Usuario' : 'Guardar Usuario'}
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
                {/* Componente Overlay para mensajes de éxito o error */}
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