"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = exports.CartController = void 0;
const cart_service_1 = require("../services/cart.service");
const response_1 = require("../utils/response");
class CartController {
    async get(req, res, next) {
        try {
            const userId = req.user?.userId;
            const cart = await cart_service_1.cartService.getCart(userId);
            (0, response_1.sendSuccess)(res, cart);
        }
        catch (error) {
            next(error);
        }
    }
    async add(req, res, next) {
        try {
            const userId = req.user?.userId;
            const { productId, quantity } = req.body;
            const { logger } = await Promise.resolve().then(() => __importStar(require('../utils/logger')));
            logger.info(`[CartController] Add product ID: ${productId} for user: ${userId}`);
            const cart = await cart_service_1.cartService.addToCart(userId, productId, quantity);
            (0, response_1.sendSuccess)(res, cart, 'Item added to cart');
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const userId = req.user?.userId;
            const { productId, quantity } = req.body;
            const cart = await cart_service_1.cartService.updateQuantity(userId, productId, quantity);
            (0, response_1.sendSuccess)(res, cart, 'Cart updated');
        }
        catch (error) {
            next(error);
        }
    }
    async remove(req, res, next) {
        try {
            const userId = req.user?.userId;
            const { productId } = req.body;
            const cart = await cart_service_1.cartService.removeFromCart(userId, productId);
            (0, response_1.sendSuccess)(res, cart, 'Item removed from cart');
        }
        catch (error) {
            next(error);
        }
    }
    async clear(req, res, next) {
        try {
            const userId = req.user?.userId;
            const cart = await cart_service_1.cartService.clearCart(userId);
            (0, response_1.sendSuccess)(res, cart, 'Cart cleared');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CartController = CartController;
exports.cartController = new CartController();
//# sourceMappingURL=cart.controller.js.map