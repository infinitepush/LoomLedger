import { cartRepository } from '../repositories/cart.repository';
import { productRepository } from '../repositories/product.repository';
import { NotFoundError, BadRequestError } from '../utils/errors';

export class CartService {
  async getCart(userId: string) {
    const items = await cartRepository.findByUserId(userId);
    return items.map(item => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      name: item.product.name,
      price: item.product.price,
      originalPrice: item.product.originalPrice,
      image: item.product.image,
      category: item.product.category,
      artisanName: item.product.artisan.user.name,
    }));
  }

  async addToCart(userId: string, productId: string, quantity = 1) {
    const product = await productRepository.findById(productId);
    if (!product) throw new NotFoundError('Product not found');

    const existing = await cartRepository.findByUserAndProduct(userId, productId);
    if (existing) {
      const newQty = existing.quantity + quantity;
      await cartRepository.updateQuantity(existing.id, newQty);
    } else {
      await cartRepository.create({
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
        quantity,
      });
    }

    return this.getCart(userId);
  }

  async updateQuantity(userId: string, productId: string, quantity: number) {
    if (quantity <= 0) {
      await cartRepository.deleteByUserAndProduct(userId, productId);
    } else {
      const existing = await cartRepository.findByUserAndProduct(userId, productId);
      if (!existing) throw new NotFoundError('Item not found in cart');
      await cartRepository.updateQuantity(existing.id, quantity);
    }
    return this.getCart(userId);
  }

  async removeFromCart(userId: string, productId: string) {
    await cartRepository.deleteByUserAndProduct(userId, productId);
    return this.getCart(userId);
  }

  async clearCart(userId: string) {
    await cartRepository.clearUserCart(userId);
    return [];
  }
}

export const cartService = new CartService();
