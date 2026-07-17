import { z } from 'zod';
export declare const createOrderSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        quantity: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        productId: string;
        quantity: number;
    }, {
        productId: string;
        quantity?: number | undefined;
    }>, "many">;
    shippingName: z.ZodString;
    shippingAddress: z.ZodString;
    shippingCity: z.ZodString;
    shippingState: z.ZodString;
    shippingPincode: z.ZodString;
    shippingPhone: z.ZodString;
}, "strip", z.ZodTypeAny, {
    shippingName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingPincode: string;
    shippingPhone: string;
    items: {
        productId: string;
        quantity: number;
    }[];
}, {
    shippingName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingPincode: string;
    shippingPhone: string;
    items: {
        productId: string;
        quantity?: number | undefined;
    }[];
}>;
export declare const updateOrderStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["Processing", "Shipped", "Delivered", "Cancelled"]>;
}, "strip", z.ZodTypeAny, {
    status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}, {
    status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}>;
export declare const orderQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    status?: string | undefined;
}, {
    status?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
//# sourceMappingURL=order.validator.d.ts.map