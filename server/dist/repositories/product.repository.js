"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepository = exports.ProductRepository = void 0;
const prisma_1 = require("../database/prisma");
class ProductRepository {
    async findById(id) {
        return prisma_1.prisma.product.findUnique({
            where: { id },
            include: {
                artisan: { include: { user: true } },
                images: true,
                timeline: true,
                passport: true,
            },
        });
    }
    async findBySlug(slug) {
        return prisma_1.prisma.product.findUnique({
            where: { slug },
            include: {
                artisan: { include: { user: true } },
                images: true,
                timeline: true,
                passport: true,
            },
        });
    }
    async create(data) {
        return prisma_1.prisma.product.create({
            data,
            include: {
                artisan: { include: { user: true } },
                images: true,
                timeline: true,
                passport: true,
            },
        });
    }
    async update(id, data) {
        return prisma_1.prisma.product.update({
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
    async delete(id) {
        return prisma_1.prisma.product.delete({ where: { id } });
    }
    async list(where, orderBy, skip, take) {
        return prisma_1.prisma.product.findMany({
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
    async count(where) {
        return prisma_1.prisma.product.count({ where });
    }
}
exports.ProductRepository = ProductRepository;
exports.productRepository = new ProductRepository();
//# sourceMappingURL=product.repository.js.map