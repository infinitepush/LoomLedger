"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderQuerySchema = exports.updateOrderStatusSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z.object({
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string().uuid(),
        quantity: zod_1.z.number().int().positive().default(1),
    })).min(1, 'At least one item is required'),
    shippingName: zod_1.z.string().min(2),
    shippingAddress: zod_1.z.string().min(5),
    shippingCity: zod_1.z.string().min(2),
    shippingState: zod_1.z.string().min(2),
    shippingPincode: zod_1.z.string().min(5),
    shippingPhone: zod_1.z.string().min(10),
});
exports.updateOrderStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['Processing', 'Shipped', 'Delivered', 'Cancelled']),
});
exports.orderQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().optional().default(1),
    limit: zod_1.z.coerce.number().optional().default(10),
    status: zod_1.z.string().optional(),
});
//# sourceMappingURL=order.validator.js.map