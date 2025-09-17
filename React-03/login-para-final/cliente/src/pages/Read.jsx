import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Overlay from "./Overlay";

// Página para listar y eliminar usuarios
export default function Read() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overlay, setOverlay] = useState({ show: false, message: '', type: 'success' });
  const [confirmDelete, setConfirmDelete] = useState({ show: false, userId: null, userName: '' });

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para obtener usuarios desde la API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      console.log('Obteniendo usuarios...');
      const response = await axios.get('http://localhost:3000/usuarios');
      console.log('Respuesta:', response.data);
      setUsers(response.data || []);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
      showOverlay('Error al cargar los usuarios', 'error');
      setUsers([]);
    }
    setLoading(false);
  };

  // Función para iniciar el proceso de eliminación
  const deleteUser = async (id, userName) => {
    setConfirmDelete({ show: true, userId: id, userName: userName });
  };

  // Función para confirmar la eliminación
  const confirmDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3000/usuario/${confirmDelete.userId}`);
      setConfirmDelete({ show: false, userId: null, userName: '' });
      fetchUsers();
      showOverlay('Usuario eliminado correctamente', 'success');
    } catch (err) {
      console.error('Error al eliminar:', err);
      setConfirmDelete({ show: false, userId: null, userName: '' });
      showOverlay('Error al eliminar usuario', 'error');
    }
  };

  // Función para cancelar la eliminación
  const cancelDelete = () => {
    setConfirmDelete({ show: false, userId: null, userName: '' });
  };

  // Función para mostrar el overlay de mensajes
  const showOverlay = (message, type = 'success') => {
    setOverlay({ show: true, message, type });
  };

  const closeOverlay = () => {
    setOverlay({ show: false, message: '', type: 'success' });
  };

  // Render principal de la lista de usuarios
  return (
    <div className='min-vh-100 d-flex align-items-center' style={{background: 'linear-gradient(135deg, #d7a9a9 0%, #ba7b7c 100%)', fontFamily: "'Georgia', serif"}}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-12'>
            <div className='card shadow-lg border-0'>
              <div className='card-header bg-gradient text-white text-center py-4' style={{background: 'linear-gradient(135deg, #c88e83 0%, #ba7b7c 100%)'}}>
                <h3 className="mb-0 fw-bold">
                  <i className="fas fa-users me-2"></i>
                  Lista de Usuarios
                </h3>
              </div>
              <div className='card-body p-4' style={{backgroundColor: '#f2e2e2'}}>
                <div className='d-flex justify-content-between mb-4'>
                  <Link to='/' className='btn px-4 py-2 rounded-pill fw-semibold' style={{backgroundColor: '#e5c5c5', borderColor: '#ba7b7c', color: '#8a5a5b', border: '2px solid'}}>
                    <i className="fas fa-arrow-left me-2"></i>
                    Volver
                  </Link>
                  <Link to='/create' className='btn px-4 py-2 rounded-pill fw-semibold' style={{backgroundColor: '#ba7b7c', color: 'white', border: 'none'}}>
                    <i className="fas fa-plus me-2"></i>
                    Nuevo Usuario
                  </Link>
                </div>

                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border" role="status" style={{color: '#ba7b7c'}}>
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-3" style={{color: '#8a5a5b'}}>Cargando usuarios...</p>
                  </div>
                ) : users.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead style={{backgroundColor: '#c88e83', color: 'white'}}>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Email</th>
                          <th>Celular</th>
                          <th>Direccion</th>
                          <th>Fecha Nac.</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id} style={{backgroundColor: '#f8f0f0'}}>
                            <td style={{color: '#8a5a5b'}}>{user.id}</td>
                            <td style={{color: '#8a5a5b'}}>{user.nombre}</td>
                            <td style={{color: '#8a5a5b'}}>{user.apellido}</td>
                            <td style={{color: '#8a5a5b'}}>{user.email}</td>
                            <td style={{color: '#8a5a5b'}}>{user.celular}</td>
                            <td style={{color: '#8a5a5b'}}>{user.direccion}</td>
                            <td style={{color: '#8a5a5b'}}>{user.fecha_nacimiento}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <Link 
                                  to={`/edit/${user.id}`}
                                  className='btn btn-sm'
                                  title="Editar usuario"
                                  style={{backgroundColor: '#c88e83', color: 'white'}}
                                >
                                  <i className="fas fa-edit"></i>
                                </Link>
                                <button 
                                  onClick={() => deleteUser(user.id, `${user.nombre} ${user.apellido}`)} 
                                  className='btn btn-sm'
                                  title="Eliminar usuario"
                                  style={{backgroundColor: '#ba7b7c', color: 'white'}}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : 
                  {/* Mensaje cuando no hay usuarios */}
                (
                  <div className="text-center py-5"> 
                    <i className="fas fa-user-slash fa-3x mb-3" style={{color: '#c88e83'}}></i>
                    <h5 style={{color: '#8a5a5b'}}>No hay usuarios registrados</h5>
                    <p className="text-muted">Comienza agregando tu primer usuario</p>
                    <Link to='/create' className='btn px-4 py-2 rounded-pill fw-semibold' style={{backgroundColor: '#ba7b7c', color: 'white', border: 'none'}}>
                      <i className="fas fa-plus me-2"></i>
                      Agregar Usuario
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay de confirmación de eliminación */}
      <Overlay
        show={confirmDelete.show}
        type="confirm"
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar al usuario ${confirmDelete.userName}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={confirmDeleteUser}
        onCancel={cancelDelete}
      />
      
      {/* Overlay de mensajes */}
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