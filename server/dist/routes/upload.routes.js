"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const cloudinary_1 = require("../storage/cloudinary");
const response_1 = require("../utils/response");
const errors_1 = require("../utils/errors");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new errors_1.BadRequestError('Only image files are allowed.'));
        }
        cb(null, true);
    },
});
router.post('/', auth_middleware_1.authMiddleware, upload.single('file'), async (req, res, next) => {
    try {
        if (!req.file) {
            throw new errors_1.BadRequestError('No file provided for upload.');
        }
        const url = await cloudinary_1.cloudinaryService.uploadImage(req.file.buffer);
        (0, response_1.sendSuccess)(res, { url }, 'Image uploaded successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=upload.routes.js.map