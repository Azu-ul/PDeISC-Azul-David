import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Overlay from "./Overlay";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [overlay, setOverlay] = useState({ show: false, message: '', type: 'success' });

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      showOverlay('Por favor ingresa un término de búsqueda', 'error');
      return;
    }
    
    setSearching(true);
    setHasSearched(true);
    
    try {
      console.log('Buscando:', searchTerm);
      const response = await axios.get(`http://localhost:3000/buscar?q=${encodeURIComponent(searchTerm)}`);
      console.log('Resultados:', response.data);
      setResults(response.data || []);
    } catch (err) {
      console.error('Error en búsqueda:', err);
      setResults([]);
      showOverlay('Error al realizar la búsqueda', 'error');
    }
    setSearching(false);
  };

  const showOverlay = (message, type = 'success') => {
    setOverlay({ show: true, message, type });
  };

  const closeOverlay = () => {
    setOverlay({ show: false, message: '', type: 'success' });
  };

  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className='min-vh-100 d-flex align-items-center' style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <div className='card shadow-lg border-0'>
              <div className='card-header bg-gradient text-white text-center py-4' style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                <h3 className="mb-0 fw-bold">
                  <i className="fas fa-search me-2"></i>
                  Consultar Usuarios
                </h3>
              </div>
              <div className='card-body p-4'>
                <div className='d-flex justify-content-end mb-4'>
                  <Link to='/' className='btn btn-outline-primary px-4 py-2 rounded-pill fw-semibold'>
                    <i className="fas fa-arrow-left me-2"></i>
                    Volver
                  </Link>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Buscar por nombre, apellido o email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <div className="col-md-3">
                    <button 
                      onClick={handleSearch}
                      className="btn btn-warning btn-lg w-100 fw-semibold"
                      disabled={searching}
                    >
                      <i className="fas fa-search me-2"></i>
                      {searching ? 'Buscando...' : 'Buscar'}
                    </button>
                  </div>
                  <div className="col-md-3">
                  </div>
                </div>

                {searching && (
                  <div className="text-center py-3">
                    <div className="spinner-border text-warning" role="status">
                      <span className="visually-hidden">Buscando...</span>
                    </div>
                    <p className="mt-2">Buscando usuarios...</p>
                  </div>
                )}

                {!searching && results.length > 0 && (
                  <div className="table-responsive">
                    <h5 className="mb-3 text-success">
                      <i className="fas fa-check-circle me-2"></i>
                      Resultados encontrados: {results.length}
                    </h5>
                    <table className="table table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Email</th>
                          <th>Celular</th>
                          <th>Dirección</th>
                          <th>Fecha Nac.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map(user => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nombre}</td>
                            <td>{user.apellido}</td>
                            <td>{user.email}</td>
                            <td>{user.celular}</td>
                            <td>{user.direccion}</td>
                            <td>{user.fecha_nacimiento}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {!searching && hasSearched && results.length === 0 && (
                  <div className="text-center py-5">
                    <i className="fas fa-search fa-3x text-muted mb-3"></i>
                    <h5>No se encontraron resultados</h5>
                    <p className="text-muted">No hay usuarios que coincidan con "{searchTerm}"</p>
                    <p className="text-muted small">Intenta con otros términos de búsqueda</p>
                  </div>
                )}

                {!searching && !hasSearched && (
                  <div className="text-center py-5">
                    <i className="fas fa-search fa-3x text-info mb-3"></i>
                    <h5>Buscar Usuarios</h5>
                    <p className="text-muted">Ingresa un nombre, apellido o email para buscar usuarios</p>
                  </div>
                )}
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