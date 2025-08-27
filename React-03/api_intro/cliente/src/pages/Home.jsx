import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='min-vh-100 d-flex align-items-center overflow-hidden' style={{ background: 'linear-gradient(135deg, #d7a9a9 0%, #ba7b7c 100%)', fontFamily: "'Georgia', serif" }}>
      <div className='container-fluid px-4'>
        <div className='row justify-content-center'>
          <div className='col-11 col-lg-10'>
            <div className='card shadow-lg border-0'>
              {/* Header más compacto */}
              <div className='card-header bg-gradient text-center py-3' style={{ background: 'linear-gradient(135deg, #c88e83 0%, #ba7b7c 100%)' }}>
                <h1 className="mb-1 fw-bold display-6" style={{ color: '#8a5a5b' }}>
                  <i className="fas fa-users me-2"></i>
                  Sistema de Gestión de Usuarios
                </h1>
              </div>

              {/* Body compacto */}
              <div className='card-body p-3 p-md-4' style={{ backgroundColor: '#f2e2e2' }}>
                <div className="text-center mb-3">
                  <h4 className="mb-2 fw-semibold" style={{ color: '#ba7b7c' }}>¿Qué deseas hacer?</h4>
                  <p className="fs-6 mb-0" style={{ color: '#c88e83' }}>Selecciona una de las opciones disponibles</p>
                </div>

                {/* Cards en una sola fila en desktop, stack en móvil */}
                <div className="row g-3 justify-content-center">
                  <div className="col-12 col-md-4">
                    <div className="card h-100 border-0 shadow-sm hover-card" style={{ transition: 'all 0.3s ease', backgroundColor: '#e5c5c5' }}>
                      <div className="card-body text-center p-3">
                        <div className="mb-2">
                          <i className="fas fa-user-plus fa-2x" style={{ color: '#ba7b7c' }}></i>
                        </div>
                        <h6 className="card-title fw-bold mb-2" style={{ color: '#8a5a5b' }}>Crear Usuario</h6>
                        <p className="card-text mb-3 small" style={{ color: '#9d6b6c' }}>Agrega un nuevo usuario al sistema</p>
                        <Link to="/create" className="btn btn-sm px-3 py-2 rounded-pill fw-semibold shadow-sm" style={{ backgroundColor: '#ba7b7c', color: 'white', border: 'none' }}>
                          <i className="fas fa-plus me-1"></i>
                          Crear
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/*  Segunda card para buscar usuarios */}

                  <div className="col-12 col-md-4">
                    <div className="card h-100 border-0 shadow-sm hover-card" style={{ transition: 'all 0.3s ease', backgroundColor: '#e5c5c5' }}>
                      <div className="card-body text-center p-3">
                        <div className="mb-2">
                          <i className="fas fa-list fa-2x" style={{ color: '#ba7b7c' }}></i>
                        </div>
                        <h6 className="card-title fw-bold mb-2" style={{ color: '#8a5a5b' }}>Listar Usuarios</h6>
                        <p className="card-text mb-3 small" style={{ color: '#9d6b6c' }}>Ver todos los usuarios registrados</p>
                        <Link to="/read" className="btn btn-sm px-3 py-2 rounded-pill fw-semibold shadow-sm" style={{ backgroundColor: '#c88e83', color: 'white', border: 'none' }}>
                          <i className="fas fa-table me-1"></i>
                          Listar
                        </Link>
                      </div>
                    </div>
                  </div>

                {/* Tercera card para buscar usuarios */}

                  <div className="col-12 col-md-4">
                    <div className="card h-100 border-0 shadow-sm hover-card" style={{ transition: 'all 0.3s ease', backgroundColor: '#e5c5c5' }}>
                      <div className="card-body text-center p-3">
                        <div className="mb-2">
                          <i className="fas fa-search fa-2x" style={{ color: '#ba7b7c' }}></i>
                        </div>
                        <h6 className="card-title fw-bold mb-2" style={{ color: '#8a5a5b' }}>Hacer una consulta</h6>
                        <p className="card-text mb-3 small" style={{ color: '#9d6b6c' }}>Buscar usuarios específicos</p>
                        <Link to="/search" className="btn btn-sm px-3 py-2 rounded-pill fw-semibold shadow-sm" style={{ backgroundColor: '#d7a9a9', color: 'white', border: 'none' }}>
                          <i className="fas fa-filter me-1"></i>
                          Buscar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}