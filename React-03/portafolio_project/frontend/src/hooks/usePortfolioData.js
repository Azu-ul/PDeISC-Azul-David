import { useState, useEffect } from 'react';
import axios from 'axios';

const usePortfolioData = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('http://localhost:5000/api/portfolio');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setError(error.response?.data?.error || 'Error al cargar los proyectos');
      
      // Proporcionar datos de ejemplo en caso de error
      setProjects(getExampleProjects());
    } finally {
      setLoading(false);
    }
  };

  const getExampleProjects = () => [
    {
      id: 1,
      title: "Sistema de Gestión de Usuarios",
      description: "Aplicación full-stack para gestión de usuarios con autenticación JWT, roles de usuario y panel administrativo. Incluye CRUD completo y validaciones.",
      url: "https://github.com/usuario/user-management",
      image: "/api/placeholder/400/250",
      category: "fullstack",
      technologies: ["React", "Node.js", "PostgreSQL", "JWT", "Bootstrap"],
      created_at: "2024-01-15"
    },
    {
      id: 2,
      title: "Dashboard de Analytics",
      description: "Panel de control interactivo con gráficos en tiempo real, métricas de usuario y exportación de reportes. Responsive y optimizado para diferentes dispositivos.",
      url: "https://github.com/usuario/analytics-dashboard",
      image: "/api/placeholder/400/250",
      category: "frontend",
      technologies: ["React", "Chart.js", "Axios", "CSS3", "Bootstrap"],
      created_at: "2024-02-20"
    },
    {
      id: 3,
      title: "API RESTful para E-commerce",
      description: "API robusta para plataforma de comercio electrónico con gestión de productos, pedidos, usuarios y pagos. Documentación completa con Swagger.",
      url: "https://github.com/usuario/ecommerce-api",
      image: "/api/placeholder/400/250",
      category: "backend",
      technologies: ["Node.js", "Express", "PostgreSQL", "Stripe", "Swagger"],
      created_at: "2024-03-10"
    },
    {
      id: 4,
      title: "Portfolio Personal",
      description: "Sitio web personal responsive con sistema de administración de proyectos, formulario de contacto y optimización SEO.",
      url: "https://github.com/usuario/portfolio",
      image: "/api/placeholder/400/250",
      category: "fullstack",
      technologies: ["React", "Node.js", "PostgreSQL", "Bootstrap", "EmailJS"],
      created_at: "2024-04-05"
    },
    {
      id: 5,
      title: "App de Gestión de Tareas",
      description: "Aplicación de productividad con drag & drop, filtros avanzados, notificaciones y sincronización en tiempo real.",
      url: "https://github.com/usuario/task-manager",
      image: "/api/placeholder/400/250",
      category: "frontend",
      technologies: ["React", "Redux", "Local Storage", "CSS3", "React DnD"],
      created_at: "2024-05-12"
    },
    {
      id: 6,
      title: "Sistema de Reservas",
      description: "Backend para sistema de reservas con gestión de disponibilidad, notificaciones por email y integración con calendario.",
      url: "https://github.com/usuario/booking-system",
      image: "/api/placeholder/400/250",
      category: "backend",
      technologies: ["Node.js", "Express", "MongoDB", "Nodemailer", "Cron"],
      created_at: "2024-06-08"
    }
  ];

  // Función para crear un nuevo proyecto (solo para admins)
  const createProject = async (projectData, token) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/portfolio',
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Actualizar la lista local
      setProjects(prev => [response.data, ...prev]);
      return { success: true, project: response.data };
    } catch (error) {
      console.error('Error creating project:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al crear el proyecto' 
      };
    }
  };

  // Función para actualizar un proyecto existente
  const updateProject = async (projectId, projectData, token) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/portfolio/${projectId}`,
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Actualizar la lista local
      setProjects(prev => 
        prev.map(project => 
          project.id === projectId ? response.data : project
        )
      );
      
      return { success: true, project: response.data };
    } catch (error) {
      console.error('Error updating project:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al actualizar el proyecto' 
      };
    }
  };

  // Función para eliminar un proyecto
  const deleteProject = async (projectId, token) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/portfolio/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Actualizar la lista local
      setProjects(prev => prev.filter(project => project.id !== projectId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting project:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al eliminar el proyecto' 
      };
    }
  };

  // Filtrar proyectos por categoría
  const getProjectsByCategory = (category) => {
    if (category === 'all') return projects;
    return projects.filter(project => project.category === category);
  };

  // Obtener estadísticas de proyectos
  const getProjectStats = () => {
    const total = projects.length;
    const byCategory = projects.reduce((acc, project) => {
      const category = project.category || 'general';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      byCategory,
      categories: Object.keys(byCategory)
    };
  };

  // Buscar proyectos por título o tecnología
  const searchProjects = (query) => {
    if (!query.trim()) return projects;
    
    const lowercaseQuery = query.toLowerCase();
    return projects.filter(project => 
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      (project.technologies && project.technologies.some(tech => 
        tech.toLowerCase().includes(lowercaseQuery)
      ))
    );
  };

  // Cargar proyectos al montar el componente
  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    getProjectsByCategory,
    getProjectStats,
    searchProjects
  };
};

export default usePortfolioData;