import { prisma } from '../database/prisma';
import { Order, Prisma } from '@prisma/client';

export class OrderRepository {
  async findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: { include: { product: { include: { artisan: { include: { user: true } } } } } },
        timeline: true,
        payment: true,
      },
    });
  }

  async findByOrderNumber(orderNumber: string) {
    return prisma.order.findUnique({
      where: { orderNumber },
      include: {
        user: true,
        items: { include: { product: { include: { artisan: { include: { user: true } } } } } },
        timeline: true,
        payment: true,
      },
    });
  }

  async create(data: Prisma.OrderCreateInput) {
    return prisma.order.create({
      data,
      include: {
        items: true,
        timeline: true,
        payment: true,
      },
    });
  }

  async update(id: string, data: Prisma.OrderUpdateInput) {
    return prisma.order.update({
      where: { id },
      data,
      include: {
        items: true,
        timeline: true,
        payment: true,
      },
    });
  }

  async list(where?: Prisma.OrderWhereInput, orderBy?: Prisma.OrderOrderByWithRelationInput, skip?: number, take?: number) {
    return prisma.order.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        user: true,
        items: { include: { product: true } },
        timeline: true,
        payment: true,
      },
    });
  }

  async count(where?: Prisma.OrderWhereInput) {
    return prisma.order.count({ where });
  }
}

export const orderRepository = new OrderRepository();
