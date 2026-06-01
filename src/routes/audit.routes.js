import { Router } from 'express';
import { getRecordTimeline, getDeletedLogs } from '../controllers/audit.controller.js';
import protect from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/rbac.middleware.js';

const router = Router();

router.use(protect, requirePermission('view_records'));

router.get('/timeline/:id', getRecordTimeline);
router.get('/deleted', getDeletedLogs);

export default router;
