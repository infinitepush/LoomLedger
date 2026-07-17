import { Request, Response, NextFunction } from 'express';
import { orderService } from '../services/order.service';
import { sendSuccess } from '../utils/response';

export class OrderController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const data = await orderService.createOrder(userId!, req.body);
      sendSuccess(res, data, 'Order created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async listBuyer(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const orders = await orderService.listBuyerOrders(userId!);
      sendSuccess(res, orders);
    } catch (error) {
      next(error);
    }
  }

  async listArtisan(req: Request, res: Response, next: NextFunction) {
    try {
      const artisanId = req.user?.artisanId;
      const orders = await orderService.listArtisanOrders(artisanId!);
      sendSuccess(res, orders);
    } catch (error) {
      next(error);
    }
  }

  async getDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.getOrderDetail(req.params.id);
      sendSuccess(res, order);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const artisanId = req.user?.artisanId;
      const { status } = req.body;
      const order = await orderService.updateOrderStatus(req.params.id, artisanId!, status);
      sendSuccess(res, order, `Order status updated to ${status}`);
    } catch (error) {
      next(error);
    }
  }
}

export const orderController = new OrderController();
