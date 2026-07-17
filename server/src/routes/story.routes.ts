import { Router } from 'express';
import { storyController } from '../controllers/story.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();

router.get('/', storyController.list);
router.post('/generate', authMiddleware, requireRole('artisan'), storyController.generate);
router.get('/:slug', storyController.getBySlug);

export default router;
