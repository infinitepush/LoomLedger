"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = exports.NotificationController = void 0;
const notification_service_1 = require("../services/notification.service");
const response_1 = require("../utils/response");
class NotificationController {
    async list(req, res, next) {
        try {
            const userId = req.user?.userId;
            const notifications = await notification_service_1.notificationService.getNotifications(userId);
            (0, response_1.sendSuccess)(res, notifications);
        }
        catch (error) {
            next(error);
        }
    }
    async read(req, res, next) {
        try {
            await notification_service_1.notificationService.markAsRead(req.params.id);
            (0, response_1.sendSuccess)(res, null, 'Notification marked as read');
        }
        catch (error) {
            next(error);
        }
    }
    async readAll(req, res, next) {
        try {
            const userId = req.user?.userId;
            await notification_service_1.notificationService.markAllAsRead(userId);
            (0, response_1.sendSuccess)(res, null, 'All notifications marked as read');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.NotificationController = NotificationController;
exports.notificationController = new NotificationController();
//# sourceMappingURL=notification.controller.js.map