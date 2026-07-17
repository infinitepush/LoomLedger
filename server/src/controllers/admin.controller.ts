import { Request, Response, NextFunction } from 'express';
import { adminService } from '../services/admin.service';
import { sendSuccess } from '../utils/response';

export class AdminController {
  async listPending(req: Request, res: Response, next: NextFunction) {
    try {
      const pending = await adminService.listPendingArtisans();
      sendSuccess(res, pending);
    } catch (error) {
      next(error);
    }
  }

  async approve(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await adminService.approveArtisan(req.params.id);
      sendSuccess(res, result, 'Artisan approved and registered on-chain');
    } catch (error) {
      next(error);
    }
  }

  async reject(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await adminService.rejectArtisan(req.params.id);
      sendSuccess(res, result, 'Artisan application rejected');
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
