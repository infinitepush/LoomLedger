"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistRepository = exports.WishlistRepository = void 0;
const prisma_1 = require("../database/prisma");
class WishlistRepository {
    async findByUserAndProduct(userId, productId) {
        return prisma_1.prisma.wishlistItem.findUnique({
            where: { userId_productId: { userId, productId } },
        });
    }
    async findByUserId(userId) {
        return prisma_1.prisma.wishlistItem.findMany({
            where: { userId },
            include: {
                product: { include: { artisan: { include: { user: true } } } },
            },
        });
    }
    async create(data) {
        return prisma_1.prisma.wishlistItem.create({ data });
    }
    async delete(id) {
        return prisma_1.prisma.wishlistItem.delete({ where: { id } });
    }
    async deleteByUserAndProduct(userId, productId) {
        return prisma_1.prisma.wishlistItem.delete({
            where: { userId_productId: { userId, productId } },
        });
    }
}
exports.WishlistRepository = WishlistRepository;
exports.wishlistRepository = new WishlistRepository();
//# sourceMappingURL=wishlist.repository.js.map