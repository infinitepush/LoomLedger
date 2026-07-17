import { Router } from 'express';
import { verifyController } from '../controllers/verify.controller';

const router = Router();

router.get('/product/:id', verifyController.verifyProduct);
router.get('/artisan/:id', verifyController.verifyArtisan);

export default router;
