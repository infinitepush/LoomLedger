import { prisma } from '../database/prisma';
import { User, Prisma } from '@prisma/client';

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { artisan: true },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { artisan: true },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
      include: { artisan: true },
    });
  }

  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }

  async list(where?: Prisma.UserWhereInput, orderBy?: Prisma.UserOrderByWithRelationInput, skip?: number, take?: number) {
    return prisma.user.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { artisan: true },
    });
  }

  async count(where?: Prisma.UserWhereInput) {
    return prisma.user.count({ where });
  }
}

export const userRepository = new UserRepository();
