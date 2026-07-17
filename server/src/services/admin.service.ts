import { prisma } from '../database/prisma';
import { blockchainService } from '../blockchain/blockchain.service';
import { NotFoundError } from '../utils/errors';

export class AdminService {
  async listPendingArtisans() {
    return prisma.artisan.findMany({
      where: { status: 'pending' },
      include: { user: true },
    });
  }

  async approveArtisan(id: string) {
    const artisan = await prisma.artisan.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!artisan) throw new NotFoundError('Artisan profile not found');

    const txHash = await blockchainService.registerArtisan(artisan.id, artisan.walletAddress || '0x');

    await prisma.$transaction(async (tx) => {
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

  async rejectArtisan(id: string) {
    const artisan = await prisma.artisan.findUnique({
      where: { id },
    });
    if (!artisan) throw new NotFoundError('Artisan profile not found');

    await prisma.$transaction(async (tx) => {
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

export const adminService = new AdminService();
