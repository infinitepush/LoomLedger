import { prisma } from '../database/prisma';
import { Story, Prisma } from '@prisma/client';

export class StoryRepository {
  async findById(id: string) {
    return prisma.story.findUnique({
      where: { id },
      include: { artisan: { include: { user: true } } },
    });
  }

  async findBySlug(slug: string) {
    return prisma.story.findUnique({
      where: { slug },
      include: { artisan: { include: { user: true } } },
    });
  }

  async create(data: Prisma.StoryCreateInput) {
    return prisma.story.create({ data });
  }

  async update(id: string, data: Prisma.StoryUpdateInput) {
    return prisma.story.update({
      where: { id },
      data,
    });
  }

  async list(where?: Prisma.StoryWhereInput, orderBy?: Prisma.StoryOrderByWithRelationInput, skip?: number, take?: number) {
    return prisma.story.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { artisan: { include: { user: true } } },
    });
  }

  async count(where?: Prisma.StoryWhereInput) {
    return prisma.story.count({ where });
  }
}

export const storyRepository = new StoryRepository();
