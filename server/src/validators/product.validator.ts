import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  category: z.string().min(2),
  description: z.string().min(10),
  fabric: z.string().optional().default(''),
  craftTime: z.string().optional().default(''),
  region: z.string().optional().default(''),
  tags: z.array(z.string()).optional().default([]),
  specifications: z.record(z.string()).optional().default({}),
  giCertified: z.boolean().optional().default(false),
  stockQuantity: z.number().int().positive().optional().default(1),
  image: z.string().optional().default('product-banarasi.png'),
});

export const updateProductSchema = createProductSchema.partial();

export const productQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(12),
  search: z.string().optional().default(''),
  category: z.string().optional().default(''),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  giCertified: z.coerce.boolean().optional(),
  verified: z.coerce.boolean().optional(),
  sort: z.enum(['recommended', 'price-asc', 'price-desc', 'rating', 'newest']).optional().default('recommended'),
  artisanId: z.string().optional(),
  featured: z.coerce.boolean().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;
