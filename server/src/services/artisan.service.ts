import { artisanRepository } from '../repositories/artisan.repository';
import { productRepository } from '../repositories/product.repository';
import { orderRepository } from '../repositories/order.repository';
import { userRepository } from '../repositories/user.repository';
import { NotFoundError } from '../utils/errors';

export class ArtisanService {
  async getArtisanProfile(id: string) {
    const artisan = await artisanRepository.findByUserId(id);
    if (!artisan) throw new NotFoundError('Artisan profile not found');
    return artisan;
  }

  async getArtisanStats(artisanId: string) {
    const products = await productRepository.list({ artisanId });
    const orders = await orderRepository.list({
      items: { some: { artisanId } },
      status: 'Delivered',
    });

    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

    return {
      revenue: totalRevenue,
      productsCount: products.length,
      ordersCount: orders.length,
      visitorsCount: 1420,
    };
  }

  async listArtisans(status?: string) {
    if (status === 'all') {
      return artisanRepository.list();
    }
    const queryStatus = status || 'approved';
    return artisanRepository.list({ status: queryStatus as any });
  }

  async toggleSaveArtisan(userId: string, artisanId: string) {
    // In our schema, we have savedArtisans: SavedArtisan
    const { prisma } = await import('../database/prisma');
    const existing = await prisma.savedArtisan.findUnique({
      where: { userId_artisanId: { userId, artisanId } },
    });

    if (existing) {
      await prisma.savedArtisan.delete({ where: { id: existing.id } });
      return { saved: false };
    } else {
      await prisma.savedArtisan.create({ data: { userId, artisanId } });
      return { saved: true };
    }
  }

  async getSavedArtisans(userId: string) {
    const { prisma } = await import('../database/prisma');
    const saved = await prisma.savedArtisan.findMany({
      where: { userId },
    });
    return saved;
  }
}

export const artisanService = new ArtisanService();
