import { CreateProductInput, ProductQueryInput } from '../validators/product.validator';
export declare class ProductService {
    listProducts(query: ProductQueryInput): Promise<{
        products: {
            id: any;
            name: any;
            slug: any;
            description: any;
            price: any;
            originalPrice: any;
            image: any;
            gallery: any;
            fabric: any;
            craftTime: any;
            category: any;
            categorySlug: any;
            region: any;
            rating: any;
            reviewCount: any;
            verified: any;
            giCertified: any;
            featured: any;
            tags: any;
            specifications: any;
            blockchainId: any;
            stockQuantity: any;
            weaver: {
                id: any;
                name: any;
                avatar: any;
                verified: any;
            };
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    getBySlug(slug: string): Promise<{
        timeline: any;
        reviews: any;
        passport: {
            tokenId: any;
            txHash: any;
            walletAddress: any;
            network: any;
            mintedAt: any;
        } | null;
        id: any;
        name: any;
        slug: any;
        description: any;
        price: any;
        originalPrice: any;
        image: any;
        gallery: any;
        fabric: any;
        craftTime: any;
        category: any;
        categorySlug: any;
        region: any;
        rating: any;
        reviewCount: any;
        verified: any;
        giCertified: any;
        featured: any;
        tags: any;
        specifications: any;
        blockchainId: any;
        stockQuantity: any;
        weaver: {
            id: any;
            name: any;
            avatar: any;
            verified: any;
        };
    }>;
    createProduct(artisanId: string, input: CreateProductInput): Promise<{
        product: {
            id: any;
            name: any;
            slug: any;
            description: any;
            price: any;
            originalPrice: any;
            image: any;
            gallery: any;
            fabric: any;
            craftTime: any;
            category: any;
            categorySlug: any;
            region: any;
            rating: any;
            reviewCount: any;
            verified: any;
            giCertified: any;
            featured: any;
            tags: any;
            specifications: any;
            blockchainId: any;
            stockQuantity: any;
            weaver: {
                id: any;
                name: any;
                avatar: any;
                verified: any;
            };
        };
        passport: {
            txHash: string;
            wallet: string | null;
            tokenId: string;
            title: string;
            price: number;
        };
    }>;
    getCategories(): Promise<{
        name: string;
        id: string;
        slug: string;
        image: string | null;
    }[]>;
    private mapProduct;
    private mapProductFull;
}
export declare const productService: ProductService;
//# sourceMappingURL=product.service.d.ts.map