export declare class ArtisanService {
    getArtisanProfile(id: string): Promise<{
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
    }>;
    getArtisanStats(artisanId: string): Promise<{
        revenue: number;
        productsCount: number;
        ordersCount: number;
        visitorsCount: number;
    }>;
    listArtisans(status?: string): Promise<({
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
    })[]>;
    toggleSaveArtisan(userId: string, artisanId: string): Promise<{
        saved: boolean;
    }>;
    getSavedArtisans(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        artisanId: string;
    }[]>;
}
export declare const artisanService: ArtisanService;
//# sourceMappingURL=artisan.service.d.ts.map