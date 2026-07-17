import { Router } from 'express';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';
import artisanRoutes from './artisan.routes';
import orderRoutes from './order.routes';
import cartRoutes from './cart.routes';
import wishlistRoutes from './wishlist.routes';
import adminRoutes from './admin.routes';
import storyRoutes from './story.routes';
import verifyRoutes from './verify.routes';
import notificationRoutes from './notification.routes';
import uploadRoutes from './upload.routes';
import assistantRoutes from './assistant.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/artisans', artisanRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/admin', adminRoutes);
router.use('/stories', storyRoutes);
router.use('/verify', verifyRoutes);
router.use('/notifications', notificationRoutes);
router.use('/upload', uploadRoutes);
router.use('/assistant', assistantRoutes);

export default router;
