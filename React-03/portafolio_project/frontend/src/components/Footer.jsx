import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Inicio', href: '#header' },
    { name: 'Sobre Mí', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Contacto', href: '#contact' }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/tu-perfil',
      icon: 'fab fa-linkedin',
      color: '#0077b5'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/tu-usuario',
      icon: 'fab fa-github',
      color: '#333'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/tu-usuario',
      icon: 'fab fa-twitter',
      color: '#1da1f2'
    },
    {
      name: 'Email',
      url: 'mailto:tu.email@ejemplo.com',
      icon: 'fas fa-envelope',
      color: '#ea4335'
    }
  ];

  const technologies = [
    'React', 'Node.js', 'PostgreSQL', 'Express.js', 'JavaScript', 'Bootstrap'
  ];

  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          {/* Información principal */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="text-warning mb-3">
              <i className="fas fa-code me-2"></i>
              Portfolio
            </h5>
            <p className="text-light-emphasis mb-3">
              Desarrollador Full Stack apasionado por crear soluciones digitales 
              innovadoras y experiencias web excepcionales.
            </p>
            <div className="d-flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target={social.name !== 'Email' ? '_blank' : undefined}
                  rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="text-light text-decoration-none"
                  style={{ transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.color = social.color}
                  onMouseLeave={(e) => e.target.style.color = ''}
                >
                  <i className={`${social.icon} fa-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="text-warning mb-3">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              {quickLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <a 
                    href={link.href} 
                    className="text-light-emphasis text-decoration-none hover-link"
                  >
                    <i className="fas fa-angle-right me-2"></i>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tecnologías */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-warning mb-3">Tecnologías</h5>
            <div className="d-flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="badge bg-secondary text-light px-2 py-1"
                  style={{ fontSize: '0.8rem' }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-3">
              <small className="text-light-emphasis">
                <i className="fas fa-rocket me-2"></i>
                Siempre aprendiendo nuevas tecnologías
              </small>
            </div>
          </div>

          {/* Contacto rápido */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-warning mb-3">Contacto Rápido</h5>
            <div className="mb-2">
              <i className="fas fa-envelope text-warning me-2"></i>
              <a href="mailto:tu.email@ejemplo.com" className="text-light-emphasis text-decoration-none">
                tu.email@ejemplo.com
              </a>
            </div>
            <div className="mb-2">
              <i className="fas fa-phone text-warning me-2"></i>
              <a href="tel:+5491112345678" className="text-light-emphasis text-decoration-none">
                +54 9 11 1234-5678
              </a>
            </div>
            <div className="mb-3">
              <i className="fas fa-map-marker-alt text-warning me-2"></i>
              <span className="text-light-emphasis">
                Buenos Aires, Argentina
              </span>
            </div>
            <a 
              href="#contact" 
              className="btn btn-warning btn-sm rounded-pill px-3"
            >
              <i className="fas fa-paper-plane me-2"></i>
              Enviar Mensaje
            </a>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        {/* Copyright y información adicional */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-light-emphasis">
              &copy; {currentYear} Tu Nombre. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <small className="text-light-emphasis">
              <i className="fas fa-heart text-danger me-1"></i>
              Hecho con pasión usando React & Bootstrap
            </small>
          </div>
        </div>

        {/* Scroll to top button */}
        <div className="position-fixed bottom-0 end-0 p-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn btn-warning rounded-circle shadow"
            style={{ width: '50px', height: '50px' }}
            title="Volver arriba"
          >
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>

      <style jsx>{`
        .hover-link:hover {
          color: #ffc107 !important;
          transition: color 0.3s ease;
        }
        
        .text-light-emphasis {
          color: #adb5bd !important;
        }
        
        .text-light-emphasis:hover {
          color: #ffffff !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;