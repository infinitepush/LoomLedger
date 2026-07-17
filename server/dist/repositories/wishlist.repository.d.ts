import { Prisma } from '@prisma/client';
export declare class WishlistRepository {
    findByUserAndProduct(userId: string, productId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    } | null>;
    findByUserId(userId: string): Promise<({
        product: {
            artisan: {
                user: {
                    name: string;
                    id: string;
                    email: string;
                    phone: string | null;
                    passwordHash: string | null;
                    role: import(".prisma/client").$Enums.UserRole;
                    avatar: string | null;
                    isActive: boolean;
                    emailVerified: boolean;
                    googleId: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                status: import(".prisma/client").$Enums.ArtisanStatus;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                craft: string;
                experience: string;
                region: string;
                district: string | null;
                state: string | null;
                bio: string | null;
                giCertified: boolean;
                giNumber: string | null;
                verified: boolean;
                followersCount: number;
                walletAddress: string | null;
                verificationHash: string | null;
                govtIdUrl: string | null;
            };
        } & {
            name: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            artisanId: string;
            rating: number;
            region: string;
            giCertified: boolean;
            verified: boolean;
            slug: string;
            description: string;
            price: number;
            originalPrice: number | null;
            image: string;
            fabric: string | null;
            craftTime: string | null;
            category: string;
            categorySlug: string;
            reviewCount: number;
            stockQuantity: number;
            featured: boolean;
            tags: string[];
            specifications: Prisma.JsonValue | null;
            blockchainId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    })[]>;
    create(data: Prisma.WishlistItemCreateInput): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    }>;
    deleteByUserAndProduct(userId: string, productId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    }>;
}
export declare const wishlistRepository: WishlistRepository;
//# sourceMappingURL=wishlist.repository.d.ts.map