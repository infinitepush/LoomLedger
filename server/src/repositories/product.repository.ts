import { prisma } from '../database/prisma';
import { Product, Prisma } from '@prisma/client';

export class ProductRepository {
  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        artisan: { include: { user: true } },
        images: true,
        timeline: true,
        passport: true,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        artisan: { include: { user: true } },
        images: true,
        timeline: true,
        passport: true,
      },
    });
  }

  async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
      include: {
        artisan: { include: { user: true } },
        images: true,
        timeline: true,
        passport: true,
      },
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
      where: { id },
      data,
      include: {
        artisan: { include: { user: true } },
        images: true,
        timeline: true,
        passport: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }

  async list(where?: Prisma.ProductWhereInput, orderBy?: Prisma.ProductOrderByWithRelationInput, skip?: number, take?: number) {
    return prisma.product.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        artisan: { include: { user: true } },
        images: true,
        passport: true,
      },
    });
  }

  async count(where?: Prisma.ProductWhereInput) {
    return prisma.product.count({ where });
  }
}

export const productRepository = new ProductRepository();
