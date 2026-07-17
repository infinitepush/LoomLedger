export declare class RazorpayService {
    private razorpay;
    constructor();
    private initialize;
    createOrder(amount: number, receiptId: string): Promise<{
        id: string;
        amount: number;
        currency: string;
    }>;
    verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean;
}
export declare const razorpayService: RazorpayService;
//# sourceMappingURL=razorpay.d.ts.map