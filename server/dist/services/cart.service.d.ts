export declare class CartService {
    getCart(userId: string): Promise<{
        id: string;
        productId: string;
        quantity: number;
        name: string;
        price: number;
        originalPrice: number | null;
        image: string;
        category: string;
        artisanName: string;
    }[]>;
    addToCart(userId: string, productId: string, quantity?: number): Promise<{
        id: string;
        productId: string;
        quantity: number;
        name: string;
        price: number;
        originalPrice: number | null;
        image: string;
        category: string;
        artisanName: string;
    }[]>;
    updateQuantity(userId: string, productId: string, quantity: number): Promise<{
        id: string;
        productId: string;
        quantity: number;
        name: string;
        price: number;
        originalPrice: number | null;
        image: string;
        category: string;
        artisanName: string;
    }[]>;
    removeFromCart(userId: string, productId: string): Promise<{
        id: string;
        productId: string;
        quantity: number;
        name: string;
        price: number;
        originalPrice: number | null;
        image: string;
        category: string;
        artisanName: string;
    }[]>;
    clearCart(userId: string): Promise<never[]>;
}
export declare const cartService: CartService;
//# sourceMappingURL=cart.service.d.ts.map