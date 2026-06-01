import { Router } from 'express';
import { getAllUsers, createUser, updateUser, deleteUser } from '../controllers/users.controller.js';
import protect from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/rbac.middleware.js';

const router = Router();

router.use(protect);
router.use(authorize('super_admin', 'admin'));

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', authorize('super_admin'), deleteUser);

export default router;
