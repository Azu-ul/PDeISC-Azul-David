import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/change-password', authController.authenticateToken, authController.changePassword);
router.put('/reset-password', authController.resetPassword);
router.get('/me', authController.authenticateToken, authController.getLoggedInUser);

export default router;