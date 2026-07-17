"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = exports.CartService = void 0;
const cart_repository_1 = require("../repositories/cart.repository");
const product_repository_1 = require("../repositories/product.repository");
const errors_1 = require("../utils/errors");
class CartService {
    async getCart(userId) {
        const items = await cart_repository_1.cartRepository.findByUserId(userId);
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
    async addToCart(userId, productId, quantity = 1) {
        const product = await product_repository_1.productRepository.findById(productId);
        if (!product)
            throw new errors_1.NotFoundError('Product not found');
        const existing = await cart_repository_1.cartRepository.findByUserAndProduct(userId, productId);
        if (existing) {
            const newQty = existing.quantity + quantity;
            await cart_repository_1.cartRepository.updateQuantity(existing.id, newQty);
        }
        else {
            await cart_repository_1.cartRepository.create({
                user: { connect: { id: userId } },
                product: { connect: { id: productId } },
                quantity,
            });
        }
        return this.getCart(userId);
    }
    async updateQuantity(userId, productId, quantity) {
        if (quantity <= 0) {
            await cart_repository_1.cartRepository.deleteByUserAndProduct(userId, productId);
        }
        else {
            const existing = await cart_repository_1.cartRepository.findByUserAndProduct(userId, productId);
            if (!existing)
                throw new errors_1.NotFoundError('Item not found in cart');
            await cart_repository_1.cartRepository.updateQuantity(existing.id, quantity);
        }
        return this.getCart(userId);
    }
    async removeFromCart(userId, productId) {
        await cart_repository_1.cartRepository.deleteByUserAndProduct(userId, productId);
        return this.getCart(userId);
    }
    async clearCart(userId) {
        await cart_repository_1.cartRepository.clearUserCart(userId);
        return [];
    }
}
exports.CartService = CartService;
exports.cartService = new CartService();
//# sourceMappingURL=cart.service.js.map