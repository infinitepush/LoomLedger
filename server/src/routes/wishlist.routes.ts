import { Router } from 'express';
import { wishlistController } from '../controllers/wishlist.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', wishlistController.get);
router.post('/toggle', wishlistController.toggle);

export default router;
