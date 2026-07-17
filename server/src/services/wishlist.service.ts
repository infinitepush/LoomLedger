import { wishlistRepository } from '../repositories/wishlist.repository';
import { productRepository } from '../repositories/product.repository';
import { NotFoundError } from '../utils/errors';

export class WishlistService {
  async getWishlist(userId: string) {
    const items = await wishlistRepository.findByUserId(userId);
    return items.map(item => ({
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.price,
      originalPrice: item.product.originalPrice,
      image: item.product.image,
      category: item.product.category,
      verified: item.product.verified,
      giCertified: item.product.giCertified,
      region: item.product.region,
      weaver: {
        id: item.product.artisan.userId,
        name: item.product.artisan.user.name,
      }
    }));
  }

  async toggleWishlist(userId: string, productId: string) {
    const product = await productRepository.findById(productId);
    if (!product) throw new NotFoundError('Product not found');

    const existing = await wishlistRepository.findByUserAndProduct(userId, productId);
    if (existing) {
      await wishlistRepository.delete(existing.id);
      return { wishlisted: false };
    } else {
      await wishlistRepository.create({
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
      });
      return { wishlisted: true };
    }
  }
}

export const wishlistService = new WishlistService();
