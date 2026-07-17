"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
class AuthController {
    async registerBuyer(req, res, next) {
        try {
            const data = await auth_service_1.authService.registerBuyer(req.body);
            (0, response_1.sendSuccess)(res, data, 'Buyer registered successfully', 201);
        }
        catch (error) {
            next(error);
        }
    }
    async registerArtisan(req, res, next) {
        try {
            const data = await auth_service_1.authService.registerArtisan(req.body);
            (0, response_1.sendSuccess)(res, data, 'Artisan profile registered', 201);
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const data = await auth_service_1.authService.login(req.body);
            (0, response_1.sendSuccess)(res, data, 'Login successful');
        }
        catch (error) {
            next(error);
        }
    }
    async refreshToken(req, res, next) {
        try {
            const data = await auth_service_1.authService.refreshToken(req.body.refreshToken);
            (0, response_1.sendSuccess)(res, data, 'Tokens refreshed');
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            await auth_service_1.authService.logout(req.body.refreshToken);
            (0, response_1.sendSuccess)(res, null, 'Logged out successfully');
        }
        catch (error) {
            next(error);
        }
    }
    async getMe(req, res, next) {
        try {
            const userId = req.user?.userId;
            const data = await auth_service_1.authService.getMe(userId);
            (0, response_1.sendSuccess)(res, data, 'Current user profile loaded');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map