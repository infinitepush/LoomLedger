import { Router } from 'express';
import { artisanController } from '../controllers/artisan.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();

router.get('/', artisanController.list);
router.get('/stats', authMiddleware, requireRole('artisan'), artisanController.getStats);
router.post('/save', authMiddleware, artisanController.toggleSave);
router.get('/saved', authMiddleware, artisanController.getSaved);
router.get('/:id', artisanController.getProfile);

export default router;
