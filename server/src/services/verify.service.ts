import { prisma } from '../database/prisma';
import { blockchainService } from '../blockchain/blockchain.service';
import { NotFoundError } from '../utils/errors';

export class VerifyService {
  async verifyById(productId: string) {
    const product = await prisma.product.findFirst({
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

    if (!product) throw new NotFoundError('Product not found in platform registry');

    const blockchainStatus = await blockchainService.verifyProduct(product.blockchainId || '');

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

  async verifyArtisanById(artisanId: string) {
    const artisan = await prisma.artisan.findFirst({
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

    if (!artisan) throw new NotFoundError('Artisan signature not found in registry');

    let blockchainVerified = artisan.verified;
    if (artisan.walletAddress) {
      blockchainVerified = await blockchainService.verifyArtisanOnChain(artisan.walletAddress);
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

export const verifyService = new VerifyService();
