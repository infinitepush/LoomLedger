export declare class WishlistService {
    getWishlist(userId: string): Promise<{
        id: string;
        name: string;
        slug: string;
        price: number;
        originalPrice: number | null;
        image: string;
        category: string;
        verified: boolean;
        giCertified: boolean;
        region: string;
        weaver: {
            id: string;
            name: string;
        };
    }[]>;
    toggleWishlist(userId: string, productId: string): Promise<{
        wishlisted: boolean;
    }>;
}
export declare const wishlistService: WishlistService;
//# sourceMappingURL=wishlist.service.d.ts.map