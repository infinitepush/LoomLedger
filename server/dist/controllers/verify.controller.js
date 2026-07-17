"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyController = exports.VerifyController = void 0;
const verify_service_1 = require("../services/verify.service");
const response_1 = require("../utils/response");
class VerifyController {
    async verifyProduct(req, res, next) {
        try {
            const { id } = req.params;
            const result = await verify_service_1.verifyService.verifyById(id);
            (0, response_1.sendSuccess)(res, result, 'Product authenticity verified');
        }
        catch (error) {
            next(error);
        }
    }
    async verifyArtisan(req, res, next) {
        try {
            const { id } = req.params;
            const result = await verify_service_1.verifyService.verifyArtisanById(id);
            (0, response_1.sendSuccess)(res, result, 'Artisan signature status verified');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.VerifyController = VerifyController;
exports.verifyController = new VerifyController();
//# sourceMappingURL=verify.controller.js.map