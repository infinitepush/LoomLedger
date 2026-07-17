"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const artisan_controller_1 = require("../controllers/artisan.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.get('/', artisan_controller_1.artisanController.list);
router.get('/stats', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('artisan'), artisan_controller_1.artisanController.getStats);
router.post('/save', auth_middleware_1.authMiddleware, artisan_controller_1.artisanController.toggleSave);
router.get('/saved', auth_middleware_1.authMiddleware, artisan_controller_1.artisanController.getSaved);
router.get('/:id', artisan_controller_1.artisanController.getProfile);
exports.default = router;
//# sourceMappingURL=artisan.routes.js.map