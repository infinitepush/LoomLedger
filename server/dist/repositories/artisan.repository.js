"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artisanRepository = exports.ArtisanRepository = void 0;
const prisma_1 = require("../database/prisma");
class ArtisanRepository {
    async findById(id) {
        return prisma_1.prisma.artisan.findUnique({
            where: { id },
            include: { user: true },
        });
    }
    async findByUserId(userId) {
        return prisma_1.prisma.artisan.findUnique({
            where: { userId },
            include: { user: true },
        });
    }
    async create(data) {
        return prisma_1.prisma.artisan.create({ data, include: { user: true } });
    }
    async update(id, data) {
        return prisma_1.prisma.artisan.update({
            where: { id },
            data,
            include: { user: true },
        });
    }
    async list(where, orderBy, skip, take) {
        return prisma_1.prisma.artisan.findMany({
            where,
            orderBy,
            skip,
            take,
            include: { user: true },
        });
    }
    async count(where) {
        return prisma_1.prisma.artisan.count({ where });
    }
}
exports.ArtisanRepository = ArtisanRepository;
exports.artisanRepository = new ArtisanRepository();
//# sourceMappingURL=artisan.repository.js.map