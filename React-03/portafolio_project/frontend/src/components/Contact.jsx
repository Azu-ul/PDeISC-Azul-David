import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

    setLoading(true);
    
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
      setLoading(false);
    }
  };

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
                  color: '#2c2c2c',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  letterSpacing: '-1px'
                }}
              >
                Contact Me
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    className="btn btn-outline-dark rounded-0 px-5 py-3"
                    disabled={loading}
                    style={{
                      fontSize: '0.9rem',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      fontWeight: '400',
                      border: '2px solid #2c2c2c',
                      backgroundColor: 'transparent',
                      color: '#2c2c2c',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#2c2c2c';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#2c2c2c';
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
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
                    href="mailto:tu.email@ejemplo.com" 
                    className="text-decoration-none"
                    style={{ color: '#2c2c2c', fontSize: '1rem' }}
                  >
                    tu.email@ejemplo.com
                  </a>
                </div>
                <div className="col-md-6 mb-3">
                  <p className="mb-1" style={{ color: '#666', fontSize: '0.9rem' }}>
                    <strong>Phone</strong>
                  </p>
                  <a 
                    href="tel:+5491112345678" 
                    className="text-decoration-none"
                    style={{ color: '#2c2c2c', fontSize: '1rem' }}
                  >
                    +54 9 11 1234-5678
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