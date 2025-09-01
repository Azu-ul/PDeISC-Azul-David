import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-5 bg-white" style={{ fontFamily: 'Georgia, serif', minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5" style={{ paddingTop: '100px' }}>
              <h2 
                className="display-4 fw-normal mb-5" 
                style={{ 
                  color: '#2c2c2c',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  letterSpacing: '-1px'
                }}
              >
                About
              </h2>
            </div>
            
            <div className="row">
              <div className="col-12">
                <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#666', textAlign: 'center' }}>
                  <p className="mb-4">
                    Soy un desarrollador creativo e innovador, estratega de branding y experto en diseño 
                    con años de experiencia creando soluciones visuales impactantes para varios clientes 
                    en numerosas verticales de la industria.
                  </p>
                  <p className="mb-5">
                    Combino una amplia gama de experiencia en diseño gráfico con una comprensión profunda 
                    de la psicología detrás del diseño para crear campañas efectivas y narrativas corporativas. 
                    Soy experto en diseño de producción y creación de assets para medios modernos.
                  </p>
                </div>

                {/* Skills en formato minimalista */}
                <div className="row mt-5 pt-5">
                  <div className="col-12">
                    <div className="text-center mb-4">
                      <h3 
                        className="h4 fw-normal" 
                        style={{ 
                          color: '#2c2c2c', 
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          fontSize: '0.9rem'
                        }}
                      >
                        Skills
                      </h3>
                    </div>
                    
                    <div className="row justify-content-center">
                      <div className="col-lg-8">
                        <div className="d-flex flex-wrap justify-content-center gap-3">
                          {[
                            'JavaScript', 'React', 'Node.js', 'PostgreSQL', 
                            'Express.js', 'HTML5', 'CSS3', 'Bootstrap',
                            'Git', 'API REST', 'UX/UI Design'
                          ].map((skill, index) => (
                            <span 
                              key={index}
                              className="px-3 py-2 border rounded-0"
                              style={{ 
                                color: '#666',
                                borderColor: '#ddd',
                                fontSize: '0.9rem',
                                letterSpacing: '0.5px',
                                backgroundColor: 'transparent'
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats en formato minimalista */}
                <div className="row mt-5 pt-5">
                  <div className="col-md-3 col-6 text-center mb-4">
                    <div className="p-3">
                      <h3 
                        className="display-6 fw-normal mb-2" 
                        style={{ color: '#2c2c2c' }}
                      >
                        50+
                      </h3>
                      <p 
                        className="mb-0" 
                        style={{ 
                          color: '#999', 
                          fontSize: '0.9rem',
                          letterSpacing: '1px',
                          textTransform: 'uppercase'
                        }}
                      >
                        Projects
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 text-center mb-4">
                    <div className="p-3">
                      <h3 
                        className="display-6 fw-normal mb-2" 
                        style={{ color: '#2c2c2c' }}
                      >
                        3+
                      </h3>
                      <p 
                        className="mb-0" 
                        style={{ 
                          color: '#999', 
                          fontSize: '0.9rem',
                          letterSpacing: '1px',
                          textTransform: 'uppercase'
                        }}
                      >
                        Years
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 text-center mb-4">
                    <div className="p-3">
                      <h3 
                        className="display-6 fw-normal mb-2" 
                        style={{ color: '#2c2c2c' }}
                      >
                        20+
                      </h3>
                      <p 
                        className="mb-0" 
                        style={{ 
                          color: '#999', 
                          fontSize: '0.9rem',
                          letterSpacing: '1px',
                          textTransform: 'uppercase'
                        }}
                      >
                        Clients
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 text-center mb-4">
                    <div className="p-3">
                      <h3 
                        className="display-6 fw-normal mb-2" 
                        style={{ color: '#2c2c2c' }}
                      >
                        ∞
                      </h3>
                      <p 
                        className="mb-0" 
                        style={{ 
                          color: '#999', 
                          fontSize: '0.9rem',
                          letterSpacing: '1px',
                          textTransform: 'uppercase'
                        }}
                      >
                        Coffee
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;