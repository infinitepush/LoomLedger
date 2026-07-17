"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const story_controller_1 = require("../controllers/story.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.get('/', story_controller_1.storyController.list);
router.post('/generate', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('artisan'), story_controller_1.storyController.generate);
router.get('/:slug', story_controller_1.storyController.getBySlug);
exports.default = router;
//# sourceMappingURL=story.routes.js.map