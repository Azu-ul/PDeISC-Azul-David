import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Overlay from './Overlay';

const NavBar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirmOverlay, setShowConfirmOverlay] = useState(false);

  // Muestra el overlay de confirmación
  const handleLogout = () => {
    setShowConfirmOverlay(true);
  };

  // Cierra el overlay y realiza el logout
  const confirmLogout = () => {
    logout();
    setShowConfirmOverlay(false);
    navigate('/');
  };

  // Cierra el overlay sin hacer nada
  const cancelLogout = () => {
    setShowConfirmOverlay(false);
  };

  const isMiCuentaPage = location.pathname === '/mi-cuenta';

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Portfolio
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                {!isMiCuentaPage && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/mi-cuenta">
                      Mi Cuenta
                    </Link>
                  </li>
                )}
                {isAdmin() && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Editar
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      
      {/* Overlay de confirmación de logout */}
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
    </nav>
  );
};

export default NavBar;