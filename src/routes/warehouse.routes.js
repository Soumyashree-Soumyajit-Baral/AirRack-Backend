import { Router } from 'express';
import { getAllWarehouses, createWarehouse, updateWarehouse, deleteWarehouse } from '../controllers/warehouse.controller.js';
import protect from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/rbac.middleware.js';

const router = Router();

router.use(protect);

router.get('/',      getAllWarehouses);
router.post('/',     requirePermission('manage_records'), createWarehouse);
router.put('/:id',   requirePermission('manage_records'), updateWarehouse);
router.delete('/:id',requirePermission('manage_records'), deleteWarehouse);

export default router;
