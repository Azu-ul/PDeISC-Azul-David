import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/portfolio');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Error loading projects');
      setProjects(getExampleProjects());
    } finally {
      setLoading(false);
    }
  };

  const getExampleProjects = () => [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Modern e-commerce platform built with React, Node.js and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      url: "https://github.com/usuario/ecommerce-react",
      image: "/api/placeholder/600/400",
      category: "fullstack",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"]
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      description: "Interactive analytics dashboard with real-time data visualization and advanced filtering capabilities.",
      url: "https://github.com/usuario/dashboard-analytics",
      image: "/api/placeholder/600/400",
      category: "frontend",
      technologies: ["React", "Chart.js", "Bootstrap", "API Integration"]
    },
    {
      id: 3,
      title: "Task Management API",
      description: "RESTful API for task management with user authentication, role-based access control, and comprehensive documentation.",
      url: "https://github.com/usuario/task-api",
      image: "/api/placeholder/600/400",
      category: "backend",
      technologies: ["Node.js", "Express", "PostgreSQL", "JWT"]
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Responsive portfolio website with modern design, contact form integration, and content management system.",
      url: "https://github.com/usuario/portfolio",
      image: "/api/placeholder/600/400",
      category: "frontend",
      technologies: ["React", "Bootstrap", "Node.js", "Email.js"]
    }
  ];

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

  return (
    <section 
      id="projects" 
      className="py-5 bg-white" 
      style={{ 
        fontFamily: 'Georgia, serif', 
        minHeight: '100vh',
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
                  color: '#2c2c2c',
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
                  <div key={project.id} className="col-lg-6 mb-5">
                    <div 
                      className="project-item h-100"
                      style={{
                        borderTop: index < 2 ? '1px solid #eee' : 'none',
                        paddingTop: index < 2 ? '2rem' : '0'
                      }}
                    >
                      {/* Imagen del proyecto */}
                      <div className="mb-4">
                        <img 
                          src={project.image} 
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
                                  color: '#999',
                                  border: '1px solid #eee',
                                  backgroundColor: 'transparent',
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
                                color: '#2c2c2c',
                                fontSize: '0.9rem',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                fontWeight: '400',
                                borderBottom: '1px solid #2c2c2c',
                                paddingBottom: '2px',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.color = '#666';
                                e.target.style.borderColor = '#666';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.color = '#2c2c2c';
                                e.target.style.borderColor = '#2c2c2c';
                              }}
                            >
                              View Project →
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p style={{ color: '#999', fontSize: '1.1rem' }}>No projects available</p>
                </div>
              )}
            </div>

            {/* Sección adicional */}
            <div className="row mt-5 pt-5" style={{ borderTop: '1px solid #eee' }}>
              <div className="col-12 text-center">
                <p 
                  className="mb-4" 
                  style={{ 
                    color: '#666', 
                    fontSize: '1.1rem',
                    lineHeight: '1.7'
                  }}
                >
                  Want to see more of my work? <br />
                  Check out my GitHub for additional projects and contributions.
                </p>
                <a 
                  href="https://github.com/tu-usuario" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark rounded-0 px-4 py-3"
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
                  View GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;