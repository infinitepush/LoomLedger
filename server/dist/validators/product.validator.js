"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productQuerySchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    price: zod_1.z.number().positive(),
    originalPrice: zod_1.z.number().positive().optional(),
    category: zod_1.z.string().min(2),
    description: zod_1.z.string().min(10),
    fabric: zod_1.z.string().optional().default(''),
    craftTime: zod_1.z.string().optional().default(''),
    region: zod_1.z.string().optional().default(''),
    tags: zod_1.z.array(zod_1.z.string()).optional().default([]),
    specifications: zod_1.z.record(zod_1.z.string()).optional().default({}),
    giCertified: zod_1.z.boolean().optional().default(false),
    stockQuantity: zod_1.z.number().int().positive().optional().default(1),
    image: zod_1.z.string().optional().default('product-banarasi.png'),
});
exports.updateProductSchema = exports.createProductSchema.partial();
exports.productQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().optional().default(1),
    limit: zod_1.z.coerce.number().optional().default(12),
    search: zod_1.z.string().optional().default(''),
    category: zod_1.z.string().optional().default(''),
    minPrice: zod_1.z.coerce.number().optional(),
    maxPrice: zod_1.z.coerce.number().optional(),
    giCertified: zod_1.z.coerce.boolean().optional(),
    verified: zod_1.z.coerce.boolean().optional(),
    sort: zod_1.z.enum(['recommended', 'price-asc', 'price-desc', 'rating', 'newest']).optional().default('recommended'),
    artisanId: zod_1.z.string().optional(),
    featured: zod_1.z.coerce.boolean().optional(),
});
//# sourceMappingURL=product.validator.js.map