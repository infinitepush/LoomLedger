import { prisma } from '../database/prisma';
import { CartItem, Prisma } from '@prisma/client';

export class CartRepository {
  async findByUserAndProduct(userId: string, productId: string) {
    return prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });
  }

  async findByUserId(userId: string) {
    return prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: { include: { artisan: { include: { user: true } } } },
      },
    });
  }

  async create(data: Prisma.CartItemCreateInput) {
    return prisma.cartItem.create({ data });
  }

  async updateQuantity(id: string, quantity: number) {
    return prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });
  }

  async delete(id: string) {
    return prisma.cartItem.delete({ where: { id } });
  }

  async deleteByUserAndProduct(userId: string, productId: string) {
    return prisma.cartItem.delete({
      where: { userId_productId: { userId, productId } },
    });
  }

  async clearUserCart(userId: string) {
    return prisma.cartItem.deleteMany({ where: { userId } });
  }
}

export const cartRepository = new CartRepository();
