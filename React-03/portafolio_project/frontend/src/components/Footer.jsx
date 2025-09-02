import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [footerData, setFooterData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/content/footer');
        if (!response.ok) throw new Error('Error al cargar los datos del footer');
        const data = await response.json();
        setFooterData(data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) {
    return (
      <footer 
        className="py-5 bg-white" 
        style={{ 
          fontFamily: 'Georgia, serif',
          borderTop: '1px solid #eee',
          minHeight: '200px'
        }}
      >
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="py-5 bg-white">
        <div className="container">
          <div className="text-center">
            <p style={{ color: '#dc3545' }}>Error: {error}</p>
          </div>
        </div>
      </footer>
    );
  }

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
                color: '#F79995', 
                fontSize: '1.1rem',
                fontWeight: '400'
              }}
            >
              {footerData.name}
            </p>
            <p 
              className="mb-0" 
              style={{ 
                color: '#666', 
                fontSize: '0.9rem',
                letterSpacing: '0.5px'
              }}
            >
              {footerData.description}
            </p>
          </div>

          {/* Enlaces de contacto */}
          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-4 mb-3">
              <a
                href="https://linkedin.com/in/clara-keller-neuro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ 
                  color: '#666', 
                  fontSize: '0.9rem',
                  letterSpacing: '1px',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#F79995'}
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
            <p className="mb-2" style={{ color: '#999', fontSize: '0.8rem', letterSpacing: '1px' }}>
              {footerData.location_text}
            </p>
            <p className="mb-0" style={{ color: '#ccc', fontSize: '0.7rem', letterSpacing: '1px' }}>
              {footerData.specialty_text}
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
              border: '1px solid #F79995',
              color: '#F79995',
              fontSize: '0.8rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 10px rgba(247, 153, 149, 0.1)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#F79995';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#F79995';
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