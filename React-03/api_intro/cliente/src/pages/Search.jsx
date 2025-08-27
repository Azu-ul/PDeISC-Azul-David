import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Overlay from "./Overlay";

// Página para buscar usuarios
export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [overlay, setOverlay] = useState({ show: false, message: '', type: 'success' });

  // Función para manejar la búsqueda
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      showOverlay('Por favor ingresa un término de búsqueda', 'error');
      return;
    }
    
    // Iniciar búsqueda
    setSearching(true);
    setHasSearched(true);
    
    // Realizar la solicitud a la API
    try {
      console.log('Buscando:', searchTerm);
      
      // Detectar si es email, nombre y apellido, o solo nombre/apellido

      const searchTerms = searchTerm.trim();
      // Determinar si es un email o nombre/apellido
      const isEmail = searchTerms.includes('@');
      // Dividir por espacios para ver si hay múltiples palabras
      const words = searchTerms.split(' ').filter(word => word.length > 0);
      
      // Construir parámetros de búsqueda
      let searchParams = new URLSearchParams();
      
      // Lógica para decidir qué parámetros usar
      if (isEmail) {
        // Si contiene @, buscar por email
        searchParams.append('email', searchTerms);
      } else if (words.length >= 2) {
        // Si hay 2 o más palabras, asumir que es nombre y apellido
        searchParams.append('nombre', words[0]);
        searchParams.append('apellido', words.slice(1).join(' '));
      } else {
        // Si es una sola palabra, buscar en todos los campos
        searchParams.append('q', searchTerms);
      }
      
      // Realizar la solicitud GET con los parámetros adecuados
      const response = await axios.get(`http://localhost:3000/buscar?${searchParams.toString()}`);
      console.log('Resultados:', response.data);
      setResults(response.data || []);
    } catch (err) {
      console.error('Error en búsqueda:', err);
      setResults([]);
      showOverlay('Error al realizar la búsqueda', 'error');
    }
    setSearching(false);
  };

  // Función para mostrar el overlay de mensajes
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

  // Render principal de la página de búsqueda
  return (
    <div className='min-vh-100 d-flex align-items-center' style={{background: 'linear-gradient(135deg, #d7a9a9 0%, #ba7b7c 100%)', fontFamily: "'Georgia', serif"}}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <div className='card shadow-lg border-0'>
              <div className='card-header bg-gradient text-white text-center py-4' style={{background: 'linear-gradient(135deg, #c88e83 0%, #ba7b7c 100%)'}}>
                <h3 className="mb-0 fw-bold">
                  <i className="fas fa-search me-2"></i>
                  Consultar Usuarios
                </h3>
              </div>
              <div className='card-body p-4' style={{backgroundColor: '#f2e2e2'}}>
                <div className='d-flex justify-content-end mb-4'>
                  <Link to='/' className='btn px-4 py-2 rounded-pill fw-semibold' style={{backgroundColor: '#e5c5c5', borderColor: '#ba7b7c', color: '#8a5a5b', border: '2px solid'}}>
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
                      style={{borderColor: '#d7a9a9'}}
                    />
                  </div>
                  <div className="col-md-3">
                    <button 
                      onClick={handleSearch}
                      className="btn btn-lg w-100 fw-semibold"
                      disabled={searching}
                      style={{backgroundColor: '#c88e83', color: 'white', border: 'none'}}
                    >
                      <i className="fas fa-search me-2"></i>
                      {searching ? 'Buscando...' : 'Buscar'}
                    </button>
                  </div>
                  <div className="col-md-3">
                    <button 
                      onClick={clearSearch}
                      className="btn btn-lg w-100 fw-semibold"
                      style={{backgroundColor: '#e5c5c5', color: '#8a5a5b', border: '2px solid #ba7b7c'}}
                    >
                      <i className="fas fa-times me-2"></i>
                      Limpiar
                    </button>
                  </div>
                </div>

                {searching && (
                  <div className="text-center py-3">
                    <div className="spinner-border" role="status" style={{color: '#ba7b7c'}}>
                      <span className="visually-hidden">Buscando...</span>
                    </div>
                    <p className="mt-2" style={{color: '#8a5a5b'}}>Buscando usuarios...</p>
                  </div>
                )}

                {!searching && results.length > 0 && (
                  <div className="table-responsive">
                    <h5 className="mb-3" style={{color: '#8a5a5b'}}>
                      <i className="fas fa-check-circle me-2" style={{color: '#c88e83'}}></i>
                      Resultados encontrados: {results.length}
                    </h5>
                    <table className="table table-hover">
                      <thead style={{backgroundColor: '#c88e83', color: 'white'}}>
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
                          <tr key={user.id} style={{backgroundColor: '#f8f0f0'}}>
                            <td style={{color: '#8a5a5b'}}>{user.id}</td>
                            <td style={{color: '#8a5a5b'}}>{user.nombre}</td>
                            <td style={{color: '#8a5a5b'}}>{user.apellido}</td>
                            <td style={{color: '#8a5a5b'}}>{user.email}</td>
                            <td style={{color: '#8a5a5b'}}>{user.celular}</td>
                            <td style={{color: '#8a5a5b'}}>{user.direccion}</td>
                            <td style={{color: '#8a5a5b'}}>{user.fecha_nacimiento}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {!searching && hasSearched && results.length === 0 && (
                  <div className="text-center py-5">
                    <i className="fas fa-search fa-3x mb-3" style={{color: '#c88e83'}}></i>
                    <h5 style={{color: '#8a5a5b'}}>No se encontraron resultados</h5>
                    <p className="text-muted">No hay usuarios que coincidan con "{searchTerm}"</p>
                    <p className="text-muted small">Intenta con otros términos de búsqueda</p>
                  </div>
                )}

                {!searching && !hasSearched && (
                  <div className="text-center py-5">
                    <i className="fas fa-search fa-3x mb-3" style={{color: '#ba7b7c'}}></i>
                    <h5 style={{color: '#8a5a5b'}}>Buscar Usuarios</h5>
                    <p className="text-muted">Ingresa un nombre, apellido o email para buscar usuarios</p>
                    <div className="mt-3 text-start" style={{maxWidth: '400px', margin: '0 auto'}}>
                    </div>
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