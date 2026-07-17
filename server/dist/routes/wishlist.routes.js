"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlist_controller_1 = require("../controllers/wishlist.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get('/', wishlist_controller_1.wishlistController.get);
router.post('/toggle', wishlist_controller_1.wishlistController.toggle);
exports.default = router;
//# sourceMappingURL=wishlist.routes.js.map