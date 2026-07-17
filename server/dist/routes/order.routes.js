"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const order_validator_1 = require("../validators/order.validator");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post('/', (0, role_middleware_1.requireRole)('buyer'), (0, validate_middleware_1.validate)(order_validator_1.createOrderSchema), order_controller_1.orderController.create);
router.get('/buyer', (0, role_middleware_1.requireRole)('buyer'), order_controller_1.orderController.listBuyer);
router.get('/artisan', (0, role_middleware_1.requireRole)('artisan'), order_controller_1.orderController.listArtisan);
router.get('/:id', order_controller_1.orderController.getDetail);
router.patch('/:id/status', (0, role_middleware_1.requireRole)('artisan'), (0, validate_middleware_1.validate)(order_validator_1.updateOrderStatusSchema), order_controller_1.orderController.updateStatus);
exports.default = router;
//# sourceMappingURL=order.routes.js.map