import express from 'express';
import portfolioController from '../controllers/portfolioController.js';

const router = express.Router();

// Ruta para obtener todos los proyectos
router.get('/', portfolioController.getProjects);

export default router;