import React, { useState, useEffect } from 'react';

const About = () => {
  const [aboutData, setAboutData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/content/about');
        if (!response.ok) throw new Error('Error al cargar los datos de about');
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching about data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-5 bg-white" style={{ fontFamily: 'Georgia, serif', minHeight: '100vh' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center" style={{ paddingTop: '100px' }}>
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
      <section id="about" className="py-5 bg-white">
        <div className="container">
          <div className="text-center">
            <p style={{ color: '#dc3545' }}>Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-5 bg-white" style={{ fontFamily: 'Georgia, serif', minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5" style={{ paddingTop: '100px' }}>
              <h2 
                className="display-4 fw-normal mb-5" 
                style={{ 
                  color: '#F79995',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  letterSpacing: '-1px'
                }}
              >
                {aboutData.title}
              </h2>
            </div>
            
            <div className="row">
              <div className="col-12">
                <div style={{ 
                  fontSize: '1.2rem', 
                  lineHeight: '1.8', 
                  color: '#666', 
                  textAlign: 'center',
                  padding: '30px',
                  border: '1px solid rgba(247, 153, 149, 0.2)',
                  borderRadius: '4px'
                }}>
                  <p className="mb-4">{aboutData.paragraph_1}</p>
                  <p className="mb-5">{aboutData.paragraph_2}</p>
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