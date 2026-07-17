"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const product_validator_1 = require("../validators/product.validator");
const router = (0, express_1.Router)();
router.get('/', (0, validate_middleware_1.validate)(product_validator_1.productQuerySchema, 'query'), product_controller_1.productController.list);
router.get('/categories', product_controller_1.productController.getCategories);
router.post('/ai-specs', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('artisan'), product_controller_1.productController.generateAISpecs);
router.get('/:slug', product_controller_1.productController.getBySlug);
router.post('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('artisan'), (0, validate_middleware_1.validate)(product_validator_1.createProductSchema), product_controller_1.productController.create);
exports.default = router;
//# sourceMappingURL=product.routes.js.map