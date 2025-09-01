import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Overlay from './Overlay';

const NavBar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirmOverlay, setShowConfirmOverlay] = useState(false);

  const handleLogout = () => {
    setShowConfirmOverlay(true);
  };

  const confirmLogout = () => {
    logout();
    setShowConfirmOverlay(false);
    navigate('/');
  };

  const cancelLogout = () => {
    setShowConfirmOverlay(false);
  };

  const isMiCuentaPage = location.pathname === '/mi-cuenta';

  return (
    <>
      <nav 
        className="navbar navbar-expand-lg fixed-top bg-white border-0" 
        style={{ 
          fontFamily: 'Georgia, serif',
          padding: '20px 0',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          zIndex: 1030
        }}
      >
        <div className="container">
          <Link 
            className="navbar-brand fw-bold text-decoration-none" 
            to="/"
            style={{ 
              color: '#2c2c2c', 
              fontSize: '1.5rem',
              letterSpacing: '0.5px'
            }}
          >
            Portfolio
          </Link>
          
          <button
            className="navbar-toggler border-0 p-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={{ boxShadow: 'none' }}
          >
            <span 
              style={{ 
                width: '25px',
                height: '2px',
                backgroundColor: '#2c2c2c',
                display: 'block',
                margin: '5px 0',
                transition: '0.3s'
              }}
            ></span>
            <span 
              style={{ 
                width: '25px',
                height: '2px',
                backgroundColor: '#2c2c2c',
                display: 'block',
                margin: '5px 0',
                transition: '0.3s'
              }}
            ></span>
            <span 
              style={{ 
                width: '25px',
                height: '2px',
                backgroundColor: '#2c2c2c',
                display: 'block',
                margin: '5px 0',
                transition: '0.3s'
              }}
            ></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a 
                  className="nav-link px-3 text-decoration-none" 
                  href="/#about"
                  style={{ 
                    color: '#666', 
                    fontSize: '1rem',
                    letterSpacing: '1px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                  onMouseOut={(e) => e.target.style.color = '#666'}
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className="nav-link px-3 text-decoration-none" 
                  href="/#projects"
                  style={{ 
                    color: '#666', 
                    fontSize: '1rem',
                    letterSpacing: '1px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                  onMouseOut={(e) => e.target.style.color = '#666'}
                >
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className="nav-link px-3 text-decoration-none" 
                  href="/#contact"
                  style={{ 
                    color: '#666', 
                    fontSize: '1rem',
                    letterSpacing: '1px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                  onMouseOut={(e) => e.target.style.color = '#666'}
                >
                  Contact Me
                </a>
              </li>
              
              {user ? (
                <>
                  {!isMiCuentaPage && (
                    <li className="nav-item">
                      <Link 
                        className="nav-link px-3 text-decoration-none" 
                        to="/mi-cuenta"
                        style={{ 
                          color: '#666', 
                          fontSize: '1rem',
                          letterSpacing: '1px',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                        onMouseOut={(e) => e.target.style.color = '#666'}
                      >
                        Mi Cuenta
                      </Link>
                    </li>
                  )}
                  {isAdmin() && (
                    <li className="nav-item">
                      <Link 
                        className="nav-link px-3 text-decoration-none" 
                        to="/admin"
                        style={{ 
                          color: '#666', 
                          fontSize: '1rem',
                          letterSpacing: '1px',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                        onMouseOut={(e) => e.target.style.color = '#666'}
                      >
                        Editar
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <button 
                      className="btn btn-link nav-link px-3 border-0"
                      onClick={handleLogout}
                      style={{ 
                        color: '#666', 
                        fontSize: '1rem',
                        letterSpacing: '1px',
                        textDecoration: 'none',
                        backgroundColor: 'transparent',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                      onMouseOut={(e) => e.target.style.color = '#666'}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link 
                      className="nav-link px-3 text-decoration-none" 
                      to="/login"
                      style={{ 
                        color: '#666', 
                        fontSize: '1rem',
                        letterSpacing: '1px',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                      onMouseOut={(e) => e.target.style.color = '#666'}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      className="nav-link px-3 text-decoration-none" 
                      to="/register"
                      style={{ 
                        color: '#666', 
                        fontSize: '1rem',
                        letterSpacing: '1px',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                      onMouseOut={(e) => e.target.style.color = '#666'}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      
      <Overlay
        show={showConfirmOverlay}
        type="confirm"
        title="Confirmar Salida"
        message="¿Estás seguro de que quieres cerrar tu sesión?"
        confirmText="Sí, salir"
        cancelText="Cancelar"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
};

export default NavBar;