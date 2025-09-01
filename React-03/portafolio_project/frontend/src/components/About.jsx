import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-primary mb-3">Sobre Mí</h2>
              <div className="bg-warning" style={{ height: '4px', width: '80px', margin: '0 auto' }}></div>
            </div>
            
            <div className="row align-items-center">
              <div className="col-md-4 text-center mb-4 mb-md-0">
                <img 
                  src="/api/placeholder/300/300" 
                  alt="Foto profesional" 
                  className="img-fluid rounded-3 shadow"
                  style={{ maxWidth: '250px' }}
                />
              </div>
              
              <div className="col-md-8">
                <h3 className="h4 text-primary mb-3">¡Hola! Soy un desarrollador apasionado por la tecnología</h3>
                <p className="text-muted mb-3">
                  Con más de 3 años de experiencia en desarrollo web, me especializo en crear 
                  aplicaciones modernas y escalables. Mi enfoque se centra en escribir código 
                  limpio, eficiente y mantenible.
                </p>
                <p className="text-muted mb-4">
                  Me encanta trabajar con las últimas tecnologías y siempre estoy buscando 
                  nuevos desafíos que me permitan crecer profesionalmente y aportar valor 
                  a los proyectos en los que participo.
                </p>
                
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      <span>Desarrollo Full Stack</span>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      <span>Diseño Responsivo</span>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      <span>API Development</span>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      <span>Base de Datos</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <a href="#contact" className="btn btn-primary me-3">
                    <i className="fas fa-envelope me-2"></i>
                    Hablemos
                  </a>
                  <a href="/cv.pdf" target="_blank" className="btn btn-outline-primary">
                    <i className="fas fa-download me-2"></i>
                    Descargar CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="row mt-5 pt-5">
          <div className="col-md-3 col-6 text-center mb-4">
            <div className="bg-white p-4 rounded-3 shadow-sm">
              <i className="fas fa-code fa-2x text-primary mb-2"></i>
              <h3 className="h2 fw-bold text-primary mb-1">50+</h3>
              <p className="text-muted mb-0">Proyectos Completados</p>
            </div>
          </div>
          <div className="col-md-3 col-6 text-center mb-4">
            <div className="bg-white p-4 rounded-3 shadow-sm">
              <i className="fas fa-users fa-2x text-success mb-2"></i>
              <h3 className="h2 fw-bold text-success mb-1">20+</h3>
              <p className="text-muted mb-0">Clientes Satisfechos</p>
            </div>
          </div>
          <div className="col-md-3 col-6 text-center mb-4">
            <div className="bg-white p-4 rounded-3 shadow-sm">
              <i className="fas fa-clock fa-2x text-warning mb-2"></i>
              <h3 className="h2 fw-bold text-warning mb-1">3+</h3>
              <p className="text-muted mb-0">Años de Experiencia</p>
            </div>
          </div>
          <div className="col-md-3 col-6 text-center mb-4">
            <div className="bg-white p-4 rounded-3 shadow-sm">
              <i className="fas fa-coffee fa-2x text-danger mb-2"></i>
              <h3 className="h2 fw-bold text-danger mb-1">∞</h3>
              <p className="text-muted mb-0">Tazas de Café</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;