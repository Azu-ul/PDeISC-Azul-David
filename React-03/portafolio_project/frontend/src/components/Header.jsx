import React from 'react';

const Header = () => {
  return (
    <header className="bg-primary text-white py-5">
      <div className="container">
        <div className="row align-items-center min-vh-75">
          <div className="col-lg-8 col-md-10 mx-auto text-center">
            <div className="mb-4">
              <img 
                src="/api/placeholder/200/200" 
                alt="Foto de perfil" 
                className="rounded-circle img-fluid mb-4"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
            </div>
            <h1 className="display-4 fw-bold mb-3">
              Hola, soy <span className="text-warning">Tu Nombre</span>
            </h1>
            <p className="lead mb-4 fs-5">
              Desarrollador Full Stack apasionado por crear experiencias digitales 
              increíbles y soluciones tecnológicas innovadoras.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
              <span className="badge bg-light text-dark fs-6 px-3 py-2">JavaScript</span>
              <span className="badge bg-light text-dark fs-6 px-3 py-2">React</span>
              <span className="badge bg-light text-dark fs-6 px-3 py-2">Node.js</span>
              <span className="badge bg-light text-dark fs-6 px-3 py-2">PostgreSQL</span>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <a 
                href="#projects" 
                className="btn btn-warning btn-lg px-4 py-2 fw-semibold"
                style={{ borderRadius: '50px' }}
              >
                <i className="fas fa-eye me-2"></i>
                Ver Mis Proyectos
              </a>
              <a 
                href="#contact" 
                className="btn btn-outline-light btn-lg px-4 py-2 fw-semibold"
                style={{ borderRadius: '50px' }}
              >
                <i className="fas fa-envelope me-2"></i>
                Contáctame
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="text-center mt-5">
          <a href="#about" className="text-white text-decoration-none">
            <i className="fas fa-chevron-down fa-2x animate__animated animate__bounce animate__infinite"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;