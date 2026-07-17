"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = exports.OrderController = void 0;
const order_service_1 = require("../services/order.service");
const response_1 = require("../utils/response");
class OrderController {
    async create(req, res, next) {
        try {
            const userId = req.user?.userId;
            const data = await order_service_1.orderService.createOrder(userId, req.body);
            (0, response_1.sendSuccess)(res, data, 'Order created successfully', 201);
        }
        catch (error) {
            next(error);
        }
    }
    async listBuyer(req, res, next) {
        try {
            const userId = req.user?.userId;
            const orders = await order_service_1.orderService.listBuyerOrders(userId);
            (0, response_1.sendSuccess)(res, orders);
        }
        catch (error) {
            next(error);
        }
    }
    async listArtisan(req, res, next) {
        try {
            const artisanId = req.user?.artisanId;
            const orders = await order_service_1.orderService.listArtisanOrders(artisanId);
            (0, response_1.sendSuccess)(res, orders);
        }
        catch (error) {
            next(error);
        }
    }
    async getDetail(req, res, next) {
        try {
            const order = await order_service_1.orderService.getOrderDetail(req.params.id);
            (0, response_1.sendSuccess)(res, order);
        }
        catch (error) {
            next(error);
        }
    }
    async updateStatus(req, res, next) {
        try {
            const artisanId = req.user?.artisanId;
            const { status } = req.body;
            const order = await order_service_1.orderService.updateOrderStatus(req.params.id, artisanId, status);
            (0, response_1.sendSuccess)(res, order, `Order status updated to ${status}`);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.OrderController = OrderController;
exports.orderController = new OrderController();
//# sourceMappingURL=order.controller.js.map