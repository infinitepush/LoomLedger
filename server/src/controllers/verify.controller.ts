import { Request, Response, NextFunction } from 'express';
import { verifyService } from '../services/verify.service';
import { sendSuccess } from '../utils/response';

export class VerifyController {
  async verifyProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await verifyService.verifyById(id);
      sendSuccess(res, result, 'Product authenticity verified');
    } catch (error) {
      next(error);
    }
  }

  async verifyArtisan(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await verifyService.verifyArtisanById(id);
      sendSuccess(res, result, 'Artisan signature status verified');
    } catch (error) {
      next(error);
    }
  }
}

export const verifyController = new VerifyController();
