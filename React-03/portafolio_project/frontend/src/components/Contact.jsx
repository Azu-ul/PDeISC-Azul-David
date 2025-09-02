import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [contactData, setContactData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [status, setStatus] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/content/contact');
        if (!response.ok) throw new Error('Error al cargar los datos de contacto');
        const data = await response.json();
        setContactData(data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({ show: true, type: 'error', message: 'Name is required' });
      return false;
    }
    if (!formData.email.trim()) {
      setStatus({ show: true, type: 'error', message: 'Email is required' });
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      setStatus({ show: true, type: 'error', message: 'Please enter a valid email' });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({ show: true, type: 'error', message: 'Message is required' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus({ 
        show: true, 
        type: 'success', 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      });
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
    } catch (error) {
      setStatus({ 
        show: true, 
        type: 'error', 
        message: 'Error sending message. Please try again.' 
      });
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <section 
        id="contact" 
        className="py-5 bg-white" 
        style={{ 
          fontFamily: 'Georgia, serif', 
          minHeight: '100vh',
          paddingTop: '120px !important'
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="text-center">
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="contact" className="py-5 bg-white">
        <div className="container">
          <div className="text-center">
            <p style={{ color: '#dc3545' }}>Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="contact" 
      className="py-5 bg-white" 
      style={{ 
        fontFamily: 'Georgia, serif', 
        minHeight: '100vh',
        paddingTop: '120px !important'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="text-center mb-5">
              <h2 
                className="display-4 fw-normal mb-5" 
                style={{ 
                  color: '#F79995',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  letterSpacing: '-1px'
                }}
              >
                {contactData.title || 'Contact Me'}
              </h2>
            </div>
            
            {/* Formulario minimalista */}
            <div className="mb-5">
              {status.show && (
                <div 
                  className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'} text-center border-0 rounded-0`}
                  style={{ 
                    backgroundColor: status.type === 'success' ? '#f8f9fa' : '#fff5f5',
                    color: status.type === 'success' ? '#28a745' : '#dc3545',
                    border: `1px solid ${status.type === 'success' ? '#28a745' : '#dc3545'} !important`
                  }}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label 
                    htmlFor="name" 
                    className="form-label"
                    style={{ 
                      color: '#666',
                      fontSize: '0.9rem',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: '15px'
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    className="form-control border-0 border-bottom rounded-0 px-0 py-3"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={formLoading}
                    placeholder="Your Name..."
                    style={{
                      backgroundColor: 'transparent',
                      borderBottom: '1px solid #ddd !important',
                      fontSize: '1.1rem',
                      color: '#2c2c2c',
                      fontFamily: 'Georgia, serif',
                      boxShadow: 'none'
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label 
                    htmlFor="email" 
                    className="form-label"
                    style={{ 
                      color: '#666',
                      fontSize: '0.9rem',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: '15px'
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="form-control border-0 border-bottom rounded-0 px-0 py-3"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={formLoading}
                    placeholder="Your Email Address..."
                    style={{
                      backgroundColor: 'transparent',
                      borderBottom: '1px solid #ddd !important',
                      fontSize: '1.1rem',
                      color: '#2c2c2c',
                      fontFamily: 'Georgia, serif',
                      boxShadow: 'none'
                    }}
                  />
                </div>
                
                <div className="mb-4">
                  <label 
                    htmlFor="message" 
                    className="form-label"
                    style={{ 
                      color: '#666',
                      fontSize: '0.9rem',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: '15px'
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    className="form-control border-0 border-bottom rounded-0 px-0 py-3"
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={formLoading}
                    placeholder="Your Message..."
                    style={{
                      backgroundColor: 'transparent',
                      borderBottom: '1px solid #ddd !important',
                      fontSize: '1.1rem',
                      color: '#2c2c2c',
                      fontFamily: 'Georgia, serif',
                      boxShadow: 'none',
                      resize: 'none'
                    }}
                  ></textarea>
                </div>
                
                <div className="text-center mt-5">
                  <button 
                    type="submit" 
                    className="btn rounded-0 px-5 py-3"
                    disabled={formLoading}
                    style={{
                      fontSize: '0.9rem',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      fontWeight: '400',
                      backgroundColor: 'transparent',
                      border: '2px solid #F79995',
                      color: '#F79995',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#F79995';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#F79995';
                    }}
                  >
                    {formLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact info minimalista */}
            <div className="text-center mt-5 pt-5" style={{ borderTop: '1px solid #eee' }}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <p className="mb-1" style={{ color: '#666', fontSize: '0.9rem' }}>
                    <strong>Email</strong>
                  </p>
                  <a 
                    href={`mailto:${contactData.email}`} 
                    className="text-decoration-none"
                    style={{ 
                      color: '#2c2c2c', 
                      fontSize: '1rem',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#F79995'}
                    onMouseOut={(e) => e.target.style.color = '#2c2c2c'}
                  >
                    {contactData.email}
                  </a>
                </div>
                <div className="col-md-6 mb-3">
                  <p className="mb-1" style={{ color: '#666', fontSize: '0.9rem' }}>
                    <strong>Website</strong>
                  </p>
                  <a 
                    href={contactData.website} 
                    className="text-decoration-none"
                    style={{ color: '#2c2c2c', fontSize: '1rem' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contactData.website}
                  </a>
                </div>
                <div className="col-md-6 mb-3">
                  <p className="mb-1" style={{ color: '#666', fontSize: '0.9rem' }}>
                    <strong>Location</strong>
                  </p>
                  <p style={{ color: '#2c2c2c', fontSize: '1rem', margin: 0 }}>
                    {contactData.location}
                  </p>
                </div>
                <div className="col-md-6 mb-3">
                  <p className="mb-1" style={{ color: '#666', fontSize: '0.9rem' }}>
                    <strong>LinkedIn</strong>
                  </p>
                  <a 
                    href={contactData.linkedin}
                    className="text-decoration-none"
                    style={{ color: '#2c2c2c', fontSize: '1rem' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contactData.linkedin}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;