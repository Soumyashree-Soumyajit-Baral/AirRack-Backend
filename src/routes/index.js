import { Router } from 'express';
import authRoutes from './auth.routes.js';
import racksDataRoutes from './racksData.routes.js';
import usersRoutes from './users.routes.js';
import auditRoutes from './audit.routes.js';
import warehouseRoutes from './warehouse.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/racks', racksDataRoutes);
router.use('/users', usersRoutes);
router.use('/audit', auditRoutes);
router.use('/warehouses', warehouseRoutes);

export default router;
