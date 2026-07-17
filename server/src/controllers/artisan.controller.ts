import { Request, Response, NextFunction } from 'express';
import { artisanService } from '../services/artisan.service';
import { sendSuccess } from '../utils/response';

export class ArtisanController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const artisan = await artisanService.getArtisanProfile(req.params.id);
      sendSuccess(res, artisan);
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const artisanId = req.user?.artisanId;
      const stats = await artisanService.getArtisanStats(artisanId!);
      sendSuccess(res, stats);
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const status = req.query.status as string;
      const artisans = await artisanService.listArtisans(status);
      sendSuccess(res, artisans);
    } catch (error) {
      next(error);
    }
  }

  async toggleSave(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const { artisanId } = req.body;
      const result = await artisanService.toggleSaveArtisan(userId!, artisanId);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getSaved(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const saved = await artisanService.getSavedArtisans(userId!);
      sendSuccess(res, saved);
    } catch (error) {
      next(error);
    }
  }
}

export const artisanController = new ArtisanController();
