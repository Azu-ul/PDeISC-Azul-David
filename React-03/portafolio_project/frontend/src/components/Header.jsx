import React from 'react';

// También actualizamos el NavBar
export const MinimalNavBar = () => {
  return (
    <nav 
      className="navbar navbar-expand-lg fixed-top bg-white border-0" 
      style={{ 
        fontFamily: 'Georgia, serif',
        padding: '20px 0',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}
    >
      <div className="container">
        <a 
          className="navbar-brand fw-bold" 
          href="#" 
          style={{ 
            color: '#2c2c2c', 
            fontSize: '1.5rem',
            textDecoration: 'none'
          }}
        >
          Tu Nombre
        </a>
        
        <button
          className="navbar-toggler border-0 p-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{ boxShadow: 'none' }}
        >
          <span 
            className="navbar-toggler-icon"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='m4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")` 
            }}
          ></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
                className="nav-link px-3" 
                href="#about"
                style={{ 
                  color: '#666', 
                  fontSize: '1rem',
                  letterSpacing: '1px'
                }}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link px-3" 
                href="#projects"
                style={{ 
                  color: '#666', 
                  fontSize: '1rem',
                  letterSpacing: '1px'
                }}
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link px-3" 
                href="#contact"
                style={{ 
                  color: '#666', 
                  fontSize: '1rem',
                  letterSpacing: '1px'
                }}
              >
                Contact Me
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Header = () => {
  return (
    <header className="min-vh-100 d-flex align-items-center bg-white" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="mb-5">
              <h1 
                className="display-1 fw-normal mb-4" 
                style={{ 
                  fontSize: 'clamp(3rem, 8vw, 8rem)', 
                  lineHeight: '1.1',
                  color: '#2c2c2c',
                  letterSpacing: '-2px'
                }}
              >
                Hi, I'm{' '}
                <span className="d-block">
                  Tu Nombre.
                </span>
              </h1>
              <h2 
                className="h1 fw-normal mb-5" 
                style={{ 
                  color: '#666',
                  fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                  letterSpacing: '1px',
                  lineHeight: '1.3'
                }}
              >
                Full Stack Developer &amp; <br className="d-sm-none" />
                Creative Innovator
              </h2>
            </div>
            
            <div className="mb-5">
              <a 
                href="#about" 
                className="text-decoration-none me-4"
                style={{ 
                  color: '#ff6b6b', 
                  fontSize: '1.1rem',
                  fontWeight: '400',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}
              >
                About Me →
              </a>
            </div>

            {/* Social Links */}
            <div className="d-flex justify-content-center gap-4 mt-5">
              <a 
                href="https://linkedin.com/in/tu-perfil" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ color: '#666', fontSize: '1.1rem' }}
              >
                Li
              </a>
              <a 
                href="https://github.com/tu-usuario" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ color: '#666', fontSize: '1.1rem' }}
              >
                Gh
              </a>
            </div>

            {/* Scroll indicator */}
            <div 
              className="position-absolute bottom-0 start-50 translate-middle-x mb-4"
              style={{ animation: 'bounce 2s infinite' }}
            >
              <div 
                className="rounded-circle bg-dark"
                style={{ width: '2px', height: '30px' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-10px) translateX(-50%);
          }
          60% {
            transform: translateY(-5px) translateX(-50%);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;