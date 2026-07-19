import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { sendSuccess } from '../utils/response';

export class AuthController {
  async registerBuyer(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await authService.registerBuyer(req.body);
      sendSuccess(res, data, 'Buyer registered successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async registerArtisan(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await authService.registerArtisan(req.body);
      sendSuccess(res, data, 'Artisan profile registered', 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await authService.login(req.body);
      sendSuccess(res, data, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await authService.refreshToken(req.body.refreshToken);
      sendSuccess(res, data, 'Tokens refreshed');
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.logout(req.body.refreshToken);
      sendSuccess(res, null, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const data = await authService.getMe(userId!);
      sendSuccess(res, data, 'Current user profile loaded');
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const data = await authService.updateProfile(userId!, req.body);
      sendSuccess(res, data, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
