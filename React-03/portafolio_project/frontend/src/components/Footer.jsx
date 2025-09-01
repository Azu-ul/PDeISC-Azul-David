import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="py-5 bg-white" 
      style={{ 
        fontFamily: 'Georgia, serif',
        borderTop: '1px solid #eee'
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Información principal */}
          <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
            <p 
              className="mb-2" 
              style={{ 
                color: '#2c2c2c', 
                fontSize: '1.1rem',
                fontWeight: '400'
              }}
            >
              Tu Nombre
            </p>
            <p 
              className="mb-0" 
              style={{ 
                color: '#666', 
                fontSize: '0.9rem',
                letterSpacing: '0.5px'
              }}
            >
              Full Stack Developer &amp; Creative Innovator
            </p>
          </div>

          {/* Enlaces de contacto */}
          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-4 mb-3">
              <a
                href="https://linkedin.com/in/tu-perfil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ 
                  color: '#666', 
                  fontSize: '0.9rem',
                  letterSpacing: '1px',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                onMouseOut={(e) => e.target.style.color = '#666'}
              >
                Li
              </a>
              <a
                href="https://github.com/tu-usuario"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ 
                  color: '#666', 
                  fontSize: '0.9rem',
                  letterSpacing: '1px',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                onMouseOut={(e) => e.target.style.color = '#666'}
              >
                Gh
              </a>
              <a
                href="mailto:tu.email@ejemplo.com"
                className="text-decoration-none"
                style={{ 
                  color: '#666', 
                  fontSize: '0.9rem',
                  letterSpacing: '1px',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                onMouseOut={(e) => e.target.style.color = '#666'}
              >
                Email
              </a>
            </div>
            
            <p 
              className="mb-0" 
              style={{ 
                color: '#999', 
                fontSize: '0.8rem',
                letterSpacing: '0.5px'
              }}
            >
              &copy; {currentYear} All rights reserved.
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="row mt-4 pt-4" style={{ borderTop: '1px solid #f5f5f5' }}>
          <div className="col-12 text-center">
            <p 
              className="mb-2" 
              style={{ 
                color: '#999', 
                fontSize: '0.8rem',
                letterSpacing: '1px'
              }}
            >
              Based in Buenos Aires, Argentina
            </p>
            <p 
              className="mb-0" 
              style={{ 
                color: '#ccc', 
                fontSize: '0.7rem',
                letterSpacing: '1px'
              }}
            >
              Made with passion using React &amp; Bootstrap
            </p>
          </div>
        </div>

        {/* Scroll to top button - estilo minimalista */}
        <div 
          className="position-fixed bottom-0 end-0 p-4"
          style={{ zIndex: 1000 }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn border-0 rounded-0 d-flex align-items-center justify-content-center"
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              color: '#666',
              fontSize: '0.8rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
            title="Back to top"
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#2c2c2c';
              e.target.style.color = 'white';
              e.target.style.borderColor = '#2c2c2c';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#666';
              e.target.style.borderColor = '#ddd';
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;