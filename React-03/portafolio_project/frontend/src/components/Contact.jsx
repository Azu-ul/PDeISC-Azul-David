import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ show: false, type: '', message: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({ show: true, type: 'error', message: 'El nombre es requerido' });
      return false;
    }
    if (!formData.email.trim()) {
      setStatus({ show: true, type: 'error', message: 'El email es requerido' });
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      setStatus({ show: true, type: 'error', message: 'El email no tiene un formato válido' });
      return false;
    }
    if (!formData.subject.trim()) {
      setStatus({ show: true, type: 'error', message: 'El asunto es requerido' });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({ show: true, type: 'error', message: 'El mensaje es requerido' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Simular envío (aquí deberías integrar con tu servicio de email)
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus({ 
        show: true, 
        type: 'success', 
        message: '¡Mensaje enviado correctamente! Te responderé pronto.' 
      });
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      setStatus({ 
        show: true, 
        type: 'error', 
        message: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'tu.email@ejemplo.com',
      link: 'mailto:tu.email@ejemplo.com',
      color: 'primary'
    },
    {
      icon: 'fab fa-linkedin',
      title: 'LinkedIn',
      value: '/in/tu-perfil',
      link: 'https://linkedin.com/in/tu-perfil',
      color: 'info'
    },
    {
      icon: 'fab fa-github',
      title: 'GitHub',
      value: '/tu-usuario',
      link: 'https://github.com/tu-usuario',
      color: 'dark'
    },
    {
      icon: 'fas fa-phone',
      title: 'Teléfono',
      value: '+54 9 11 1234-5678',
      link: 'tel:+5491112345678',
      color: 'success'
    }
  ];

  return (
    <section id="contact" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary mb-3">Contáctame</h2>
          <div className="bg-warning" style={{ height: '4px', width: '80px', margin: '0 auto' }}></div>
          <p className="lead text-muted mt-3 col-lg-8 mx-auto">
            ¿Tienes un proyecto en mente? ¿Quieres colaborar? ¡Me encantaría escuchar de ti!
            No dudes en contactarme.
          </p>
        </div>

        <div className="row">
          {/* Información de contacto */}
          <div className="col-lg-4 mb-5">
            <div className="h-100">
              <h3 className="h4 mb-4">Información de Contacto</h3>
              
              {contactInfo.map((info, index) => (
                <div key={index} className="d-flex align-items-center mb-4">
                  <div className={`bg-${info.color} text-white rounded-circle p-3 me-3`} 
                       style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={info.icon}></i>
                  </div>
                  <div>
                    <h5 className="mb-1">{info.title}</h5>
                    <a 
                      href={info.link} 
                      className="text-muted text-decoration-none"
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}

              <div className="mt-4 p-4 bg-light rounded-3">
                <h5 className="mb-3">
                  <i className="fas fa-clock text-primary me-2"></i>
                  Horarios de Respuesta
                </h5>
                <p className="mb-2">
                  <strong>Lunes - Viernes:</strong> 9:00 AM - 6:00 PM
                </p>
                <p className="mb-0">
                  <strong>Tiempo de respuesta:</strong> 24-48 horas
                </p>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h3 className="h4 mb-4">Envíame un Mensaje</h3>
                
                {status.show && (
                  <div className={`alert alert-${status.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}>
                    <i className={`fas ${status.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`}></i>
                    {status.message}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setStatus({ ...status, show: false })}
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        placeholder="tu.email@ejemplo.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      Asunto *
                    </label>
                    <select
                      className="form-select"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="proyecto">Nuevo Proyecto</option>
                      <option value="colaboracion">Colaboración</option>
                      <option value="trabajo">Oportunidad de Trabajo</option>
                      <option value="consulta">Consulta General</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">
                      Mensaje *
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      placeholder="Cuéntame sobre tu proyecto o consulta..."
                    ></textarea>
                    <div className="form-text">
                      Mínimo 10 caracteres. Sé específico sobre tu proyecto o consulta.
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg px-5"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Enviar Mensaje
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Sección adicional de redes sociales */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <h3 className="mb-4">También puedes encontrarme en</h3>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer" className="btn btn-outline-info btn-lg">
                <i className="fab fa-linkedin me-2"></i>
                LinkedIn
              </a>
              <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-lg">
                <i className="fab fa-github me-2"></i>
                GitHub
              </a>
              <a href="https://twitter.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-lg">
                <i className="fab fa-twitter me-2"></i>
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;