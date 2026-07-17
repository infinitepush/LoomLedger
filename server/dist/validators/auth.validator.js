"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.googleAuthSchema = exports.loginSchema = exports.registerArtisanSchema = exports.registerBuyerSchema = void 0;
const zod_1 = require("zod");
exports.registerBuyerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email address'),
    phone: zod_1.z.string().optional(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
exports.registerArtisanSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().optional(),
    password: zod_1.z.string().min(6),
    state: zod_1.z.string().min(2),
    district: zod_1.z.string().min(2),
    craft: zod_1.z.string().min(2),
    experience: zod_1.z.string().min(1),
    giNumber: zod_1.z.string().optional().default(''),
    bio: zod_1.z.string().optional().default(''),
    giCertified: zod_1.z.boolean().optional().default(false),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.googleAuthSchema = zod_1.z.object({
    idToken: zod_1.z.string().min(1),
    role: zod_1.z.enum(['buyer', 'artisan']).optional().default('buyer'),
});
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1),
});
//# sourceMappingURL=auth.validator.js.map