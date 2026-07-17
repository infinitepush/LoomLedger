import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env';
import { logger } from '../utils/logger';

export class CloudinaryService {
  constructor() {
    this.initialize();
  }

  private initialize() {
    if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
      cloudinary.config({
        cloud_name: env.CLOUDINARY_CLOUD_NAME,
        api_key: env.CLOUDINARY_API_KEY,
        api_secret: env.CLOUDINARY_API_SECRET,
      });
      logger.info('Cloudinary initialized successfully.');
    } else {
      logger.warn('Cloudinary config missing. Uploads will fallback to mock URLs.');
    }
  }

  async uploadImage(fileBuffer: Buffer, folder = 'loomledger'): Promise<string> {
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
    if (
      !env.CLOUDINARY_CLOUD_NAME || 
      env.CLOUDINARY_CLOUD_NAME.trim() === "" || 
      env.CLOUDINARY_CLOUD_NAME.includes("your-cloudinary")
    ) {
      logger.warn('Cloudinary cloud name is unconfigured or invalid. Using simulated mock image fallback.');
      return mockFallback();
    }

    return new Promise((resolve) => {
      cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image' },
        (error, result) => {
          if (error) {
            logger.error('Cloudinary upload error, falling back to mock:', error.message || error);
            resolve(mockFallback());
          } else {
            resolve(result?.secure_url || mockFallback());
          }
        }
      ).end(fileBuffer);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    if (!env.CLOUDINARY_CLOUD_NAME) return;
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      logger.error(`Cloudinary deletion error for ${publicId}:`, error);
    }
  }
}

export const cloudinaryService = new CloudinaryService();
