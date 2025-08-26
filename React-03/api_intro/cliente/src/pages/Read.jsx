import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Overlay from "./Overlay";

export default function Read() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overlay, setOverlay] = useState({ show: false, message: '', type: 'success' });
  const [confirmDelete, setConfirmDelete] = useState({ show: false, userId: null, userName: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const deleteUser = async (id, userName) => {
    setConfirmDelete({ show: true, userId: id, userName: userName });
  };

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

  const cancelDelete = () => {
    setConfirmDelete({ show: false, userId: null, userName: '' });
  };

  const showOverlay = (message, type = 'success') => {
    setOverlay({ show: true, message, type });
  };

  const closeOverlay = () => {
    setOverlay({ show: false, message: '', type: 'success' });
  };

  return (
    <div className='min-vh-100 d-flex align-items-center' style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-12'>
            <div className='card shadow-lg border-0'>
              <div className='card-header bg-gradient text-white text-center py-4' style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                <h3 className="mb-0 fw-bold">
                  <i className="fas fa-users me-2"></i>
                  Lista de Usuarios
                </h3>
              </div>
              <div className='card-body p-4'>
                <div className='d-flex justify-content-between mb-4'>
                  <Link to='/' className='btn btn-outline-primary px-4 py-2 rounded-pill fw-semibold'>
                    <i className="fas fa-arrow-left me-2"></i>
                    Volver
                  </Link>
                  <Link to='/create' className='btn btn-success px-4 py-2 rounded-pill fw-semibold'>
                    <i className="fas fa-plus me-2"></i>
                    Nuevo Usuario
                  </Link>
                </div>

                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-3">Cargando usuarios...</p>
                  </div>
                ) : users.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-dark">
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
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nombre}</td>
                            <td>{user.apellido}</td>
                            <td>{user.email}</td>
                            <td>{user.celular}</td>
                            <td>{user.direccion}</td>
                            <td>{user.fecha_nacimiento}</td>
                            <td>
                              <button 
                                onClick={() => deleteUser(user.id, `${user.nombre} ${user.apellido}`)} 
                                className='btn btn-danger btn-sm'
                                title="Eliminar usuario"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="fas fa-user-slash fa-3x text-muted mb-3"></i>
                    <h5>No hay usuarios registrados</h5>
                    <p className="text-muted">Comienza agregando tu primer usuario</p>
                    <Link to='/create' className='btn btn-success px-4 py-2 rounded-pill fw-semibold'>
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