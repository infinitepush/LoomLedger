import { Router } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middlewares/auth.middleware';
import { cloudinaryService } from '../storage/cloudinary';
import { sendSuccess } from '../utils/response';
import { BadRequestError } from '../utils/errors';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new BadRequestError('Only image files are allowed.'));
    }
    cb(null, true);
  },
});

router.post('/', authMiddleware, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw new BadRequestError('No file provided for upload.');
    }

    const url = await cloudinaryService.uploadImage(req.file.buffer);
    sendSuccess(res, { url }, 'Image uploaded successfully');
  } catch (error) {
    next(error);
  }
});

export default router;
