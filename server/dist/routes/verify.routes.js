"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_controller_1 = require("../controllers/verify.controller");
const router = (0, express_1.Router)();
router.get('/product/:id', verify_controller_1.verifyController.verifyProduct);
router.get('/artisan/:id', verify_controller_1.verifyController.verifyArtisan);
exports.default = router;
//# sourceMappingURL=verify.routes.js.map