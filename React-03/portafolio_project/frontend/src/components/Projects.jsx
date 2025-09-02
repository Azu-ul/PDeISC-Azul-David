import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/main.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/portfolio');
        if (!response.data) throw new Error('No se encontraron proyectos');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Error al cargar los proyectos');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl || imageUrl.trim() === '') {
      return null;
    }
    return imageUrl;
  };

  if (loading) {
    return (
      <section className="py-5 bg-white text-center" style={{ minHeight: '50vh', fontFamily: 'Georgia, serif' }}>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
            <div>
              <div className="spinner-border text-dark" role="status" style={{ width: '2rem', height: '2rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading projects...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-5 bg-white">
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
      id="projects" 
      className="py-5 bg-white" 
      style={{ 
        fontFamily: 'Georgia, serif', 
        minHeight: '50vh',
        paddingTop: '120px !important'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h2 
                className="display-4 fw-normal mb-5" 
                style={{ 
                  color: '#F79995',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  letterSpacing: '-1px'
                }}
              >
                Projects
              </h2>
            </div>

            {error && (
              <div className="alert alert-warning text-center mb-4 border-0" style={{ backgroundColor: '#fff5f5', color: '#666' }}>
                {error} - Showing example projects
              </div>
            )}

            {/* Grid de proyectos minimalista */}
            <div className="row">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <motion.div 
                    key={project.id} 
                    className="col-lg-6 mb-5"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  >
                    <div className="project-item h-100">
                      {/* Imagen del proyecto - modificado */}
                      <div className="mb-4">
                        {getImageUrl(project.image) ? (
                          <img 
                            src={getImageUrl(project.image)}
                            alt={project.title}
                            className="img-fluid w-100"
                            style={{ 
                              height: '300px', 
                              objectFit: 'cover',
                              filter: 'grayscale(100%)',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.filter = 'grayscale(0%)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.filter = 'grayscale(100%)';
                            }}
                          />
                        ) : (
                          <div 
                            className="w-100" 
                            style={{ 
                              height: '300px',
                              backgroundColor: '#f8f9fa',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#999'
                            }}
                          >
                            No image available
                          </div>
                        )}
                      </div>

                      {/* Contenido del proyecto */}
                      <div className="project-content">
                        <h3 
                          className="h4 mb-3" 
                          style={{
                            color: '#2c2c2c',
                            fontWeight: '400',
                            letterSpacing: '0.5px'
                          }}
                        >
                          {project.title}
                        </h3>
                        
                        <p 
                          className="mb-4" 
                          style={{ 
                            color: '#666', 
                            lineHeight: '1.7',
                            fontSize: '1rem'
                          }}
                        >
                          {project.description}
                        </p>

                        {/* Tecnologías */}
                        <div className="mb-4">
                          <div className="d-flex flex-wrap gap-2">
                            {project.technologies?.map((tech, techIndex) => (
                              <span 
                                key={techIndex} 
                                className="px-2 py-1"
                                style={{
                                  fontSize: '0.8rem',
                                  color: '#F79995',
                                  border: '1px solid #F79995',
                                  backgroundColor: 'rgba(247, 153, 149, 0.05)',
                                  letterSpacing: '0.5px'
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Link del proyecto */}
                        {project.url && (
                          <div>
                            <a 
                              href={project.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-decoration-none"
                              style={{
                                color: '#F79995',
                                fontSize: '0.9rem',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                fontWeight: '400',
                                borderBottom: '1px solid #F79995',
                                paddingBottom: '2px',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.color = '#666';
                                e.target.style.borderColor = '#666';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.color = '#F79995';
                                e.target.style.borderColor = '#F79995';
                              }}
                            >
                              View Project →
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p style={{ color: '#999', fontSize: '1.1rem' }}>No projects available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;