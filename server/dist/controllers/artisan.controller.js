"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artisanController = exports.ArtisanController = void 0;
const artisan_service_1 = require("../services/artisan.service");
const response_1 = require("../utils/response");
class ArtisanController {
    async getProfile(req, res, next) {
        try {
            const artisan = await artisan_service_1.artisanService.getArtisanProfile(req.params.id);
            (0, response_1.sendSuccess)(res, artisan);
        }
        catch (error) {
            next(error);
        }
    }
    async getStats(req, res, next) {
        try {
            const artisanId = req.user?.artisanId;
            const stats = await artisan_service_1.artisanService.getArtisanStats(artisanId);
            (0, response_1.sendSuccess)(res, stats);
        }
        catch (error) {
            next(error);
        }
    }
    async list(req, res, next) {
        try {
            const status = req.query.status;
            const artisans = await artisan_service_1.artisanService.listArtisans(status);
            (0, response_1.sendSuccess)(res, artisans);
        }
        catch (error) {
            next(error);
        }
    }
    async toggleSave(req, res, next) {
        try {
            const userId = req.user?.userId;
            const { artisanId } = req.body;
            const result = await artisan_service_1.artisanService.toggleSaveArtisan(userId, artisanId);
            (0, response_1.sendSuccess)(res, result);
        }
        catch (error) {
            next(error);
        }
    }
    async getSaved(req, res, next) {
        try {
            const userId = req.user?.userId;
            const saved = await artisan_service_1.artisanService.getSavedArtisans(userId);
            (0, response_1.sendSuccess)(res, saved);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ArtisanController = ArtisanController;
exports.artisanController = new ArtisanController();
//# sourceMappingURL=artisan.controller.js.map