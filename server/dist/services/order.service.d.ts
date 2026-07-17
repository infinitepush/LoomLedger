import { CreateOrderInput } from '../validators/order.validator';
export declare class OrderService {
    createOrder(userId: string, input: CreateOrderInput): Promise<{
        orderId: string;
        orderNumber: string;
        amount: number;
        razorpayOrderId: string;
        currency: string;
    }>;
    listBuyerOrders(userId: string): Promise<{
        id: any;
        orderNumber: any;
        date: any;
        amount: any;
        status: any;
        blockchainTxHash: any;
        productName: any;
        productImage: any;
        artisanName: any;
        artisanId: any;
        buyerId: any;
        buyerName: any;
        shippingDetails: {
            name: any;
            address: any;
            city: any;
            state: any;
            pincode: any;
            phone: any;
        };
        timeline: any;
    }[]>;
    listArtisanOrders(artisanId: string): Promise<{
        id: any;
        orderNumber: any;
        date: any;
        amount: any;
        status: any;
        blockchainTxHash: any;
        productName: any;
        productImage: any;
        artisanName: any;
        artisanId: any;
        buyerId: any;
        buyerName: any;
        shippingDetails: {
            name: any;
            address: any;
            city: any;
            state: any;
            pincode: any;
            phone: any;
        };
        timeline: any;
    }[]>;
    getOrderDetail(id: string): Promise<{
        id: any;
        orderNumber: any;
        date: any;
        amount: any;
        status: any;
        blockchainTxHash: any;
        productName: any;
        productImage: any;
        artisanName: any;
        artisanId: any;
        buyerId: any;
        buyerName: any;
        shippingDetails: {
            name: any;
            address: any;
            city: any;
            state: any;
            pincode: any;
            phone: any;
        };
        timeline: any;
    }>;
    updateOrderStatus(orderId: string, artisanId: string, status: 'Shipped' | 'Delivered'): Promise<{
        status: import(".prisma/client").$Enums.OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orderNumber: string;
        totalAmount: number;
        shippingName: string | null;
        shippingAddress: string | null;
        shippingCity: string | null;
        shippingState: string | null;
        shippingPincode: string | null;
        shippingPhone: string | null;
        blockchainTxHash: string | null;
    }>;
    private mapOrder;
}
export declare const orderService: OrderService;
//# sourceMappingURL=order.service.d.ts.map