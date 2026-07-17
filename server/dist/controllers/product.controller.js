"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
const gemini_1 = require("../ai/gemini");
const response_1 = require("../utils/response");
class ProductController {
    async list(req, res, next) {
        try {
            const result = await product_service_1.productService.listProducts(req.query);
            (0, response_1.sendPaginated)(res, result.products, result.total, result.page, result.limit);
        }
        catch (error) {
            next(error);
        }
    }
    async getBySlug(req, res, next) {
        try {
            const product = await product_service_1.productService.getBySlug(req.params.slug);
            (0, response_1.sendSuccess)(res, product);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const artisanId = req.user?.artisanId;
            const data = await product_service_1.productService.createProduct(artisanId, req.body);
            (0, response_1.sendSuccess)(res, data, 'Product listed successfully', 201);
        }
        catch (error) {
            next(error);
        }
    }
    async getCategories(req, res, next) {
        try {
            const categories = await product_service_1.productService.getCategories();
            (0, response_1.sendSuccess)(res, categories);
        }
        catch (error) {
            next(error);
        }
    }
    async generateAISpecs(req, res, next) {
        try {
            const { name, category } = req.body;
            const data = await gemini_1.geminiService.generateProductSpecs(name, category);
            (0, response_1.sendSuccess)(res, data, 'AI specifications generated');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductController = ProductController;
exports.productController = new ProductController();
//# sourceMappingURL=product.controller.js.map