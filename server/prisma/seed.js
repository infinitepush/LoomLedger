"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seeding...');
    // Clean existing data
    await prisma.contactSubmission.deleteMany({});
    await prisma.notification.deleteMany({});
    await prisma.savedArtisan.deleteMany({});
    await prisma.wishlistItem.deleteMany({});
    await prisma.cartItem.deleteMany({});
    await prisma.payment.deleteMany({});
    await prisma.orderTimeline.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.blockchainRecord.deleteMany({});
    await prisma.digitalPassport.deleteMany({});
    await prisma.productTimeline.deleteMany({});
    await prisma.productImage.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.artisan.deleteMany({});
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});
    console.log('🧹 Cleaned database tables.');
    const passwordHash = await bcryptjs_1.default.hash('password123', 12);
    // 1. Create Categories
    const categoriesData = [
        { name: 'Banarasi Silk', slug: 'banarasi-silk', image: 'product-banarasi.png' },
        { name: 'Kanjivaram Silk', slug: 'kanjivaram-silk', image: 'product-kanjivaram.png' },
        { name: 'Chanderi Cotton', slug: 'chanderi-cotton', image: 'product-chanderi.png' },
        { name: 'Pochampally Ikat', slug: 'pochampally-ikat', image: 'product-ikat.png' },
        { name: 'Pashmina Shawl', slug: 'pashmina-shawl', image: 'product-pashmina.png' },
        { name: 'Patola Saree', slug: 'patola-saree', image: 'product-patola.png' },
        { name: 'Bhagalpuri Tussar', slug: 'bhagalpuri-tussar', image: 'product-kanjivaram.png' },
        { name: 'Sambhalpuri Saree', slug: 'sambhalpuri-saree', image: 'product-chanderi.png' },
    ];
    for (const cat of categoriesData) {
        await prisma.category.create({ data: cat });
    }
    console.log('✔ Seeded 8 categories.');
    // 2. Create Admin
    await prisma.user.create({
        data: {
            name: 'Admin Moderator',
            email: 'admin@loomledger.com',
            passwordHash,
            role: 'admin',
            emailVerified: true,
        },
    });
    console.log('✔ Seeded Admin.');
    // 3. Create 10 Artisans
    const artisansData = [
        {
            name: 'Ramesh Vishwakarma',
            email: 'artisan1@example.com',
            craft: 'Banarasi Silk Weaving',
            region: 'Varanasi, Uttar Pradesh',
            district: 'Varanasi',
            state: 'Uttar Pradesh',
            experience: '35 Years',
            giNumber: 'GI-2009-34',
            bio: 'Ramesh continues a 200-year-old family legacy in Varanasi. His handloom workshop produces the finest zari work, using real silver and gold thread.',
            giCertified: true,
            status: client_1.ArtisanStatus.approved,
            verified: true,
        },
        {
            name: 'Lakshmi Sundaram',
            email: 'artisan2@example.com',
            craft: 'Kanjivaram Silk Weaving',
            region: 'Kanchipuram, Tamil Nadu',
            district: 'Kanchipuram',
            state: 'Tamil Nadu',
            experience: '28 Years',
            giNumber: 'GI-2005-02',
            bio: 'Lakshmi is a pioneer among women weavers in Kanchipuram. She specializes in the Korvai technique, joining contrasting borders with body silk.',
            giCertified: true,
            status: client_1.ArtisanStatus.approved,
            verified: true,
        },
        {
            name: 'Fatima Ansari',
            email: 'artisan3@example.com',
            craft: 'Chanderi Weaving',
            region: 'Chanderi, Madhya Pradesh',
            district: 'Ashoknagar',
            state: 'Madhya Pradesh',
            experience: '22 Years',
            giNumber: 'GI-2004-12',
            bio: 'Fatima blends modern pastel aesthetics with ancient sheer weave in Chanderi, specializing in gossamer fabrics.',
            giCertified: true,
            status: client_1.ArtisanStatus.approved,
            verified: true,
        },
        {
            name: 'Gopal Patra',
            email: 'artisan4@example.com',
            craft: 'Sambhalpuri Ikat',
            region: 'Bargarh, Odisha',
            district: 'Bargarh',
            state: 'Odisha',
            experience: '30 Years',
            giNumber: 'GI-2008-04',
            bio: 'Gopal is a master of double-ikat tie-dye weaving in Bargarh, depicting tribal motifs and folklore.',
            giCertified: true,
            status: client_1.ArtisanStatus.approved,
            verified: true,
        },
        {
            name: 'Devji Premji',
            email: 'artisan5@example.com',
            craft: 'Bhujodi Woolen Weaving',
            region: 'Bhuj, Gujarat',
            district: 'Kutch',
            state: 'Gujarat',
            experience: '25 Years',
            giNumber: 'GI-2011-09',
            bio: 'Devji is a National Merit awardee, weaving sturdy yet beautiful wool shawls with geometric extra-weft patterns.',
            giCertified: true,
            status: client_1.ArtisanStatus.approved,
            verified: true,
        },
        {
            name: 'Suhail Ahmed',
            email: 'artisan6@example.com',
            craft: 'Sozni Kashmiri Pashmina',
            region: 'Srinagar, Jammu & Kashmir',
            district: 'Srinagar',
            state: 'Jammu & Kashmir',
            experience: '20 Years',
            giNumber: 'GI-2008-11',
            bio: 'Suhail weaves ultra-fine pure Pashmina shawls, embroidered with delicate needlework patterns.',
            giCertified: true,
            status: client_1.ArtisanStatus.approved,
            verified: true,
        },
        {
            name: 'Babu Lal Khatri',
            email: 'artisan7@example.com',
            craft: 'Ajrakh Block Print & Weaving',
            region: 'Barmer, Rajasthan',
            district: 'Barmer',
            state: 'Rajasthan',
            experience: '40 Years',
            giNumber: 'GI-2013-05',
            bio: 'Babu Lal Khatri uses 16 steps of handblock resist printing and natural dyes to craft stunning sarees.',
            giCertified: true,
            status: client_1.ArtisanStatus.approved,
            verified: true,
        },
        {
            name: 'Kondal Rao',
            email: 'artisan8@example.com',
            craft: 'Pochampally Silk Ikat',
            region: 'Pochampally, Telangana',
            district: 'Yadadri Bhuvanagiri',
            state: 'Telangana',
            experience: '18 Years',
            giNumber: 'GI-2004-01',
            bio: 'Kondal Rao specializes in complex geometric double-ikat patterns on rich Mulberry silk warp lines.',
            giCertified: true,
            status: client_1.ArtisanStatus.approved,
            verified: true,
        },
        {
            name: 'Mohan Das',
            email: 'artisan9@example.com',
            craft: 'Tussar Silk Weaving',
            region: 'Bhagalpur, Bihar',
            district: 'Bhagalpur',
            state: 'Bihar',
            experience: '12 Years',
            giNumber: null,
            bio: 'Mohan weaves raw textured wild silk, maintaining eco-friendly non-violent silk harvesting processes.',
            giCertified: false,
            status: client_1.ArtisanStatus.pending,
            verified: false,
        },
        {
            name: 'Radha Devi',
            email: 'artisan10@example.com',
            craft: 'Patan Patola Weaving',
            region: 'Patan, Gujarat',
            district: 'Patan',
            state: 'Gujarat',
            experience: '15 Years',
            giNumber: null,
            bio: 'Radha Deviation crafts exquisite double-ikat Patola silk shawls utilizing organic natural colors.',
            giCertified: false,
            status: client_1.ArtisanStatus.pending,
            verified: false,
        },
    ];
    const artisans = [];
    for (const art of artisansData) {
        const user = await prisma.user.create({
            data: {
                name: art.name,
                email: art.email,
                passwordHash,
                role: client_1.UserRole.artisan,
                emailVerified: true,
            },
        });
        const artisan = await prisma.artisan.create({
            data: {
                userId: user.id,
                craft: art.craft,
                experience: art.experience,
                region: art.region,
                district: art.district,
                state: art.state,
                bio: art.bio,
                giCertified: art.giCertified,
                giNumber: art.giNumber,
                status: art.status,
                verified: art.verified,
                walletAddress: '0x' + (0, uuid_1.v4)().replace(/-/g, '').substring(0, 40),
                verificationHash: '0x' + (0, uuid_1.v4)().replace(/-/g, ''),
                followersCount: Math.floor(200 + Math.random() * 1200),
            },
        });
        artisans.push(artisan);
    }
    console.log('✔ Seeded 10 Artisans.');
    // 4. Create 30 Buyers
    const buyers = [];
    for (let i = 1; i <= 30; i++) {
        const buyer = await prisma.user.create({
            data: {
                name: `Buyer Customer ${i}`,
                email: `buyer${i}@example.com`,
                passwordHash,
                role: client_1.UserRole.buyer,
                emailVerified: true,
            },
        });
        buyers.push(buyer);
    }
    console.log('✔ Seeded 30 Buyers.');
    // 5. Create 100 Products across 8 categories
    const categoryKeys = [
        { cat: 'Banarasi Silk', slug: 'banarasi-silk', img: 'product-banarasi.png' },
        { cat: 'Kanjivaram Silk', slug: 'kanjivaram-silk', img: 'product-kanjivaram.png' },
        { cat: 'Chanderi Cotton', slug: 'chanderi-cotton', img: 'product-chanderi.png' },
        { cat: 'Pochampally Ikat', slug: 'pochampally-ikat', img: 'product-ikat.png' },
        { cat: 'Pashmina Shawl', slug: 'pashmina-shawl', img: 'product-pashmina.png' },
        { cat: 'Patola Saree', slug: 'patola-saree', img: 'product-patola.png' },
        { cat: 'Bhagalpuri Tussar', slug: 'bhagalpuri-tussar', img: 'product-kanjivaram.png' },
        { cat: 'Sambhalpuri Saree', slug: 'sambhalpuri-saree', img: 'product-chanderi.png' },
    ];
    let productCount = 0;
    for (let i = 1; i <= 100; i++) {
        const catObj = categoryKeys[i % categoryKeys.length];
        const artisanIndex = i % 8; // Assign to verified artisans (index 0 to 7)
        const artisan = artisans[artisanIndex];
        const price = Math.floor(4500 + Math.random() * 25000);
        const originalPrice = Math.round(price * 1.25);
        const slug = `${catObj.slug}-creation-${i}`;
        const specifications = {
            'Dye Type': i % 2 === 0 ? 'Organic Vegetable Dyes' : 'Azo-Free Chemical dyebath',
            'Loom Type': i % 3 === 0 ? 'Throw-shuttle Wooden Pit Loom' : 'Traditional Frame Handloom',
            'Thread Count': i % 2 === 0 ? '120/2 double ply' : '80/2 combed silk warp',
            'Weave Density': '10,000 wefts per meter',
        };
        const blockchainId = '0x' + (0, uuid_1.v4)().replace(/-/g, '') + (0, uuid_1.v4)().replace(/-/g, '').substring(0, 24);
        const product = await prisma.product.create({
            data: {
                name: `Heritage handwoven ${catObj.cat} Saree Style #${i}`,
                slug,
                description: `This exquisite ${catObj.cat} is a masterwork crafted by ${artisan.user?.name || 'our registered artisan'}. Handspun thread is dyed using organic colors, then woven carefully over several weeks. It features auspicious motifs representing our rich cultural legacy, making it perfect for ceremonies and festive occasions.`,
                price,
                originalPrice,
                image: catObj.img,
                fabric: i % 2 === 0 ? '100% Pure Mulberry Silk' : 'Traditional Silk Cotton Blend',
                craftTime: `${10 + (i % 20)} Days on Loom`,
                category: catObj.cat,
                categorySlug: catObj.slug,
                region: artisan.region,
                rating: Number((4.0 + Math.random() * 1.0).toFixed(1)),
                reviewCount: i % 5,
                stockQuantity: 2,
                verified: artisan.verified,
                giCertified: artisan.giCertified,
                featured: i <= 12,
                tags: [catObj.cat, 'Handloom', 'Indian Heritage', 'Weaves'],
                specifications,
                blockchainId,
                artisanId: artisan.id,
            },
        });
        // Create digital passport
        await prisma.digitalPassport.create({
            data: {
                productId: product.id,
                tokenId: `PP-TOKEN-${i + 1000}`,
                txHash: blockchainId,
                walletAddress: artisan.walletAddress,
                network: 'polygon-amoy',
                mintedAt: new Date(),
            },
        });
        // Create timeline
        const now = new Date().toISOString().split('T')[0];
        await prisma.productTimeline.createMany({
            data: [
                { productId: product.id, stage: 'Yarn Dyed and Prepared', date: now, location: artisan.region },
                { productId: product.id, stage: 'Loom Threaded & Setup', date: now, location: artisan.region },
                { productId: product.id, stage: 'Weaving Completed', date: now, location: artisan.region },
                { productId: product.id, stage: 'Quality audit and tag minting', date: now, location: 'Platform Registry' },
            ],
        });
        productCount++;
    }
    console.log(`✔ Seeded ${productCount} Products.`);
    // 6. Seed 50 Orders
    const productsList = await prisma.product.findMany({ include: { artisan: true } });
    let orderCount = 0;
    for (let i = 1; i <= 50; i++) {
        const buyer = buyers[i % buyers.length];
        const product = productsList[i % productsList.length];
        const orderNumber = `ORD-2026-${1000 + i}`;
        const date = new Date(Date.now() - (i * 2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        const statusOptions = [
            client_1.OrderStatus.Delivered,
            client_1.OrderStatus.Shipped,
            client_1.OrderStatus.Processing,
            client_1.OrderStatus.Pending,
        ];
        const status = statusOptions[i % statusOptions.length];
        const order = await prisma.order.create({
            data: {
                orderNumber,
                userId: buyer.id,
                totalAmount: product.price,
                status,
                shippingName: buyer.name,
                shippingAddress: 'Lane No. 3, Heritage Colony, Mandir Rd',
                shippingCity: product.region.split(',')[0],
                shippingState: product.region.split(',')[1]?.trim() || 'Uttar Pradesh',
                shippingPincode: '221001',
                shippingPhone: '+91 99999 88888',
                blockchainTxHash: '0x' + (0, uuid_1.v4)().replace(/-/g, '') + (0, uuid_1.v4)().replace(/-/g, '').substring(0, 24),
                createdAt: new Date(date),
                items: {
                    create: {
                        productId: product.id,
                        quantity: 1,
                        price: product.price,
                        artisanId: product.artisanId,
                    },
                },
                timeline: {
                    createMany: {
                        data: [
                            { status: 'Pending', date, note: 'Order placed by customer.' },
                            ...(status !== client_1.OrderStatus.Pending
                                ? [{ status: 'Processing', date, note: 'Order confirmed and packing.' }]
                                : []),
                            ...(status === client_1.OrderStatus.Shipped || status === client_1.OrderStatus.Delivered
                                ? [{ status: 'Shipped', date, note: 'Handloom dispatched via courier.' }]
                                : []),
                            ...(status === client_1.OrderStatus.Delivered
                                ? [{ status: 'Delivered', date, note: 'Package delivered. Authenticity certificate unlocked.' }]
                                : []),
                        ],
                    },
                },
            },
        });
        // Create payment
        await prisma.payment.create({
            data: {
                orderId: order.id,
                razorpayOrderId: `rzp_order_${(0, uuid_1.v4)().substring(0, 10)}`,
                razorpayPaymentId: `rzp_pay_${(0, uuid_1.v4)().substring(0, 10)}`,
                amount: product.price,
                status: status === client_1.OrderStatus.Pending ? client_1.PaymentStatus.pending : client_1.PaymentStatus.completed,
            },
        });
        orderCount++;
    }
    console.log(`✔ Seeded ${orderCount} Orders with payment states.`);
    // 7. Seed 2 Stories
    const storyArtisan = artisans[0];
    await prisma.story.createMany({
        data: [
            {
                title: "The Golden Warp: Varanasi's Last Gold Brocade Handlooms",
                slug: "the-golden-warp-varanasis-last-gold-brocade-handlooms",
                excerpt: "Inside Ramesh's traditional weaving studio, where ancient throw-shuttle looms weave raw silk thread with pure silver plated gold zari wire.",
                content: "For generations, the weavers of Varanasi have converted silk yarn into shimmering poetry. In our workshop, we maintain pit looms that have stood for nearly eighty years. Every Banarasi saree represents weeks of uninterrupted focus, where the master artisan interlaces the silver zari thread using the Kadhua technique. By preserving this double-warp pit loom, we ensure our ancestral legacy survives in the digital era.",
                coverImage: "product-banarasi.png",
                readTime: "4 min read",
                artisanId: storyArtisan.id,
            },
            {
                title: "Symphony in Thread: The Korvai Weaves of Lakshmi",
                slug: "symphony-in-thread-the-korvai-weaves-of-lakshmi",
                excerpt: "How women weaver cooperatives in Kanchipuram are reviving forgotten temple border border styles using double warp designs.",
                content: "The signature feature of a true Kanjivaram silk saree lies in its contrasting border, joined to the body warp via interlocking loops. In our female weaver guild, we are bringing back traditional motifs inspired by Pallava temple structures. Our digital passport system on LoomLedger allows buyers to trace the exact hand-intertwining stages of the borders, protecting the genuine masterworks from cheap powerloom replicas.",
                coverImage: "product-kanjivaram.png",
                readTime: "5 min read",
                artisanId: artisans[1].id,
            },
        ],
    });
    console.log('✔ Seeded 2 Heritage Stories.');
    console.log('🎉 Seeding successfully completed!');
}
main()
    .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map