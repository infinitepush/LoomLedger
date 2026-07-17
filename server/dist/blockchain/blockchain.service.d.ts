export interface BlockchainArtisan {
    id: string;
    walletAddress: string;
    verificationHash: string;
    isVerified: boolean;
    timestamp: number;
}
export interface BlockchainProduct {
    id: string;
    tokenId: string;
    metadataHash: string;
    artisanWallet: string;
    timestamp: number;
}
export declare class BlockchainService {
    private provider;
    private signer;
    constructor();
    private initialize;
    registerArtisan(artisanId: string, walletAddress: string): Promise<string>;
    verifyArtisan(artisanId: string, verifiedStatus: boolean): Promise<string>;
    verifyArtisanOnChain(walletAddress: string): Promise<boolean>;
    mintPassport(productId: string, metadataHash: string, artisanWallet: string): Promise<{
        txHash: string;
        tokenId: string;
        ipfsHash?: string;
        gatewayUrl?: string;
    }>;
    verifyProduct(txHash: string): Promise<{
        isVerified: boolean;
        blockNumber: number;
        timestamp: string;
    }>;
}
export declare const blockchainService: BlockchainService;
//# sourceMappingURL=blockchain.service.d.ts.map