"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryService = exports.CloudinaryService = void 0;
const cloudinary_1 = require("cloudinary");
const env_1 = require("../config/env");
const logger_1 = require("../utils/logger");
class CloudinaryService {
    constructor() {
        this.initialize();
    }
    initialize() {
        if (env_1.env.CLOUDINARY_CLOUD_NAME && env_1.env.CLOUDINARY_API_KEY && env_1.env.CLOUDINARY_API_SECRET) {
            cloudinary_1.v2.config({
                cloud_name: env_1.env.CLOUDINARY_CLOUD_NAME,
                api_key: env_1.env.CLOUDINARY_API_KEY,
                api_secret: env_1.env.CLOUDINARY_API_SECRET,
            });
            logger_1.logger.info('Cloudinary initialized successfully.');
        }
        else {
            logger_1.logger.warn('Cloudinary config missing. Uploads will fallback to mock URLs.');
        }
    }
    async uploadImage(fileBuffer, folder = 'loomledger') {
        const mockFallback = () => {
            if (fileBuffer && fileBuffer.length > 0) {
                return `data:image/png;base64,${fileBuffer.toString('base64')}`;
            }
            const mockImages = [
                'product-banarasi.png',
                'product-kanjivaram.png',
                'product-chanderi.png',
                'product-ikat.png',
            ];
            const randomImg = mockImages[Math.floor(Math.random() * mockImages.length)];
            return `/assets/images/${randomImg}`;
        };
        // If cloud name is empty, default placeholder, or not configured properly, use fallback
        if (!env_1.env.CLOUDINARY_CLOUD_NAME ||
            env_1.env.CLOUDINARY_CLOUD_NAME.trim() === "" ||
            env_1.env.CLOUDINARY_CLOUD_NAME.includes("your-cloudinary")) {
            logger_1.logger.warn('Cloudinary cloud name is unconfigured or invalid. Using simulated mock image fallback.');
            return mockFallback();
        }
        return new Promise((resolve) => {
            cloudinary_1.v2.uploader.upload_stream({ folder, resource_type: 'image' }, (error, result) => {
                if (error) {
                    logger_1.logger.error('Cloudinary upload error, falling back to mock:', error.message || error);
                    resolve(mockFallback());
                }
                else {
                    resolve(result?.secure_url || mockFallback());
                }
            }).end(fileBuffer);
        });
    }
    async deleteImage(publicId) {
        if (!env_1.env.CLOUDINARY_CLOUD_NAME)
            return;
        try {
            await cloudinary_1.v2.uploader.destroy(publicId);
        }
        catch (error) {
            logger_1.logger.error(`Cloudinary deletion error for ${publicId}:`, error);
        }
    }
}
exports.CloudinaryService = CloudinaryService;
exports.cloudinaryService = new CloudinaryService();
//# sourceMappingURL=cloudinary.js.map