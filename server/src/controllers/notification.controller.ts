import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../services/notification.service';
import { sendSuccess } from '../utils/response';

export class NotificationController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const notifications = await notificationService.getNotifications(userId!);
      sendSuccess(res, notifications);
    } catch (error) {
      next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      await notificationService.markAsRead(req.params.id);
      sendSuccess(res, null, 'Notification marked as read');
    } catch (error) {
      next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      await notificationService.markAllAsRead(userId!);
      sendSuccess(res, null, 'All notifications marked as read');
    } catch (error) {
      next(error);
    }
  }
}

export const notificationController = new NotificationController();
