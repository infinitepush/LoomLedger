import { prisma } from '../database/prisma';
import { WishlistItem, Prisma } from '@prisma/client';

export class WishlistRepository {
  async findByUserAndProduct(userId: string, productId: string) {
    return prisma.wishlistItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });
  }

  async findByUserId(userId: string) {
    return prisma.wishlistItem.findMany({
      where: { userId },
      include: {
        product: { include: { artisan: { include: { user: true } } } },
      },
    });
  }

  async create(data: Prisma.WishlistItemCreateInput) {
    return prisma.wishlistItem.create({ data });
  }

  async delete(id: string) {
    return prisma.wishlistItem.delete({ where: { id } });
  }

  async deleteByUserAndProduct(userId: string, productId: string) {
    return prisma.wishlistItem.delete({
      where: { userId_productId: { userId, productId } },
    });
  }
}

export const wishlistRepository = new WishlistRepository();
