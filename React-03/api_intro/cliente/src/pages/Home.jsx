import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='min-vh-100 d-flex align-items-center' style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-10 col-lg-8'>
            <div className='card shadow-lg border-0'>
              <div className='card-header bg-gradient text-center py-5' style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                <h1 className="mb-2 fw-bold display-4">
                  <i className="fas fa-users me-3"></i>
                  Sistema de Gestión de Usuarios
                </h1>
                <p className="mb-0 fs-5 opacity-90">Administra usuarios de manera fácil y eficiente</p>
              </div>
              
              <div className='card-body p-5'>
                <div className="text-center mb-5">
                  <h3 className="text-dark mb-3 fw-semibold">¿Qué deseas hacer?</h3>
                  <p className="text-muted fs-6">Selecciona una de las opciones disponibles</p>
                </div>
                
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm hover-card" style={{transition: 'all 0.3s ease'}}>
                      <div className="card-body text-center p-4">
                        <div className="mb-3">
                          <i className="fas fa-user-plus fa-3x text-success"></i>
                        </div>
                        <h5 className="card-title fw-bold text-dark">Crear Usuario</h5>
                        <p className="card-text text-muted mb-4">Agrega un nuevo usuario al sistema con toda su información</p>
                        <Link to="/create" className="btn btn-success btn-lg px-4 py-2 rounded-pill fw-semibold shadow-sm">
                          <i className="fas fa-plus me-2"></i>
                          Crear
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm hover-card" style={{transition: 'all 0.3s ease'}}>
                      <div className="card-body text-center p-4">
                        <div className="mb-3">
                          <i className="fas fa-list fa-3x text-info"></i>
                        </div>
                        <h5 className="card-title fw-bold text-dark">Listar Usuarios</h5>
                        <p className="card-text text-muted mb-4">Ver todos los usuarios registrados y administrarlos</p>
                        <Link to="/read" className="btn btn-info btn-lg px-4 py-2 rounded-pill fw-semibold shadow-sm">
                          <i className="fas fa-table me-2"></i>
                          Listar
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm hover-card" style={{transition: 'all 0.3s ease'}}>
                      <div className="card-body text-center p-4">
                        <div className="mb-3">
                          <i className="fas fa-search fa-3x text-warning"></i>
                        </div>
                        <h5 className="card-title fw-bold text-dark">Hacer una consulta</h5>
                        <p className="card-text text-muted mb-4">Buscar y filtrar usuarios específicos del sistema</p>
                        <Link to="/search" className="btn btn-warning btn-lg px-4 py-2 rounded-pill fw-semibold shadow-sm">
                          <i className="fas fa-filter me-2"></i>
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