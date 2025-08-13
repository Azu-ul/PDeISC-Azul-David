import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ exportTasks }) {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          📋 Mi Lista de Tareas
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{
            backgroundColor: 'white',
            border: '1px solid white'
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                🏠 Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                ➕ Nueva Tarea
              </Link>
            </li>
          </ul>
          
          <button 
            className="btn btn-export"
            onClick={exportTasks}
          >
            💾 Exportar a TXT
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;