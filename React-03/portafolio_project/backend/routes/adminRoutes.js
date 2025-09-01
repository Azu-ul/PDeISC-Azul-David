import express from 'express';
import pool from '../config/db.js';
import authController from '../controllers/authController.js';

const router = express.Router();

// Middleware to protect all admin routes
router.use(authController.authenticateToken, authController.checkAdminRole);

// Route to create a new portfolio item
router.post('/portfolio', async (req, res) => {
  const { title, description, url, image } = req.body;
  try {
    const query = 'INSERT INTO projects (title, description, url, image) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await pool.query(query, [title, description, url, image]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    res.status(500).json({ error: 'Failed to create portfolio item' });
  }
});

// Route to update an existing portfolio item
router.put('/portfolio/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, url, image } = req.body;
  try {
    const query = 'UPDATE projects SET title = $1, description = $2, url = $3, image = $4 WHERE id = $5 RETURNING *';
    const result = await pool.query(query, [title, description, url, image, id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    res.status(500).json({ error: 'Failed to update portfolio item' });
  }
});

// Route to delete a portfolio item
router.delete('/portfolio/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM projects WHERE id = $1';
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    res.status(500).json({ error: 'Failed to delete portfolio item' });
  }
});

export default router;