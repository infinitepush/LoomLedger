import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/product.service';
import { geminiService } from '../ai/gemini';
import { sendSuccess, sendPaginated } from '../utils/response';

export class ProductController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.listProducts(req.query as any);
      sendPaginated(res, result.products, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  }

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getBySlug(req.params.slug);
      sendSuccess(res, product);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const artisanId = req.user?.artisanId;
      const data = await productService.createProduct(artisanId!, req.body);
      sendSuccess(res, data, 'Product listed successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await productService.getCategories();
      sendSuccess(res, categories);
    } catch (error) {
      next(error);
    }
  }

  async generateAISpecs(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, category } = req.body;
      const data = await geminiService.generateProductSpecs(name, category);
      sendSuccess(res, data, 'AI specifications generated');
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
