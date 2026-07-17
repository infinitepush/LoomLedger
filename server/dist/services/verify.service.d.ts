export declare class VerifyService {
    verifyById(productId: string): Promise<{
        success: boolean;
        type: string;
        blockchainVerified: boolean;
        data: {
            id: string;
            name: string;
            category: string;
            region: string;
            fabric: string | null;
            craftTime: string | null;
            blockchainId: string | null;
            giCertified: boolean;
            mintedAt: Date;
            blockNumber: number;
            weaver: {
                id: string;
                name: string;
                walletAddress: string | null;
                verified: boolean;
            };
            timeline: {
                stage: string;
                date: string;
                location: string;
                status: string;
            }[];
        };
    }>;
    verifyArtisanById(artisanId: string): Promise<{
        success: boolean;
        type: string;
        blockchainVerified: boolean;
        data: {
            id: string;
            name: string;
            craft: string;
            region: string;
            experience: string;
            giCertified: boolean;
            giNumber: string | null;
            status: import(".prisma/client").$Enums.ArtisanStatus;
            walletAddress: string | null;
            verificationHash: string | null;
            activeLoomCount: number;
        };
    }>;
}
export declare const verifyService: VerifyService;
//# sourceMappingURL=verify.service.d.ts.map