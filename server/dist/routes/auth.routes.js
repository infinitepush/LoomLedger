"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const router = (0, express_1.Router)();
router.post('/register/buyer', (0, validate_middleware_1.validate)(auth_validator_1.registerBuyerSchema), auth_controller_1.authController.registerBuyer);
router.post('/register/artisan', (0, validate_middleware_1.validate)(auth_validator_1.registerArtisanSchema), auth_controller_1.authController.registerArtisan);
router.post('/login', (0, validate_middleware_1.validate)(auth_validator_1.loginSchema), auth_controller_1.authController.login);
router.post('/refresh', (0, validate_middleware_1.validate)(auth_validator_1.refreshTokenSchema), auth_controller_1.authController.refreshToken);
router.post('/logout', (0, validate_middleware_1.validate)(auth_validator_1.refreshTokenSchema), auth_controller_1.authController.logout);
router.get('/me', auth_middleware_1.authMiddleware, auth_controller_1.authController.getMe);
router.patch('/profile', auth_middleware_1.authMiddleware, auth_controller_1.authController.updateProfile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map