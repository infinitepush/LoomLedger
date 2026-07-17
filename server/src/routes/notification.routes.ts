import { Router } from 'express';
import { notificationController } from '../controllers/notification.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', notificationController.list);
router.post('/read-all', notificationController.readAll);
router.post('/:id/read', notificationController.read);

export default router;
