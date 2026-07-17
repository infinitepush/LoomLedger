"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyRepository = exports.StoryRepository = void 0;
const prisma_1 = require("../database/prisma");
class StoryRepository {
    async findById(id) {
        return prisma_1.prisma.story.findUnique({
            where: { id },
            include: { artisan: { include: { user: true } } },
        });
    }
    async findBySlug(slug) {
        return prisma_1.prisma.story.findUnique({
            where: { slug },
            include: { artisan: { include: { user: true } } },
        });
    }
    async create(data) {
        return prisma_1.prisma.story.create({ data });
    }
    async update(id, data) {
        return prisma_1.prisma.story.update({
            where: { id },
            data,
        });
    }
    async list(where, orderBy, skip, take) {
        return prisma_1.prisma.story.findMany({
            where,
            orderBy,
            skip,
            take,
            include: { artisan: { include: { user: true } } },
        });
    }
    async count(where) {
        return prisma_1.prisma.story.count({ where });
    }
}
exports.StoryRepository = StoryRepository;
exports.storyRepository = new StoryRepository();
//# sourceMappingURL=story.repository.js.map