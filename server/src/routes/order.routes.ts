import { Router } from 'express';
import { orderController } from '../controllers/order.controller';
import { validate } from '../middlewares/validate.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { createOrderSchema, updateOrderStatusSchema } from '../validators/order.validator';

const router = Router();

router.use(authMiddleware);

router.post('/', requireRole('buyer'), validate(createOrderSchema), orderController.create);
router.get('/buyer', requireRole('buyer'), orderController.listBuyer);
router.get('/artisan', requireRole('artisan'), orderController.listArtisan);
router.get('/:id', orderController.getDetail);
router.patch('/:id/status', requireRole('artisan'), validate(updateOrderStatusSchema), orderController.updateStatus);

export default router;
