import { z } from 'zod';

export const registerBuyerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerArtisanSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(6),
  state: z.string().min(2),
  district: z.string().min(2),
  craft: z.string().min(2),
  experience: z.string().min(1),
  giNumber: z.string().optional().default(''),
  bio: z.string().optional().default(''),
  giCertified: z.boolean().optional().default(false),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export const googleAuthSchema = z.object({
  idToken: z.string().min(1),
  role: z.enum(['buyer', 'artisan']).optional().default('buyer'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export type RegisterBuyerInput = z.infer<typeof registerBuyerSchema>;
export type RegisterArtisanInput = z.infer<typeof registerArtisanSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
