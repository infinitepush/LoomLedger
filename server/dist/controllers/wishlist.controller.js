"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistController = exports.WishlistController = void 0;
const wishlist_service_1 = require("../services/wishlist.service");
const response_1 = require("../utils/response");
class WishlistController {
    async get(req, res, next) {
        try {
            const userId = req.user?.userId;
            const wishlist = await wishlist_service_1.wishlistService.getWishlist(userId);
            (0, response_1.sendSuccess)(res, wishlist);
        }
        catch (error) {
            next(error);
        }
    }
    async toggle(req, res, next) {
        try {
            const userId = req.user?.userId;
            const { productId } = req.body;
            const result = await wishlist_service_1.wishlistService.toggleWishlist(userId, productId);
            (0, response_1.sendSuccess)(res, result, result.wishlisted ? 'Added to wishlist' : 'Removed from wishlist');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.WishlistController = WishlistController;
exports.wishlistController = new WishlistController();
//# sourceMappingURL=wishlist.controller.js.map