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
}
exports.AdminService = AdminService;
exports.adminService = new AdminService();
//# sourceMappingURL=admin.service.js.map