import { Router } from 'express';
import {
  getAllRecords,
  createRecord,
  bulkCreateRecords,
  updateRecord,
  deleteRecord,
} from '../controllers/racksData.controller.js';
import protect from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/rbac.middleware.js';

const router = Router();

router.use(protect);

router.get('/', getAllRecords);
router.post('/', requirePermission('add_records'), createRecord);
router.post('/bulk', requirePermission('add_records'), bulkCreateRecords);
router.put('/:id', requirePermission('manage_records'), updateRecord);
router.delete('/:id', requirePermission('manage_records'), deleteRecord);

export default router;
