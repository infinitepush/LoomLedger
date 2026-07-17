import { prisma } from '../database/prisma';
import { blockchainService } from '../blockchain/blockchain.service';
import { NotFoundError } from '../utils/errors';
import { generateSlug } from '../utils/slugify';
import { CreateProductInput, ProductQueryInput } from '../validators/product.validator';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export class ProductService {
  async listProducts(query: ProductQueryInput) {
    const { page, limit, search, category, minPrice, maxPrice, giCertified, verified, sort, artisanId, featured } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = { isActive: true };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        { region: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (category && category !== 'all') {
      where.OR = [
        { categorySlug: category },
        { category: { contains: category, mode: 'insensitive' } },
      ];
      // Override the search OR if both provided
      if (search) {
        where.AND = [
          {
            OR: [
              { categorySlug: category },
              { category: { contains: category, mode: 'insensitive' } },
            ]
          },
          {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { category: { contains: search, mode: 'insensitive' } },
              { region: { contains: search, mode: 'insensitive' } },
            ]
          }
        ];
        delete where.OR;
      }
    }
    if (minPrice !== undefined) where.price = { ...(where.price as any || {}), gte: minPrice };
    if (maxPrice !== undefined) where.price = { ...(where.price as any || {}), lte: maxPrice };
    if (giCertified !== undefined) where.giCertified = giCertified;
    if (verified !== undefined) where.verified = verified;
    if (artisanId) where.artisanId = artisanId;
    if (featured) where.featured = featured;

    let orderBy: Prisma.ProductOrderByWithRelationInput = {};
    switch (sort) {
      case 'price-asc': orderBy = { price: 'asc' }; break;
      case 'price-desc': orderBy = { price: 'desc' }; break;
      case 'rating': orderBy = { rating: 'desc' }; break;
      case 'newest': orderBy = { createdAt: 'desc' }; break;
      default: orderBy = { featured: 'desc' }; break;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          artisan: { include: { user: { select: { name: true, avatar: true } } } },
          images: { orderBy: { order: 'asc' } },
          passport: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    const mapped = products.map((p) => this.mapProduct(p));
    return { products: mapped, total, page, limit };
  }

  async getBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        artisan: { include: { user: { select: { id: true, name: true, avatar: true } } } },
        images: { orderBy: { order: 'asc' } },
        timeline: { orderBy: { createdAt: 'asc' } },
        passport: true,
        reviews: {
          include: { user: { select: { name: true, avatar: true } } },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });
    if (!product) throw new NotFoundError('Product not found');
    return this.mapProductFull(product);
  }

  async createProduct(artisanId: string, input: CreateProductInput) {
    const artisan = await prisma.artisan.findUnique({
      where: { id: artisanId },
      include: { user: true },
    });
    if (!artisan) throw new NotFoundError('Artisan not found');

    const categorySlug = generateSlug(input.category);
    const slug = generateSlug(input.name, uuidv4().substring(0, 8));
    const blockchainId = '0x' + uuidv4().replace(/-/g, '') + uuidv4().replace(/-/g, '').substring(0, 24);

    // Ensure category exists
    await prisma.category.upsert({
      where: { slug: categorySlug },
      create: { name: input.category, slug: categorySlug },
      update: {},
    });

    const product = await prisma.product.create({
      data: {
        name: input.name,
        slug,
        description: input.description,
        price: input.price,
        originalPrice: input.originalPrice || Math.round(input.price * 1.2),
        image: input.image,
        fabric: input.fabric,
        craftTime: input.craftTime,
        category: input.category,
        categorySlug,
        region: artisan.region,
        tags: input.tags,
        specifications: input.specifications || {},
        giCertified: input.giCertified || artisan.giCertified,
        stockQuantity: input.stockQuantity || 1,
        verified: artisan.verified,
        blockchainId,
        artisanId,
      },
      include: {
        artisan: { include: { user: { select: { name: true, avatar: true } } } },
      },
    });

    // Mint on-chain Digital Passport
    const mintResult = await blockchainService.mintPassport(product.id, blockchainId, artisan.walletAddress || '');

    // Update product with real on-chain transaction hash
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: { blockchainId: mintResult.txHash },
      include: {
        artisan: { include: { user: { select: { name: true, avatar: true } } } },
      },
    });

    // Create digital passport database record
    await prisma.digitalPassport.create({
      data: {
        productId: product.id,
        tokenId: mintResult.tokenId,
        txHash: mintResult.txHash,
        walletAddress: artisan.walletAddress,
        metadataHash: mintResult.ipfsHash || null,
        network: 'polygon-amoy',
        mintedAt: new Date(),
      },
    });

    // Create timeline
    const now = new Date().toISOString().split('T')[0];
    await prisma.productTimeline.createMany({
      data: [
        { productId: product.id, stage: 'Raw Material Sourced', date: now, location: artisan.region, status: 'complete' },
        { productId: product.id, stage: 'Loom Setup & Threading', date: now, location: artisan.region, status: 'complete' },
        { productId: product.id, stage: 'Weaving in Progress', date: now, location: artisan.region, status: 'complete' },
        { productId: product.id, stage: 'Quality Check & Finishing', date: now, location: artisan.region, status: 'complete' },
        { productId: product.id, stage: 'Listed on LoomLedger', date: now, location: 'Digital Marketplace', status: 'complete' },
      ],
    });

    // Create blockchain record
    await prisma.blockchainRecord.create({
      data: {
        entityType: 'product',
        entityId: product.id,
        txHash: mintResult.txHash,
        action: 'mint_passport',
        metadata: { 
          name: product.name, 
          artisan: artisan.user.name,
          ipfsHash: mintResult.ipfsHash || undefined,
          gatewayUrl: mintResult.gatewayUrl || undefined
        },
      },
    });

    return {
      product: this.mapProduct(updatedProduct as any),
      passport: {
        txHash: mintResult.txHash,
        wallet: artisan.walletAddress,
        tokenId: mintResult.tokenId,
        title: product.name,
        price: product.price,
      },
    };
  }

  async getCategories() {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    return categories;
  }

  private mapProduct(p: any) {
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.image,
      gallery: p.images?.map((i: any) => i.url) || [p.image],
      fabric: p.fabric,
      craftTime: p.craftTime,
      category: p.category,
      categorySlug: p.categorySlug,
      region: p.region,
      rating: p.rating,
      reviewCount: p.reviewCount,
      verified: p.verified,
      giCertified: p.giCertified,
      featured: p.featured,
      tags: p.tags,
      specifications: p.specifications,
      blockchainId: p.blockchainId || '',
      stockQuantity: p.stockQuantity,
      weaver: {
        id: p.artisan?.userId || p.artisanId,
        name: p.artisan?.user?.name || 'Unknown Artisan',
        avatar: p.artisan?.user?.avatar,
        verified: p.artisan?.verified || false,
      },
    };
  }

  private mapProductFull(p: any) {
    return {
      ...this.mapProduct(p),
      timeline: p.timeline?.map((t: any) => ({
        stage: t.stage,
        date: t.date,
        location: t.location,
        status: t.status,
      })) || [],
      reviews: p.reviews?.map((r: any) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        user: r.user?.name || 'Anonymous',
        avatar: r.user?.avatar,
        createdAt: r.createdAt,
      })) || [],
      passport: p.passport ? {
        tokenId: p.passport.tokenId,
        txHash: p.passport.txHash,
        walletAddress: p.passport.walletAddress,
        network: p.passport.network,
        mintedAt: p.passport.mintedAt,
      } : null,
    };
  }
}

export const productService = new ProductService();
