import { Router } from 'express';
import { getRecordTimeline, getDeletedLogs, restoreRecord, permanentDeleteLog } from '../controllers/audit.controller.js';
import protect from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/rbac.middleware.js';

const router = Router();

router.use(protect, requirePermission('view_records'));

router.get('/timeline/:id', getRecordTimeline);
router.get('/deleted', getDeletedLogs);
router.post('/restore/:id',           requirePermission('manage_records'), restoreRecord);
router.delete('/permanent/:id',       requirePermission('manage_records'), permanentDeleteLog);

export default router;
