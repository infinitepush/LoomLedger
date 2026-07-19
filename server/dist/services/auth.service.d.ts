import { RegisterBuyerInput, RegisterArtisanInput, LoginInput } from '../validators/auth.validator';
export declare class AuthService {
    registerBuyer(input: RegisterBuyerInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            avatar: string | null;
        };
    }>;
    registerArtisan(input: RegisterArtisanInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            avatar: string | null;
            phone: string | null;
            artisan: {
                id: string;
                craft: string;
                experience: string;
                region: string;
                bio: string | null;
                verified: boolean;
                walletAddress: string | null;
                verificationHash: string | null;
                giCertified: boolean;
                giNumber: string | null;
            } | undefined;
        };
        artisanId: string;
        walletAddress: string;
        txHash: string;
    }>;
    login(input: LoginInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            avatar: string | null;
            phone: string | null;
            artisan: {
                id: string;
                craft: string;
                verified: boolean;
                walletAddress: string | null;
                verificationHash: string | null;
                region: string;
                giCertified: boolean;
                giNumber: string | null;
            } | undefined;
        };
    }>;
    refreshToken(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(token: string): Promise<void>;
    getMe(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        avatar: string | null;
        phone: string | null;
        createdAt: Date;
        artisan: {
            id: string;
            craft: string;
            experience: string;
            region: string;
            bio: string | null;
            verified: boolean;
            status: import(".prisma/client").$Enums.ArtisanStatus;
            walletAddress: string | null;
            verificationHash: string | null;
            giCertified: boolean;
            giNumber: string | null;
            followersCount: number;
        } | undefined;
    }>;
    private generateTokens;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map