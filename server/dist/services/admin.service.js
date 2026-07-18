"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = exports.AdminService = void 0;
const prisma_1 = require("../database/prisma");
const blockchain_service_1 = require("../blockchain/blockchain.service");
const errors_1 = require("../utils/errors");
class AdminService {
    async listPendingArtisans() {
        return prisma_1.prisma.artisan.findMany({
            where: { status: 'pending' },
            include: { user: true },
        });
    }
    async approveArtisan(id) {
        const artisan = await prisma_1.prisma.artisan.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!artisan)
            throw new errors_1.NotFoundError('Artisan profile not found');
        const txHash = await blockchain_service_1.blockchainService.registerArtisan(artisan.id, artisan.walletAddress || '0x');
        await prisma_1.prisma.$transaction(async (tx) => {
            await tx.artisan.update({
                where: { id },
                data: {
                    status: 'approved',
                    verified: true,
                    verificationHash: txHash,
                },
            });
            // Update related products status to verified if artisan GI is certified
            await tx.product.updateMany({
                where: { artisanId: id },
                data: { verified: true },
            });
            // Create notification
            await tx.notification.create({
                data: {
                    userId: artisan.userId,
                    title: 'Artisan Verification Approved',
                    message: 'Your artisan profile and wallet ID have been successfully verified on Polygon Amoy ledger!',
                    type: 'success',
                    link: '/artisan/dashboard',
                },
            });
        });
        return { approved: true, txHash };
    }
    async rejectArtisan(id) {
        const artisan = await prisma_1.prisma.artisan.findUnique({
            where: { id },
        });
        if (!artisan)
            throw new errors_1.NotFoundError('Artisan profile not found');
        await prisma_1.prisma.$transaction(async (tx) => {
            await tx.artisan.update({
                where: { id },
                data: { status: 'rejected', verified: false },
            });
            await tx.notification.create({
                data: {
                    userId: artisan.userId,
                    title: 'Artisan Verification Rejected',
                    message: 'Your profile details could not be validated. Please review settings and submit again.',
                    type: 'error',
                    link: '/artisan/settings',
                },
            });
        });
        return { rejected: true };
    }
    async deleteArtisan(id) {
        const artisan = await prisma_1.prisma.artisan.findFirst({
            where: { OR: [{ id }, { userId: id }] },
            include: { user: true },
        });
        if (!artisan)
            throw new errors_1.NotFoundError('Artisan profile not found');
        const products = await prisma_1.prisma.product.findMany({
            where: { artisanId: artisan.id },
            select: { id: true },
        });
        const productIds = products.map(p => p.id);
        await prisma_1.prisma.$transaction(async (tx) => {
            if (productIds.length > 0) {
                await tx.cartItem.deleteMany({ where: { productId: { in: productIds } } });
                await tx.wishlistItem.deleteMany({ where: { productId: { in: productIds } } });
                await tx.productImage.deleteMany({ where: { productId: { in: productIds } } });
                await tx.productTimeline.deleteMany({ where: { productId: { in: productIds } } });
                await tx.digitalPassport.deleteMany({ where: { productId: { in: productIds } } });
                await tx.review.deleteMany({ where: { productId: { in: productIds } } });
                await tx.orderItem.deleteMany({ where: { productId: { in: productIds } } });
                await tx.product.deleteMany({ where: { artisanId: artisan.id } });
            }
            await tx.savedArtisan.deleteMany({ where: { artisanId: artisan.id } });
            await tx.artisan.delete({ where: { id: artisan.id } });
            if (artisan.userId) {
                await tx.refreshToken.deleteMany({ where: { userId: artisan.userId } });
                await tx.notification.deleteMany({ where: { userId: artisan.userId } });
                await tx.user.delete({ where: { id: artisan.userId } });
            }
        });
        return { deleted: true, artisanId: artisan.id, productsDeleted: productIds.length };
    }
}
exports.AdminService = AdminService;
exports.adminService = new AdminService();
//# sourceMappingURL=admin.service.js.map