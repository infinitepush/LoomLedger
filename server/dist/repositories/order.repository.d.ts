import { Prisma } from '@prisma/client';
export declare class OrderRepository {
    findById(id: string): Promise<({
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
        timeline: {
            status: string;
            id: string;
            createdAt: Date;
            date: string;
            note: string | null;
            orderId: string;
        }[];
        payment: {
            status: import(".prisma/client").$Enums.PaymentStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            method: string | null;
            amount: number;
            currency: string;
            razorpayOrderId: string | null;
            razorpayPaymentId: string | null;
            razorpaySignature: string | null;
            orderId: string;
        } | null;
        items: ({
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
            productId: string;
            quantity: number;
            artisanId: string;
            price: number;
            orderId: string;
        })[];
    } & {
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
    }) | null>;
    findByOrderNumber(orderNumber: string): Promise<({
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
        timeline: {
            status: string;
            id: string;
            createdAt: Date;
            date: string;
            note: string | null;
            orderId: string;
        }[];
        payment: {
            status: import(".prisma/client").$Enums.PaymentStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            method: string | null;
            amount: number;
            currency: string;
            razorpayOrderId: string | null;
            razorpayPaymentId: string | null;
            razorpaySignature: string | null;
            orderId: string;
        } | null;
        items: ({
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
            productId: string;
            quantity: number;
            artisanId: string;
            price: number;
            orderId: string;
        })[];
    } & {
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
    }) | null>;
    create(data: Prisma.OrderCreateInput): Promise<{
        timeline: {
            status: string;
            id: string;
            createdAt: Date;
            date: string;
            note: string | null;
            orderId: string;
        }[];
        payment: {
            status: import(".prisma/client").$Enums.PaymentStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            method: string | null;
            amount: number;
            currency: string;
            razorpayOrderId: string | null;
            razorpayPaymentId: string | null;
            razorpaySignature: string | null;
            orderId: string;
        } | null;
        items: {
            id: string;
            productId: string;
            quantity: number;
            artisanId: string;
            price: number;
            orderId: string;
        }[];
    } & {
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
    update(id: string, data: Prisma.OrderUpdateInput): Promise<{
        timeline: {
            status: string;
            id: string;
            createdAt: Date;
            date: string;
            note: string | null;
            orderId: string;
        }[];
        payment: {
            status: import(".prisma/client").$Enums.PaymentStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            method: string | null;
            amount: number;
            currency: string;
            razorpayOrderId: string | null;
            razorpayPaymentId: string | null;
            razorpaySignature: string | null;
            orderId: string;
        } | null;
        items: {
            id: string;
            productId: string;
            quantity: number;
            artisanId: string;
            price: number;
            orderId: string;
        }[];
    } & {
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
    list(where?: Prisma.OrderWhereInput, orderBy?: Prisma.OrderOrderByWithRelationInput, skip?: number, take?: number): Promise<({
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
        timeline: {
            status: string;
            id: string;
            createdAt: Date;
            date: string;
            note: string | null;
            orderId: string;
        }[];
        payment: {
            status: import(".prisma/client").$Enums.PaymentStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            method: string | null;
            amount: number;
            currency: string;
            razorpayOrderId: string | null;
            razorpayPaymentId: string | null;
            razorpaySignature: string | null;
            orderId: string;
        } | null;
        items: ({
            product: {
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
            productId: string;
            quantity: number;
            artisanId: string;
            price: number;
            orderId: string;
        })[];
    } & {
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
    })[]>;
    count(where?: Prisma.OrderWhereInput): Promise<number>;
}
export declare const orderRepository: OrderRepository;
//# sourceMappingURL=order.repository.d.ts.map