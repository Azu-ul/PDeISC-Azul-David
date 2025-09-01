import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db.js'; // Agregar esta línea
import portfolioRoutes from './routes/portfolioRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      success: true, 
      message: 'Database connected successfully',
      timestamp: result.rows[0].now 
    });
  } catch (error) {
    console.error('Database test failed:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Database connection failed',
      details: error.message 
    });
  }
});

// Test projects table
app.get('/api/test-projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM projects');
    res.json({ 
      success: true, 
      message: 'Projects table accessible',
      count: result.rows[0].count 
    });
  } catch (error) {
    console.error('Projects table test failed:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Projects table access failed',
      details: error.message 
    });
  }
});

// Rutas de la API
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});