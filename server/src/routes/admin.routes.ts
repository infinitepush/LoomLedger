import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();

router.use(authMiddleware);
router.use(requireRole('admin'));

router.get('/pending-artisans', adminController.listPending);
router.post('/approve-artisan/:id', adminController.approve);
router.post('/reject-artisan/:id', adminController.reject);

export default router;
