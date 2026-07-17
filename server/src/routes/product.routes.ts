import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { validate } from '../middlewares/validate.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { createProductSchema, productQuerySchema } from '../validators/product.validator';

const router = Router();

router.get('/', validate(productQuerySchema, 'query'), productController.list);
router.get('/categories', productController.getCategories);
router.post('/ai-specs', authMiddleware, requireRole('artisan'), productController.generateAISpecs);
router.get('/:slug', productController.getBySlug);
router.post('/', authMiddleware, requireRole('artisan'), validate(createProductSchema), productController.create);

export default router;
