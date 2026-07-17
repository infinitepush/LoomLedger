import { Request, Response, NextFunction } from 'express';
import { wishlistService } from '../services/wishlist.service';
import { sendSuccess } from '../utils/response';

export class WishlistController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const wishlist = await wishlistService.getWishlist(userId!);
      sendSuccess(res, wishlist);
    } catch (error) {
      next(error);
    }
  }

  async toggle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const { productId } = req.body;
      const result = await wishlistService.toggleWishlist(userId!, productId);
      sendSuccess(res, result, result.wishlisted ? 'Added to wishlist' : 'Removed from wishlist');
    } catch (error) {
      next(error);
    }
  }
}

export const wishlistController = new WishlistController();
