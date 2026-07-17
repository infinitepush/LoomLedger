"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRepository = exports.OrderRepository = void 0;
const prisma_1 = require("../database/prisma");
class OrderRepository {
    async findById(id) {
        return prisma_1.prisma.order.findUnique({
            where: { id },
            include: {
                user: true,
                items: { include: { product: { include: { artisan: { include: { user: true } } } } } },
                timeline: true,
                payment: true,
            },
        });
    }
    async findByOrderNumber(orderNumber) {
        return prisma_1.prisma.order.findUnique({
            where: { orderNumber },
            include: {
                user: true,
                items: { include: { product: { include: { artisan: { include: { user: true } } } } } },
                timeline: true,
                payment: true,
            },
        });
    }
    async create(data) {
        return prisma_1.prisma.order.create({
            data,
            include: {
                items: true,
                timeline: true,
                payment: true,
            },
        });
    }
    async update(id, data) {
        return prisma_1.prisma.order.update({
            where: { id },
            data,
            include: {
                items: true,
                timeline: true,
                payment: true,
            },
        });
    }
    async list(where, orderBy, skip, take) {
        return prisma_1.prisma.order.findMany({
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
    async count(where) {
        return prisma_1.prisma.order.count({ where });
    }
}
exports.OrderRepository = OrderRepository;
exports.orderRepository = new OrderRepository();
//# sourceMappingURL=order.repository.js.map