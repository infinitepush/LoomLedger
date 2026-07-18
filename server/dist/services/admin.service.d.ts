export declare class AdminService {
    listPendingArtisans(): Promise<({
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
    approveArtisan(id: string): Promise<{
        approved: boolean;
        txHash: string;
    }>;
    rejectArtisan(id: string): Promise<{
        rejected: boolean;
    }>;
    deleteArtisan(id: string): Promise<{
        deleted: boolean;
        artisanId: string;
        productsDeleted: number;
    }>;
}
export declare const adminService: AdminService;
//# sourceMappingURL=admin.service.d.ts.map