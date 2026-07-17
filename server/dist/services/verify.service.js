"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyService = exports.VerifyService = void 0;
const prisma_1 = require("../database/prisma");
const blockchain_service_1 = require("../blockchain/blockchain.service");
const errors_1 = require("../utils/errors");
class VerifyService {
    async verifyById(productId) {
        const product = await prisma_1.prisma.product.findFirst({
            where: {
                OR: [
                    { id: productId },
                    { slug: { contains: productId, mode: 'insensitive' } },
                    { blockchainId: productId },
                ],
            },
            include: {
                artisan: { include: { user: true } },
                timeline: { orderBy: { createdAt: 'asc' } },
                passport: true,
            },
        });
        if (!product)
            throw new errors_1.NotFoundError('Product not found in platform registry');
        const blockchainStatus = await blockchain_service_1.blockchainService.verifyProduct(product.blockchainId || '');
        return {
            success: true,
            type: 'product',
            blockchainVerified: product.verified,
            data: {
                id: product.id,
                name: product.name,
                category: product.category,
                region: product.region,
                fabric: product.fabric,
                craftTime: product.craftTime,
                blockchainId: product.blockchainId,
                giCertified: product.giCertified,
                mintedAt: product.passport?.mintedAt || product.createdAt,
                blockNumber: blockchainStatus.blockNumber,
                weaver: {
                    id: product.artisan.userId,
                    name: product.artisan.user.name,
                    walletAddress: product.artisan.walletAddress,
                    verified: product.artisan.verified,
                },
                timeline: product.timeline.map(t => ({
                    stage: t.stage,
                    date: t.date,
                    location: t.location,
                    status: t.status,
                })),
            },
        };
    }
    async verifyArtisanById(artisanId) {
        const artisan = await prisma_1.prisma.artisan.findFirst({
            where: {
                OR: [
                    { id: artisanId },
                    { userId: artisanId },
                    { walletAddress: artisanId },
                    { verificationHash: artisanId },
                ],
            },
            include: { user: true, products: true },
        });
        if (!artisan)
            throw new errors_1.NotFoundError('Artisan signature not found in registry');
        let blockchainVerified = artisan.verified;
        if (artisan.walletAddress) {
            blockchainVerified = await blockchain_service_1.blockchainService.verifyArtisanOnChain(artisan.walletAddress);
        }
        return {
            success: true,
            type: 'artisan',
            blockchainVerified,
            data: {
                id: artisan.id,
                name: artisan.user.name,
                craft: artisan.craft,
                region: artisan.region,
                experience: artisan.experience,
                giCertified: artisan.giCertified,
                giNumber: artisan.giNumber,
                status: artisan.status,
                walletAddress: artisan.walletAddress,
                verificationHash: artisan.verificationHash,
                activeLoomCount: artisan.products.length,
            },
        };
    }
}
exports.VerifyService = VerifyService;
exports.verifyService = new VerifyService();
//# sourceMappingURL=verify.service.js.map