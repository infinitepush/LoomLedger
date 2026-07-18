"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = exports.AdminController = void 0;
const admin_service_1 = require("../services/admin.service");
const response_1 = require("../utils/response");
class AdminController {
    async listPending(req, res, next) {
        try {
            const pending = await admin_service_1.adminService.listPendingArtisans();
            (0, response_1.sendSuccess)(res, pending);
        }
        catch (error) {
            next(error);
        }
    }
    async approve(req, res, next) {
        try {
            const result = await admin_service_1.adminService.approveArtisan(req.params.id);
            (0, response_1.sendSuccess)(res, result, 'Artisan approved and registered on-chain');
        }
        catch (error) {
            next(error);
        }
    }
    async reject(req, res, next) {
        try {
            const result = await admin_service_1.adminService.rejectArtisan(req.params.id);
            return (0, response_1.sendSuccess)(res, result, 'Artisan application rejected');
        }
        catch (error) {
            next(error);
        }
    }
    async deleteArtisan(req, res, next) {
        try {
            const result = await admin_service_1.adminService.deleteArtisan(req.params.id);
            (0, response_1.sendSuccess)(res, result, 'Artisan and all listed products deleted successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminController = AdminController;
exports.adminController = new AdminController();
//# sourceMappingURL=admin.controller.js.map