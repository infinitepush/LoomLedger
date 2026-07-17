import { prisma } from '../database/prisma';
import { Artisan, Prisma } from '@prisma/client';

export class ArtisanRepository {
  async findById(id: string) {
    return prisma.artisan.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async findByUserId(userId: string) {
    return prisma.artisan.findUnique({
      where: { userId },
      include: { user: true },
    });
  }

  async create(data: Prisma.ArtisanCreateInput) {
    return prisma.artisan.create({ data, include: { user: true } });
  }

  async update(id: string, data: Prisma.ArtisanUpdateInput) {
    return prisma.artisan.update({
      where: { id },
      data,
      include: { user: true },
    });
  }

  async list(where?: Prisma.ArtisanWhereInput, orderBy?: Prisma.ArtisanOrderByWithRelationInput, skip?: number, take?: number) {
    return prisma.artisan.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { user: true },
    });
  }

  async count(where?: Prisma.ArtisanWhereInput) {
    return prisma.artisan.count({ where });
  }
}

export const artisanRepository = new ArtisanRepository();
