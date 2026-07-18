"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.artisanService = exports.ArtisanService = void 0;
const artisan_repository_1 = require("../repositories/artisan.repository");
const product_repository_1 = require("../repositories/product.repository");
const order_repository_1 = require("../repositories/order.repository");
const errors_1 = require("../utils/errors");
class ArtisanService {
    async getArtisanProfile(id) {
        let artisan = await artisan_repository_1.artisanRepository.findById(id);
        if (!artisan) {
            artisan = await artisan_repository_1.artisanRepository.findByUserId(id);
        }
        if (!artisan)
            throw new errors_1.NotFoundError('Artisan profile not found');
        return artisan;
    }
    async getArtisanStats(artisanId) {
        const products = await product_repository_1.productRepository.list({ artisanId });
        const orders = await order_repository_1.orderRepository.list({
            items: { some: { artisanId } },
            status: 'Delivered',
        });
        const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        return {
            revenue: totalRevenue,
            productsCount: products.length,
            ordersCount: orders.length,
            visitorsCount: 1420,
        };
    }
    async listArtisans(status) {
        if (status === 'all') {
            return artisan_repository_1.artisanRepository.list();
        }
        const queryStatus = status || 'approved';
        return artisan_repository_1.artisanRepository.list({ status: queryStatus });
    }
    async toggleSaveArtisan(userId, artisanId) {
        // In our schema, we have savedArtisans: SavedArtisan
        const { prisma } = await Promise.resolve().then(() => __importStar(require('../database/prisma')));
        const existing = await prisma.savedArtisan.findUnique({
            where: { userId_artisanId: { userId, artisanId } },
        });
        if (existing) {
            await prisma.savedArtisan.delete({ where: { id: existing.id } });
            return { saved: false };
        }
        else {
            await prisma.savedArtisan.create({ data: { userId, artisanId } });
            return { saved: true };
        }
    }
    async getSavedArtisans(userId) {
        const { prisma } = await Promise.resolve().then(() => __importStar(require('../database/prisma')));
        const saved = await prisma.savedArtisan.findMany({
            where: { userId },
        });
        return saved;
    }
}
exports.ArtisanService = ArtisanService;
exports.artisanService = new ArtisanService();
//# sourceMappingURL=artisan.service.js.map