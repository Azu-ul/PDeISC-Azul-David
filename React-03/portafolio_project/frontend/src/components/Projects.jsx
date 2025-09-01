import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

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
      setError('Error al cargar los proyectos');
      setProjects(getExampleProjects()); // proyectos de ejemplo
    } finally {
      setLoading(false);
    }
  };

  // Proyectos de ejemplo
  const getExampleProjects = () => [
    {
      id: 1,
      title: "E-commerce React",
      description: "Plataforma de comercio electrónico con React, Node.js y PostgreSQL.",
      url: "https://github.com/usuario/ecommerce-react",
      image: "/api/placeholder/400/250",
      category: "fullstack",
      technologies: ["React", "Node.js", "PostgreSQL"]
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      description: "Dashboard interactivo con gráficos en tiempo real y filtros avanzados.",
      url: "https://github.com/usuario/dashboard-analytics",
      image: "/api/placeholder/400/250",
      category: "frontend",
      technologies: ["React", "Chart.js", "Bootstrap"]
    }
  ];

  const categories = [
    { key: 'all', label: 'Todos', icon: 'fas fa-th' },
    { key: 'fullstack', label: 'Full Stack', icon: 'fas fa-layers' },
    { key: 'frontend', label: 'Frontend', icon: 'fas fa-laptop-code' },
    { key: 'backend', label: 'Backend', icon: 'fas fa-server' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  if (loading) {
    return (
      <section id="projects" className="py-5 bg-light text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Cargando proyectos...</p>
      </section>
    );
  }

  return (
    <section id="projects" className="py-5 bg-light">
      <div className="container">
        {/* Título */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary mb-3">Mis Proyectos</h2>
          <div className="bg-warning mx-auto" style={{ height: '4px', width: '80px' }}></div>
          <p className="lead text-muted mt-3 col-lg-8 mx-auto">
            Algunos proyectos que muestran mis habilidades en desarrollo web.
          </p>
        </div>

        {/* Filtros */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`btn ${selectedCategory === category.key 
                ? 'btn-primary' 
                : 'btn-outline-primary'
              } rounded-pill px-4 py-2`}
            >
              <i className={`${category.icon} me-2`}></i>
              {category.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="alert alert-warning text-center mb-4">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error} - Mostrando proyectos de ejemplo
          </div>
        )}

        {/* Grid de proyectos */}
        <div className="row">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 shadow-sm border-0 project-card">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary">{project.title}</h5>
                    <p className="card-text text-muted flex-grow-1">{project.description}</p>
                    
                    <div className="mb-3">
                      {project.technologies?.map((tech, index) => (
                        <span key={index} className="badge bg-light text-dark border me-1">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" 
                        className="btn btn-primary w-100">
                        <i className="fab fa-github me-2"></i>
                        Ver Proyecto
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <i className="fas fa-folder-open fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">No hay proyectos en esta categoría</h4>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
