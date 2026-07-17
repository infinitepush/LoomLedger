import Razorpay from 'razorpay';
import crypto from 'crypto';
import { env } from '../config/env';
import { logger } from '../utils/logger';

export class RazorpayService {
  private razorpay: Razorpay | null = null;

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET) {
      this.razorpay = new Razorpay({
        key_id: env.RAZORPAY_KEY_ID,
        key_secret: env.RAZORPAY_KEY_SECRET,
      });
      logger.info('Razorpay client initialized.');
    } else {
      logger.warn('Razorpay credentials missing. Running in simulated payment mode.');
    }
  }

  async createOrder(amount: number, receiptId: string): Promise<{ id: string; amount: number; currency: string }> {
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
          currency: order.currency as string,
        };
      } catch (err: any) {
        logger.error('Razorpay order creation failed:', err);
      }
    }

    // Simulated order object
    return {
      id: `rzp_order_${Math.random().toString(36).substring(2, 12)}`,
      amount,
      currency: 'INR',
    };
  }

  verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
    if (!env.RAZORPAY_KEY_SECRET) return true; // Auto-pass in sandbox/simulated mode

    try {
      const generatedSignature = crypto
        .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      return generatedSignature === signature;
    } catch (err) {
      logger.error('Razorpay signature verification failed:', err);
      return false;
    }
  }
}

export const razorpayService = new RazorpayService();
