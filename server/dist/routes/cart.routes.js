"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get('/', cart_controller_1.cartController.get);
router.post('/add', cart_controller_1.cartController.add);
router.post('/update', cart_controller_1.cartController.update);
router.post('/remove', cart_controller_1.cartController.remove);
router.post('/clear', cart_controller_1.cartController.clear);
exports.default = router;
//# sourceMappingURL=cart.routes.js.map