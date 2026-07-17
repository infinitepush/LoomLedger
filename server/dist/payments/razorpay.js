"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorpayService = exports.RazorpayService = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../config/env");
const logger_1 = require("../utils/logger");
class RazorpayService {
    razorpay = null;
    constructor() {
        this.initialize();
    }
    initialize() {
        if (env_1.env.RAZORPAY_KEY_ID && env_1.env.RAZORPAY_KEY_SECRET) {
            this.razorpay = new razorpay_1.default({
                key_id: env_1.env.RAZORPAY_KEY_ID,
                key_secret: env_1.env.RAZORPAY_KEY_SECRET,
            });
            logger_1.logger.info('Razorpay client initialized.');
        }
        else {
            logger_1.logger.warn('Razorpay credentials missing. Running in simulated payment mode.');
        }
    }
    async createOrder(amount, receiptId) {
        if (this.razorpay) {
            try {
                const order = await this.razorpay.orders.create({
                    amount: amount * 100, // Razorpay works in paise
                    currency: 'INR',
                    receipt: receiptId,
                });
                return {
                    id: order.id,
                    amount: Number(order.amount) / 100,
                    currency: order.currency,
                };
            }
            catch (err) {
                logger_1.logger.error('Razorpay order creation failed:', err);
            }
        }
        // Simulated order object
        return {
            id: `rzp_order_${Math.random().toString(36).substring(2, 12)}`,
            amount,
            currency: 'INR',
        };
    }
    verifyPaymentSignature(orderId, paymentId, signature) {
        if (!env_1.env.RAZORPAY_KEY_SECRET)
            return true; // Auto-pass in sandbox/simulated mode
        try {
            const generatedSignature = crypto_1.default
                .createHmac('sha256', env_1.env.RAZORPAY_KEY_SECRET)
                .update(`${orderId}|${paymentId}`)
                .digest('hex');
            return generatedSignature === signature;
        }
        catch (err) {
            logger_1.logger.error('Razorpay signature verification failed:', err);
            return false;
        }
    }
}
exports.RazorpayService = RazorpayService;
exports.razorpayService = new RazorpayService();
//# sourceMappingURL=razorpay.js.map