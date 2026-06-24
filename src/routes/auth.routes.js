import { Router } from 'express';
import { login, getMe, logout, changePassword, forgotPassword, resetPassword } from '../controllers/auth.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.patch('/change-password', protect, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
