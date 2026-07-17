"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRepository = exports.CartRepository = void 0;
const prisma_1 = require("../database/prisma");
class CartRepository {
    async findByUserAndProduct(userId, productId) {
        return prisma_1.prisma.cartItem.findUnique({
            where: { userId_productId: { userId, productId } },
        });
    }
    async findByUserId(userId) {
        return prisma_1.prisma.cartItem.findMany({
            where: { userId },
            include: {
                product: { include: { artisan: { include: { user: true } } } },
            },
        });
    }
    async create(data) {
        return prisma_1.prisma.cartItem.create({ data });
    }
    async updateQuantity(id, quantity) {
        return prisma_1.prisma.cartItem.update({
            where: { id },
            data: { quantity },
        });
    }
    async delete(id) {
        return prisma_1.prisma.cartItem.delete({ where: { id } });
    }
    async deleteByUserAndProduct(userId, productId) {
        return prisma_1.prisma.cartItem.delete({
            where: { userId_productId: { userId, productId } },
        });
    }
    async clearUserCart(userId) {
        return prisma_1.prisma.cartItem.deleteMany({ where: { userId } });
    }
}
exports.CartRepository = CartRepository;
exports.cartRepository = new CartRepository();
//# sourceMappingURL=cart.repository.js.map