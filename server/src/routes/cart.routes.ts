import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', cartController.get);
router.post('/add', cartController.add);
router.post('/update', cartController.update);
router.post('/remove', cartController.remove);
router.post('/clear', cartController.clear);

export default router;
