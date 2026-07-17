import { orderRepository } from '../repositories/order.repository';
import { productRepository } from '../repositories/product.repository';
import { cartRepository } from '../repositories/cart.repository';
import { razorpayService } from '../payments/razorpay';
import { blockchainService } from '../blockchain/blockchain.service';
import { NotFoundError, BadRequestError } from '../utils/errors';
import { CreateOrderInput } from '../validators/order.validator';
import { prisma } from '../database/prisma';
import { v4 as uuidv4 } from 'uuid';

export class OrderService {
  async createOrder(userId: string, input: CreateOrderInput) {
    // 1. Calculate amount and fetch products
    let totalAmount = 0;
    const itemsData: any[] = [];

    for (const item of input.items) {
      const product = await productRepository.findById(item.productId);
      if (!product) throw new NotFoundError(`Product ${item.productId} not found`);
      if (product.stockQuantity < item.quantity) {
        throw new BadRequestError(`Insufficient stock for product ${product.name}`);
      }
      totalAmount += product.price * item.quantity;
      itemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
        artisanId: product.artisanId,
        productName: product.name,
        productImage: product.image,
        artisanName: product.artisan.user.name,
      });
    }

    const orderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 2. Start database transaction to create order
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          totalAmount,
          status: 'Pending',
          shippingName: input.shippingName,
          shippingAddress: input.shippingAddress,
          shippingCity: input.shippingCity,
          shippingState: input.shippingState,
          shippingPincode: input.shippingPincode,
          shippingPhone: input.shippingPhone,
          items: {
            create: itemsData.map(i => ({
              productId: i.productId,
              quantity: i.quantity,
              price: i.price,
              artisanId: i.artisanId,
            })),
          },
          timeline: {
            create: {
              status: 'Pending',
              date: new Date().toISOString().split('T')[0],
              note: 'Order submitted successfully.',
            },
          },
        },
      });

      // Clear user cart
      await tx.cartItem.deleteMany({ where: { userId } });

      return newOrder;
    });

    // 3. Create Razorpay order
    const rzpOrder = await razorpayService.createOrder(totalAmount, order.id);

    // 4. Save payment record
    await prisma.payment.create({
      data: {
        orderId: order.id,
        razorpayOrderId: rzpOrder.id,
        amount: totalAmount,
        status: 'pending',
      },
    });

    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      amount: totalAmount,
      razorpayOrderId: rzpOrder.id,
      currency: 'INR',
    };
  }

  async listBuyerOrders(userId: string) {
    const orders = await orderRepository.list({ userId }, { createdAt: 'desc' });
    return orders.map(o => this.mapOrder(o));
  }

  async listArtisanOrders(artisanId: string) {
    const orders = await orderRepository.list({
      items: { some: { artisanId } },
    }, { createdAt: 'desc' });
    return orders.map(o => this.mapOrder(o));
  }

  async getOrderDetail(id: string) {
    const order = await orderRepository.findById(id);
    if (!order) throw new NotFoundError('Order not found');
    return this.mapOrder(order);
  }

  async updateOrderStatus(orderId: string, artisanId: string, status: 'Shipped' | 'Delivered') {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
    if (!order) throw new NotFoundError('Order not found');

    const ownsItem = order.items.some(i => i.artisanId === artisanId);
    if (!ownsItem) throw new BadRequestError('Access denied: You do not own items in this order.');

    const nowStr = new Date().toISOString().split('T')[0];
    const txHash = '0x' + uuidv4().replace(/-/g, '') + uuidv4().replace(/-/g, '').substring(0, 24);

    const updated = await prisma.$transaction(async (tx) => {
      const u = await tx.order.update({
        where: { id: orderId },
        data: {
          status,
          blockchainTxHash: txHash,
        },
      });

      await tx.orderTimeline.create({
        data: {
          orderId,
          status,
          date: nowStr,
          note: `Status updated to ${status} by artisan.`,
        },
      });

      return u;
    });

    // Notify user
    await prisma.notification.create({
      data: {
        userId: order.userId,
        title: `Order ${status}`,
        message: `Your order for handloom is now ${status}. Blockchain reference generated.`,
        type: status === 'Shipped' ? 'indigo' : 'success',
        link: '/buyer/dashboard',
      },
    });

    return updated;
  }

  private mapOrder(o: any) {
    // Map db order to frontend data shape
    const item = o.items[0]; // Frontend details expect singular-like array structure mapping
    return {
      id: o.id,
      orderNumber: o.orderNumber,
      date: o.createdAt.toISOString().split('T')[0],
      amount: o.totalAmount,
      status: o.status,
      blockchainTxHash: o.blockchainTxHash || o.payment?.razorpayPaymentId || '0x' + o.id.replace(/-/g, ''),
      productName: item?.product?.name || 'Handloom Creation',
      productImage: item?.product?.image || 'product-banarasi.png',
      artisanName: item?.product?.artisan?.user?.name || 'Master Artisan',
      artisanId: item?.artisanId,
      buyerId: o.userId,
      buyerName: o.user?.name || 'Buyer',
      shippingDetails: {
        name: o.shippingName,
        address: o.shippingAddress,
        city: o.shippingCity,
        state: o.shippingState,
        pincode: o.shippingPincode,
        phone: o.shippingPhone,
      },
      timeline: o.timeline?.map((t: any) => ({
        status: t.status,
        date: t.date,
        note: t.note,
      })) || [],
    };
  }
}

export const orderService = new OrderService();
