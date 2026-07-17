"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = exports.NotificationService = void 0;
const notification_repository_1 = require("../repositories/notification.repository");
class NotificationService {
    async getNotifications(userId) {
        return notification_repository_1.notificationRepository.findByUserId(userId);
    }
    async markAsRead(id) {
        return notification_repository_1.notificationRepository.markAsRead(id);
    }
    async markAllAsRead(userId) {
        return notification_repository_1.notificationRepository.markAllAsRead(userId);
    }
}
exports.NotificationService = NotificationService;
exports.notificationService = new NotificationService();
//# sourceMappingURL=notification.service.js.map