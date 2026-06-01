import { Router } from 'express';
import { login, getMe, logout, changePassword } from '../controllers/auth.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.patch('/change-password', protect, changePassword);

export default router;
