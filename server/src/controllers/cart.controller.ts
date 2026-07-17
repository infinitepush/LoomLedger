import { Request, Response, NextFunction } from 'express';
import { cartService } from '../services/cart.service';
import { sendSuccess } from '../utils/response';

export class CartController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const cart = await cartService.getCart(userId!);
      sendSuccess(res, cart);
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const { productId, quantity } = req.body;
      const { logger } = await import('../utils/logger');
      logger.info(`[CartController] Add product ID: ${productId} for user: ${userId}`);
      const cart = await cartService.addToCart(userId!, productId, quantity);
      sendSuccess(res, cart, 'Item added to cart');
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const { productId, quantity } = req.body;
      const cart = await cartService.updateQuantity(userId!, productId, quantity);
      sendSuccess(res, cart, 'Cart updated');
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const { productId } = req.body;
      const cart = await cartService.removeFromCart(userId!, productId);
      sendSuccess(res, cart, 'Item removed from cart');
    } catch (error) {
      next(error);
    }
  }

  async clear(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const cart = await cartService.clearCart(userId!);
      sendSuccess(res, cart, 'Cart cleared');
    } catch (error) {
      next(error);
    }
  }
}

export const cartController = new CartController();
