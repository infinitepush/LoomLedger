import { z } from 'zod';
export declare const registerBuyerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    phone?: string | undefined;
}, {
    name: string;
    email: string;
    password: string;
    phone?: string | undefined;
}>;
export declare const registerArtisanSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    state: z.ZodString;
    district: z.ZodString;
    craft: z.ZodString;
    experience: z.ZodString;
    giNumber: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    bio: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    giCertified: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    craft: string;
    experience: string;
    district: string;
    state: string;
    bio: string;
    giCertified: boolean;
    giNumber: string;
    password: string;
    phone?: string | undefined;
}, {
    name: string;
    email: string;
    craft: string;
    experience: string;
    district: string;
    state: string;
    password: string;
    phone?: string | undefined;
    bio?: string | undefined;
    giCertified?: boolean | undefined;
    giNumber?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const googleAuthSchema: z.ZodObject<{
    idToken: z.ZodString;
    role: z.ZodDefault<z.ZodOptional<z.ZodEnum<["buyer", "artisan"]>>>;
}, "strip", z.ZodTypeAny, {
    role: "buyer" | "artisan";
    idToken: string;
}, {
    idToken: string;
    role?: "buyer" | "artisan" | undefined;
}>;
export declare const refreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refreshToken: string;
}, {
    refreshToken: string;
}>;
export type RegisterBuyerInput = z.infer<typeof registerBuyerSchema>;
export type RegisterArtisanInput = z.infer<typeof registerArtisanSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=auth.validator.d.ts.map