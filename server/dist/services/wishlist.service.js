"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistService = exports.WishlistService = void 0;
const wishlist_repository_1 = require("../repositories/wishlist.repository");
const product_repository_1 = require("../repositories/product.repository");
const errors_1 = require("../utils/errors");
class WishlistService {
    async getWishlist(userId) {
        const items = await wishlist_repository_1.wishlistRepository.findByUserId(userId);
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
    async toggleWishlist(userId, productId) {
        const product = await product_repository_1.productRepository.findById(productId);
        if (!product)
            throw new errors_1.NotFoundError('Product not found');
        const existing = await wishlist_repository_1.wishlistRepository.findByUserAndProduct(userId, productId);
        if (existing) {
            await wishlist_repository_1.wishlistRepository.delete(existing.id);
            return { wishlisted: false };
        }
        else {
            await wishlist_repository_1.wishlistRepository.create({
                user: { connect: { id: userId } },
                product: { connect: { id: productId } },
            });
            return { wishlisted: true };
        }
    }
}
exports.WishlistService = WishlistService;
exports.wishlistService = new WishlistService();
//# sourceMappingURL=wishlist.service.js.map