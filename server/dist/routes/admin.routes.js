"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.use((0, role_middleware_1.requireRole)('admin'));
router.get('/pending-artisans', admin_controller_1.adminController.listPending);
router.post('/approve-artisan/:id', admin_controller_1.adminController.approve);
router.post('/reject-artisan/:id', admin_controller_1.adminController.reject);
router.delete('/artisans/:id', admin_controller_1.adminController.deleteArtisan);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map