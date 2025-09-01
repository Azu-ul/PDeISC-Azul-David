import PortfolioItem from '../models/PortfolioItem.js';

// Controlador para obtener todos los proyectos
const getProjects = async (req, res) => {
  try {
    console.log('Getting projects...');
    const projects = await PortfolioItem.getAllProjects();
    console.log('Projects retrieved:', projects.length);
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error in getProjects:', error);
    res.status(500).json({ 
      error: 'Error al obtener los proyectos',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default {
  getProjects,
};