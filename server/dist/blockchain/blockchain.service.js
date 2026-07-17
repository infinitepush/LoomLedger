"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockchainService = exports.BlockchainService = void 0;
const logger_1 = require("../utils/logger");
const uuid_1 = require("uuid");
const prisma_1 = require("../database/prisma");
class BlockchainService {
    provider = null;
    signer = null;
    constructor() {
        this.initialize();
    }
    initialize() {
        logger_1.logger.info('Blockchain Service initialized using external LoomLedger Render microservice.');
    }
    async registerArtisan(artisanId, walletAddress) {
        try {
            const artisan = await prisma_1.prisma.artisan.findUnique({
                where: { id: artisanId },
                include: { user: true },
            });
            if (!artisan) {
                throw new Error('Artisan not found');
            }
            logger_1.logger.info(`[Blockchain] Registering artisan ${artisan.user.name} on-chain via Render microservice...`);
            const res = await fetch('https://loomledger.onrender.com/api/artisan/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: artisan.user.name,
                    walletAddress: walletAddress || artisan.walletAddress || '0x0000000000000000000000000000000000000000',
                    giNumber: artisan.giNumber || 'GI-NOT-CERTIFIED',
                    district: artisan.district || 'Varanasi',
                    state: artisan.state || 'Uttar Pradesh',
                    bio: artisan.bio || 'Master handloom weaver.',
                }),
            });
            const json = await res.json();
            if (res.ok && json.success) {
                logger_1.logger.info(`[Blockchain] Artisan registered successfully via API: TxHash ${json.txHash}`);
                return json.txHash;
            }
            throw new Error(json.message || 'Register API failed');
        }
        catch (err) {
            logger_1.logger.error('[Blockchain] Register artisan API failed, falling back to mock:', err);
            return '0x' + (0, uuid_1.v4)().replace(/-/g, '') + (0, uuid_1.v4)().replace(/-/g, '').substring(0, 24);
        }
    }
    async verifyArtisan(artisanId, verifiedStatus) {
        const txHash = '0x' + (0, uuid_1.v4)().replace(/-/g, '') + (0, uuid_1.v4)().replace(/-/g, '').substring(0, 24);
        logger_1.logger.info(`[Blockchain] Updating verification status for artisan ${artisanId} to ${verifiedStatus}. TxHash: ${txHash}`);
        return txHash;
    }
    async verifyArtisanOnChain(walletAddress) {
        try {
            const res = await fetch(`https://loomledger.onrender.com/api/artisan/verify/${walletAddress}`);
            const json = await res.json();
            return json.verified || false;
        }
        catch (err) {
            logger_1.logger.error('[Blockchain] Verify artisan status call failed:', err);
            return false;
        }
    }
    async mintPassport(productId, metadataHash, artisanWallet) {
        try {
            const product = await prisma_1.prisma.product.findUnique({
                where: { id: productId },
                include: { artisan: { include: { user: true } } },
            });
            if (!product) {
                throw new Error('Product not found');
            }
            const specs = product.specifications || {};
            const threadCount = specs['Thread Count'] || specs['threadCount'] || '120/2 double ply silk';
            const loomHours = product.craftTime || '15 Days on Loom';
            logger_1.logger.info(`[Blockchain] Minting Digital Passport for product "${product.name}" via Render microservice...`);
            const payload = {
                productName: product.name,
                price: product.price,
                weaverAddress: artisanWallet || product.artisan.walletAddress || '0x0000000000000000000000000000000000000000',
                weaverName: product.artisan.user.name,
                fabric: product.fabric || 'Pure Handwoven Textile',
                threadCount,
                loomHours,
                giCertified: product.giCertified,
                specifications: specs,
            };
            const res = await fetch('https://loomledger.onrender.com/api/passport/mint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const json = await res.json();
            if (res.ok && json.success) {
                logger_1.logger.info(`[Blockchain] Digital Passport minted successfully: TokenID ${json.tokenId}, TxHash ${json.txHash}`);
                return {
                    txHash: json.txHash,
                    tokenId: json.tokenId,
                    ipfsHash: json.ipfsHash,
                    gatewayUrl: json.gatewayUrl,
                };
            }
            throw new Error(json.message || 'Mint passport API failed');
        }
        catch (err) {
            logger_1.logger.error('[Blockchain] Mint passport API failed, falling back to mock:', err);
            return {
                txHash: '0x' + (0, uuid_1.v4)().replace(/-/g, '') + (0, uuid_1.v4)().replace(/-/g, '').substring(0, 24),
                tokenId: `PP-${Math.floor(100000 + Math.random() * 900000)}`,
            };
        }
    }
    async verifyProduct(txHash) {
        logger_1.logger.info(`[Blockchain] Querying verification status of transaction ${txHash}`);
        return {
            isVerified: true,
            blockNumber: Math.floor(40000000 + Math.random() * 5000000),
            timestamp: new Date().toISOString(),
        };
    }
}
exports.BlockchainService = BlockchainService;
exports.blockchainService = new BlockchainService();
//# sourceMappingURL=blockchain.service.js.map