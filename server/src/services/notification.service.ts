import { notificationRepository } from '../repositories/notification.repository';

export class NotificationService {
  async getNotifications(userId: string) {
    return notificationRepository.findByUserId(userId);
  }

  async markAsRead(id: string) {
    return notificationRepository.markAsRead(id);
  }

  async markAllAsRead(userId: string) {
    return notificationRepository.markAllAsRead(userId);
  }
}

export const notificationService = new NotificationService();
