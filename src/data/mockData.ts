export interface Artisan {
  id: string;
  name: string;
  region: string;
  district: string;
  state: string;
  craft: string;
  experience: string;
  generation: string;
  avatar: string;
  verified: boolean;
  walletAddress: string;
  verificationHash: string;
  blockchainTimestamp: string;
  giCertified: boolean;
  giNumber?: string;
  rating: number;
  followersCount: number;
  productsCount: number;
  bio: string;
  specialties: string[];
  awards: string[];
  phone: string;
  email: string;
  achievements: string[];
  user?: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  currency: string;
  image: string;
  gallery: string[];
  category: string;
  categorySlug: string;
  region: string;
  weaver: {
    id: string;
    name: string;
    avatar: string;
  };
  verified: boolean;
  blockchainId: string;
  giCertified: boolean;
  rating: number;
  reviews: Review[];
  inStock: boolean;
  tags: string[];
  description: string;
  careInstructions: string;
  craftStory: string;
  craftTime: string;
  fabric: string;
  specifications: Record<string, string>;
  timeline: {
    stage: string;
    date: string;
    location: string;
    status: 'complete' | 'current' | 'pending';
  }[];
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  productId: string;
  productName: string;
  productImage: string;
  artisanId: string;
  artisanName: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  blockchainTxHash?: string;
  walletAddress?: string;
  timeline: { status: string; date: string; note: string }[];
}

export interface Story {
  slug: string;
  title: string;
  artisanId: string;
  artisanName: string;
  artisanAvatar: string;
  region: string;
  coverImage: string;
  excerpt: string;
  content: string;
  gallery: string[];
  craftProcess: { step: string; title: string; description: string; image?: string }[];
}

// 10 Detailed Artisans
export const mockArtisans: Artisan[] = [
  {
    id: "ART-OD-2026-000101",
    name: "Ramesh Vishwakarma",
    region: "Varanasi, Uttar Pradesh",
    district: "Varanasi",
    state: "Uttar Pradesh",
    craft: "Banarasi Silk Weaving",
    experience: "35 Years",
    generation: "6th Generation Master",
    avatar: "/assets/images/weaver-portrait.png",
    verified: true,
    walletAddress: "0x7F9c2e0b...4D19",
    verificationHash: "0x3f5c71b6e2d9a4b8c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
    blockchainTimestamp: "2026-01-10T11:23:45Z",
    giCertified: true,
    giNumber: "GI-2009-34",
    rating: 4.9,
    followersCount: 1420,
    productsCount: 48,
    bio: "Ramesh continues a 200-year-old family legacy in Varanasi. His handloom workshop produces the finest zari work, using real silver and gold thread. He has trained over 40 youth in the traditional Kadhua weaving technique to preserve this heritage.",
    specialties: ["Kadhua Weave", "Real Gold Zari Brocade", "Jangla Motifs"],
    awards: ["National Handloom Award 2019", "Shilp Guru 2023"],
    phone: "+91 98765 43210",
    email: "artisan1@example.com",
    achievements: ["Wove custom bridal saree for state dignitaries", "Established Varanasi Handloom Collective"]
  },
  {
    id: "ART-OD-2026-000102",
    name: "Lakshmi Sundaram",
    region: "Kanchipuram, Tamil Nadu",
    district: "Kanchipuram",
    state: "Tamil Nadu",
    craft: "Kanjivaram Silk Weaving",
    experience: "28 Years",
    generation: "4th Generation Artisan",
    avatar: "/assets/images/weaver-portrait.png",
    verified: true,
    walletAddress: "0x4e6b2c8a...3F12",
    verificationHash: "0x8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
    blockchainTimestamp: "2026-02-15T09:12:30Z",
    giCertified: true,
    giNumber: "GI-2005-02",
    rating: 4.8,
    followersCount: 980,
    productsCount: 36,
    bio: "Lakshmi is a pioneer among women weavers in Kanchipuram. She specializes in the Korvai technique, joining contrasting borders with body silk via interlocking loops. Her works feature sacred temple borders and motifs from local sculptures.",
    specialties: ["Korvai Border", "Muthu Seer Pattern", "Double Warp Weave"],
    awards: ["State Award for Handloom Excellence 2021", "Women in Crafts Fellowship"],
    phone: "+91 87654 32109",
    email: "artisan2@example.com",
    achievements: ["Successfully revived 3 extinct Chola-era motifs", "Speaker at National Handloom Summit 2024"]
  },
  {
    id: "ART-OD-2026-000103",
    name: "Fatima Ansari",
    region: "Chanderi, Madhya Pradesh",
    district: "Ashoknagar",
    state: "Madhya Pradesh",
    craft: "Chanderi Weaving",
    experience: "22 Years",
    generation: "3rd Generation",
    avatar: "/assets/images/weaver-portrait.png",
    verified: true,
    walletAddress: "0x9d3a4c7e...8B21",
    verificationHash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    blockchainTimestamp: "2026-03-01T14:45:10Z",
    giCertified: true,
    giNumber: "GI-2004-12",
    rating: 4.7,
    followersCount: 720,
    productsCount: 28,
    bio: "Fatima blends modern pastel aesthetics with ancient sheer weave in Chanderi. She is renowned for gossamer-like fabrics woven with silk and cotton blends, adorned with delicate gold butis.",
    specialties: ["Gossamer Cotton Silk", "Meenakari Butis", "Sheer Draping Fabrics"],
    awards: ["Chanderi Vikas Award 2022"],
    phone: "+91 76543 21098",
    email: "artisan3@example.com",
    achievements: ["Collaborated with boutique sustainable designers", "Featured in Craft Council India Journal"]
  },
  {
    id: "ART-OD-2026-000104",
    name: "Venkata Rao",
    region: "Pochampally, Telangana",
    district: "Yadadri Bhuvanagiri",
    state: "Telangana",
    craft: "Pochampally Ikat Weaving",
    experience: "40 Years",
    generation: "5th Generation",
    avatar: "/assets/images/weaver-portrait.png",
    verified: true,
    walletAddress: "0x5f8b3d2c...1E44",
    verificationHash: "0x6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b",
    blockchainTimestamp: "2026-01-22T08:34:11Z",
    giCertified: true,
    giNumber: "GI-2005-04",
    rating: 4.9,
    followersCount: 1150,
    productsCount: 42,
    bio: "Venkata is a master of tie-and-dye 'Ikat' (Chowra-Ikat). The precision of his geometric diamond patterns is legendary. He maps patterns using graph paper before dyeing to ensure alignment of warp and weft yarns.",
    specialties: ["Double Ikat", "Geometric Diamond Patterns", "Natural Indigo Dyeing"],
    awards: ["Kala Ratna Award 2018", "National Master Craftsman Title"],
    phone: "+91 99480 12345",
    email: "artisan4@example.com",
    achievements: ["Established village co-op dyeing house", "Trained over 50 weavers in natural dyeing"]
  },
  {
    id: "ART-OD-2026-000105",
    name: "Mohammad Dar",
    region: "Srinagar, Jammu & Kashmir",
    district: "Srinagar",
    state: "Jammu & Kashmir",
    craft: "Pashmina Weaving & Embroidery",
    experience: "45 Years",
    generation: "5th Generation Ustad",
    avatar: "/assets/images/weaver-portrait.png",
    verified: true,
    walletAddress: "0x2d5a1b8f...9C77",
    verificationHash: "0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b",
    blockchainTimestamp: "2025-12-05T10:15:00Z",
    giCertified: true,
    giNumber: "GI-2008-46",
    rating: 5.0,
    followersCount: 2100,
    productsCount: 15,
    bio: "Ustad Mohammad Dar makes collector's items. Each pure Changthangi cashmere pashmina shawl takes 3 to 18 months, with Sozni needlework so dense it covers the fabric like a second skin.",
    specialties: ["Sozni Needlework", "Changthangi Cashmere Spun", "Kani Shawl Loom Weave"],
    awards: ["Padma Shri Nominee", "National Award 2017", "UNESCO Master Craftsperson"],
    phone: "+91 91234 56789",
    email: "artisan5@example.com",
    achievements: ["Shawls exhibited in London Craft Week", "Created museum-quality restoration piece"]
  },
  {
    id: "ART-OD-2026-000106",
    name: "Arun Basak",
    region: "Nadia, West Bengal",
    district: "Nadia",
    state: "West Bengal",
    craft: "Jamdani Muslin Weaving",
    experience: "30 Years",
    generation: "4th Generation Weft Artist",
    avatar: "/assets/images/weaver-portrait.png",
    verified: true,
    walletAddress: "0x1a8f9d0c...7B54",
    verificationHash: "0x4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c",
    blockchainTimestamp: "2026-03-10T16:22:15Z",
    giCertified: true,
    giNumber: "GI-2016-118",
    rating: 4.8,
    followersCount: 840,
    productsCount: 31,
    bio: "Arun is dedicated to restoring Bengal Jamdani's transparent beauty. Woven with cotton weft patterns laid directly onto cotton warp during hand-manipulation, his work feels weightless.",
    specialties: ["Dhakai Jamdani", "Fine Cotton Muslin Weave", "Floral Vine Borders"],
    awards: ["President's Gold Medal 2015"],
    phone: "+91 98300 98765",
    email: "artisan6@example.com",
    achievements: ["Revived fine 200-count cotton threads", "Participated in Bengal Heritage Exposition"]
  },
  {
    id: "ART-OD-2026-000107",
    name: "Harshad Salvi",
    region: "Patan, Gujarat",
    district: "Patan",
    state: "Gujarat",
    craft: "Patan Patola Weaving",
    experience: "50 Years",
    generation: "8th Generation Heirloom Master",
    avatar: "/assets/images/weaver-portrait.png",
    verified: true,
    walletAddress: "0x8f2d5c1e...6A98",
    verificationHash: "0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
    blockchainTimestamp: "2026-02-28T07:11:55Z",
    giCertified: true,
    giNumber: "GI-2013-88",
    rating: 5.0,
    followersCount: 1890,
    productsCount: 8,
    bio: "Harshad belongs to one of the three surviving Patola families in Patan. His double-ikat Patola silk sarees take up to a year, containing vibrant colors dyed with natural vegetable pigments that never fade.",
    specialties: ["Double Ikat (Patan Style)", "Natural Vegetable Pigment Dye", "Elephant & Parrot Lattice Motif"],
    awards: ["Padma Shri 2020", "National Heritage Fellow"],
    phone: "+91 94260 99999",
    email: "artisan7@example.com",
    achievements: ["Sarees featured in museums globally", "Maintains Patola Craft Museum in Patan"]
  },
  {
    id: "ART-OD-2026-000108",
    name: "Mohan Lal Meher",
    region: "Sonepur, Odisha",
    district: "Subarnapur",
    state: "Odisha",
    craft: "Sambalpuri Ikat Weaving",
    experience: "32 Years",
    generation: "3rd Generation",
    avatar: "/assets/images/weaver-portrait.png",
    verified: true,
    walletAddress: "0x6c9d2f0a...2B18",
    verificationHash: "0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b",
    blockchainTimestamp: "2026-03-05T12:00:00Z",
    giCertified: true,
    giNumber: "GI-2010-91",
    rating: 4.8,
    followersCount: 650,
    productsCount: 35,
    bio: "Mohan Lal is a master of Bandha (Sambalpuri Ikat). His designs depict native flora, shells, and wheels (Chakra) hand-woven into premium mercerized cotton and mulberry silk.",
    specialties: ["Bandha Ikat", "Mulberry Silk Sarees", "Traditional Odisha Borders"],
    awards: ["State Handloom Award 2022"],
    phone: "+91 94370 12345",
    email: "artisan8@example.com",
    achievements: ["Created massive handloom mural for state assembly", "Trained 20 family weavers"]
  },
  {
    id: "ART-OD-2026-000109",
    name: "Sunita Devi",
    region: "Bhagalpur, Bihar",
    district: "Bhagalpur",
    state: "Bihar",
    craft: "Tussar Silk Weaving",
    experience: "19 Years",
    generation: "2nd Generation Weaving Artisan",
    avatar: "/assets/images/weaver-portrait.png",
    verified: false, // Pending verification in the Admin Dashboard!
    walletAddress: "0x3e8a4d7c...5C99",
    verificationHash: "",
    blockchainTimestamp: "",
    giCertified: true,
    giNumber: "GI-2011-152",
    rating: 4.6,
    followersCount: 220,
    productsCount: 14,
    bio: "Sunita Devi manages a small women-run loom house in Bhagalpur. They extract eco-friendly Ahimsa (non-violent) silk from cocoons and hand-weave textured Tussar textiles.",
    specialties: ["Ahimsa Silk", "Textured Tussar Fabric", "Organic Vegetable Prints"],
    awards: ["Bihar Skill Entrepreneurship Award"],
    phone: "+91 95460 54321",
    email: "artisan9@example.com",
    achievements: ["Formed local self-help weaving group", "Eco-friendly cocoon process development"]
  },
  {
    id: "ART-OD-2026-000110",
    name: "Kabir Khan",
    region: "Lucknow, Uttar Pradesh",
    district: "Lucknow",
    state: "Uttar Pradesh",
    craft: "Chikankari Hand Embroidery",
    experience: "25 Years",
    generation: "4th Generation",
    avatar: "/assets/images/weaver-portrait.png",
    verified: false, // Pending verification in the Admin Dashboard!
    walletAddress: "0x7d8c5e1a...2F33",
    verificationHash: "",
    blockchainTimestamp: "",
    giCertified: true,
    giNumber: "GI-2008-119",
    rating: 4.7,
    followersCount: 410,
    productsCount: 19,
    bio: "Kabir Khan preserves Lucknow's traditional shadow work. They hand-embroider ultra-fine floral patterns onto muslin and chiffon fabrics using specialized stitches.",
    specialties: ["Bakhiya Shadow Work", "Phanda Embroidery", "Muri Stitch Art"],
    awards: ["Lucknow Artisan Merit Award"],
    phone: "+91 94150 98765",
    email: "artisan10@example.com",
    achievements: ["Embroidered heirloom items for global exhibitions", "Trained 30 female embroiderers"]
  }
];

// Generates 30+ Products based on categories and our image library.
export const mockProducts: Product[] = [
  {
    id: "PROD_001",
    name: "Varanasi Gold Zari Saree — Crimson Red",
    slug: "varanasi-gold-zari-saree-crimson-red",
    price: 14500,
    originalPrice: 17500,
    currency: "INR",
    image: "product-banarasi.png",
    gallery: ["product-banarasi.png", "heritage-1.jpg", "heritage-5.jpg"],
    category: "Banarasi Silk",
    categorySlug: "banarasi-silk",
    region: "Varanasi, Uttar Pradesh",
    weaver: { id: "ART-OD-2026-000101", name: "Ramesh Vishwakarma", avatar: "/assets/images/weaver-portrait.png" },
    verified: true,
    blockchainId: "0x3f5c71b6e2d9a4b8c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
    giCertified: true,
    rating: 4.8,
    reviews: [
      { id: "rev_1", userName: "Priya Nair", rating: 5, comment: "Magnificent craftsmanship. The weight is perfect and the zari shimmer is extremely premium.", date: "2026-03-12", verifiedPurchase: true },
      { id: "rev_2", userName: "Kriti Sharma", rating: 4.6, comment: "Beautiful saree. The crimson shade is slightly darker than the screen, but still stunning.", date: "2026-03-05", verifiedPurchase: true }
    ],
    inStock: true,
    tags: ["Bridal", "Wedding", "Pure Silk", "Gold Zari"],
    description: "An authentic, heritage-grade Banarasi Silk Saree woven over 45 days. Made with heavy mulberry silk yarns and real gold-dipped silver threads (Zari). It displays a heavy floral border and ornate pallu.",
    careInstructions: "Dry clean only. Store wrapped in a muslin cloth to protect the zari from tarnishing.",
    craftStory: "Banarasi weaving dates back to the Vedic times. Master weavers in Varanasi work on traditional pit looms, manually lifting specific warp threads to create the brocade pattern. This piece uses the complex Kadhua technique.",
    craftTime: "45 Days",
    fabric: "100% Pure Mulberry Silk & Silver Zari",
    specifications: { "Length": "5.5 meters", "Blouse Piece": "0.8 meters included", "Weave Technique": "Kadhua Weft Brocade", "Zari Type": "Tested Silver-plated Zari" },
    timeline: [
      { stage: "Yarn Dyeing", date: "2026-01-12", location: "Varanasi Co-op", status: "complete" },
      { stage: "Loom Drafting", date: "2026-01-20", location: "Ramesh Workshop", status: "complete" },
      { stage: "Hand Weaving Process", date: "2026-02-15", location: "Varanasi Workshops", status: "complete" },
      { stage: "GI Validation", date: "2026-03-01", location: "Government Craft Bureau", status: "complete" },
      { stage: "Blockchain Tokenization", date: "2026-03-02", location: "Polygon Network", status: "complete" }
    ]
  },
  {
    id: "PROD_002",
    name: "Kanchipuram Silk — Royal Violet & Gold",
    slug: "kanchipuram-silk-royal-violet-gold",
    price: 19500,
    originalPrice: 24000,
    currency: "INR",
    image: "product-kanjivaram.png",
    gallery: ["product-kanjivaram.png", "heritage-4.jpg", "heritage-5.jpg"],
    category: "Kanjivaram",
    categorySlug: "kanjivaram",
    region: "Kanchipuram, Tamil Nadu",
    weaver: { id: "ART-OD-2026-000102", name: "Lakshmi Sundaram", avatar: "/assets/images/weaver-portrait.png" },
    verified: true,
    blockchainId: "0x8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
    giCertified: true,
    rating: 4.9,
    reviews: [
      { id: "rev_3", userName: "Sudha Ramaswamy", rating: 5, comment: "Outstanding Korvai border. Heavy weight and traditional temple pattern looks divine.", date: "2026-02-28", verifiedPurchase: true }
    ],
    inStock: true,
    tags: ["South India", "Pure Silk", "Temple Border", "Bridal"],
    description: "A masterwork Kanjivaram silk saree featuring three-ply heavy mulberry silk. The border is attached separately using the legendary interlocking Korvai method, showcasing heavy gold work.",
    careInstructions: "Dry clean only. Wrap in paper, avoid hanging on hangers for long durations.",
    craftStory: "Kanjivaram weaving requires two weavers working in tandem to pull warp ends for borders and body. The contrasting colors merge in steps resembling temple spires.",
    craftTime: "35 Days",
    fabric: "3-ply Mulberry Silk & Real Zari",
    specifications: { "Length": "5.6 meters", "Border Height": "14 inches", "Weave Style": "Double Warp Korvai", "Blouse Piece": "Matching border piece included" },
    timeline: [
      { stage: "Yarn Preparation", date: "2026-01-05", location: "Kanchipuram Spinning Mill", status: "complete" },
      { stage: "Border Dyeing", date: "2026-01-15", location: "Lakshmi Workshop", status: "complete" },
      { stage: "Twin Weaver Weaving", date: "2026-02-10", location: "Kanchipuram, TN", status: "complete" },
      { stage: "Quality Certificate", date: "2026-02-14", location: "Silk Board Authority", status: "complete" }
    ]
  },
  {
    id: "PROD_003",
    name: "Chanderi Silk Cotton Saree — Pale Ivory",
    slug: "chanderi-silk-cotton-saree-pale-ivory",
    price: 7200,
    originalPrice: 8500,
    currency: "INR",
    image: "product-chanderi.png",
    gallery: ["product-chanderi.png", "heritage-1.jpg"],
    category: "Chanderi",
    categorySlug: "chanderi",
    region: "Chanderi, Madhya Pradesh",
    weaver: { id: "ART-OD-2026-000103", name: "Fatima Ansari", avatar: "/assets/images/weaver-portrait.png" },
    verified: true,
    blockchainId: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    giCertified: true,
    rating: 4.6,
    reviews: [
      { id: "rev_4", userName: "Aditi G.", rating: 4, comment: "Extremely lightweight and sheer. Perfect for high-end summer functions.", date: "2026-03-08", verifiedPurchase: true }
    ],
    inStock: true,
    tags: ["Sheer", "Summer Wear", "Lightweight", "Pastel"],
    description: "Woven with raw silk in the warp and fine cotton in the weft, this Chanderi saree boasts a sheer texture and glossy finish, detailed with golden coin butis.",
    careInstructions: "Gentle dry wash. Avoid wringing or direct sunlight while drying.",
    craftStory: "Chanderi sarees flourished during the Mughal period. The sheer effect is achieved by using raw silk and fine yarn count, creating an ethereal drapery.",
    craftTime: "20 Days",
    fabric: "50% Raw Silk, 50% Cotton, Gold Thread",
    specifications: { "Length": "5.5 meters", "Weight": "350 grams", "Yarn Count": "120s cotton, 20/22 denier silk", "Zari": "Tested Zari Buti" },
    timeline: [
      { stage: "Weft Selection", date: "2026-02-01", location: "Chanderi Local Hub", status: "complete" },
      { stage: "Pit Loom Setup", date: "2026-02-05", location: "Fatima Studio", status: "complete" },
      { stage: "Manual Weaving", date: "2026-02-25", location: "Ashoknagar, MP", status: "complete" }
    ]
  },
  {
    id: "PROD_004",
    name: "Geometric Pochampally Ikat — Indigo Blue",
    slug: "geometric-pochampally-ikat-indigo-blue",
    price: 5800,
    originalPrice: 6900,
    currency: "INR",
    image: "product-ikat.png",
    gallery: ["product-ikat.png", "heritage-2.jpg"],
    category: "Ikat",
    categorySlug: "ikat",
    region: "Pochampally, Telangana",
    weaver: { id: "ART-OD-2026-000104", name: "Venkata Rao", avatar: "/assets/images/weaver-portrait.png" },
    verified: true,
    blockchainId: "0x6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b",
    giCertified: true,
    rating: 4.8,
    reviews: [
      { id: "rev_5", userName: "Sandhya K.", rating: 5, comment: "Brilliant graphic pattern. Alignments are almost identical. Very modern look.", date: "2026-02-12", verifiedPurchase: true }
    ],
    inStock: true,
    tags: ["Geometric", "Natural Dye", "Cotton Silk", "Daily Wear"],
    description: "An Indigo-dyed Pochampally cotton silk saree featuring precise double-ikat grids. Handwoven using resist-dyed yarns to create fuzzy geometric borders.",
    careInstructions: "Wash separately in cold water with mild liquid soap. Do not soak.",
    craftStory: "Pochampally Ikat is unique because the warp and weft yarns are wrapped in rubber bands and dyed multiple times according to the pattern, before being set on the loom.",
    craftTime: "25 Days",
    fabric: "70% Cotton, 30% Mulberry Silk",
    specifications: { "Length": "5.5 meters", "Dyeing": "Natural indigo and madder dye", "Warp Weft": "Double Ikat", "Origin": "Pochampally, Telangana" },
    timeline: [
      { stage: "Yarn Tying & Wrapping", date: "2025-12-15", location: "Pochampally Village", status: "complete" },
      { stage: "Multicolor Dyeing", date: "2025-12-28", location: "Venkata Dye-House", status: "complete" },
      { stage: "Loom Weaving", date: "2026-01-18", location: "Yadadri Bhuvanagiri", status: "complete" }
    ]
  },
  {
    id: "PROD_005",
    name: "Luxury Pashmina Sozni Shawl — Natural Cream",
    slug: "luxury-pashmina-sozni-shawl-natural-cream",
    price: 32000,
    originalPrice: 38000,
    currency: "INR",
    image: "product-pashmina.png",
    gallery: ["product-pashmina.png", "heritage-3.jpg", "heritage-5.jpg"],
    category: "Pashmina",
    categorySlug: "pashmina",
    region: "Srinagar, Jammu & Kashmir",
    weaver: { id: "ART-OD-2026-000105", name: "Mohammad Dar", avatar: "/assets/images/weaver-portrait.png" },
    verified: true,
    blockchainId: "0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b",
    giCertified: true,
    rating: 5.0,
    reviews: [
      { id: "rev_6", userName: "Karan Singh", rating: 5, comment: "An absolute heirloom piece. Extremely light, but incredibly warm. The Sozni embroidery is magical.", date: "2026-01-20", verifiedPurchase: true }
    ],
    inStock: true,
    tags: ["Luxury", "Cashmere", "Embroidery", "Heirloom"],
    description: "Crafted from hand-spun Changthangi cashmere wool, this shawl features detailed 'Sozni' needlework embroidery, reflecting traditional paisley flora of Srinagar valley.",
    careInstructions: "Professional dry clean only. Store with cedar balls or lavender sachets.",
    craftStory: "Changthangi goats live at 14,000 feet in Ladakh. Their ultra-fine undercoat wool is collected, hand-spun by Kashmiri women, hand-woven, and then sent to master needlework artisans for embroidery.",
    craftTime: "90 Days",
    fabric: "100% Pure Changthangi Cashmere Wool",
    specifications: { "Dimensions": "2.0m x 1.0m", "Fiber Diameter": "12-14 microns", "Embroidery Stitch": "Sozni (Single Needlework)", "Weight": "210 grams" },
    timeline: [
      { stage: "Wool Sourcing", date: "2025-08-10", location: "Changthang Plateau", status: "complete" },
      { stage: "Hand Spinning", date: "2025-09-05", location: "Srinagar Home Spun", status: "complete" },
      { stage: "Handloom Weaving", date: "2025-10-02", location: "Dar Atelier", status: "complete" },
      { stage: "Sozni Needlework", date: "2025-11-28", location: "Srinagar, Kashmir", status: "complete" }
    ]
  },
  {
    id: "PROD_006",
    name: "UNESCO Dhakai Jamdani Muslin — Ethereal White",
    slug: "unesco-dhakai-jamdani-muslin-ethereal-white",
    price: 11000,
    originalPrice: 13500,
    currency: "INR",
    image: "product-jamdani.png",
    gallery: ["product-jamdani.png", "heritage-1.jpg"],
    category: "Jamdani",
    categorySlug: "jamdani",
    region: "Nadia, West Bengal",
    weaver: { id: "ART-OD-2026-000106", name: "Arun Basak", avatar: "/assets/images/weaver-portrait.png" },
    verified: true,
    blockchainId: "0x4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c",
    giCertified: true,
    rating: 4.7,
    reviews: [
      { id: "rev_7", userName: "Barnali Sen", rating: 5, comment: "Exquisite translucent fabric. The floral Jamdani work appears like shadows. Excellent quality.", date: "2026-03-11", verifiedPurchase: true }
    ],
    inStock: true,
    tags: ["Bengal", "UNESCO Craft", "Translucent", "Fine Cotton"],
    description: "An ethereal sheer fine cotton muslin saree handwoven using the supplementary weft Jamdani method. Intricate geometric flora floats on the surface of the translucent cloth.",
    careInstructions: "Gentle dry wash. Store flat inside cotton bags.",
    craftStory: "Jamdani uses supplementary wefts where patterns are added during weaving with fine bamboo needles. The weaver works from memory without drawing outlines on the cloth.",
    craftTime: "60 Days",
    fabric: "100% Fine Egyptian Cotton Muslin",
    specifications: { "Length": "5.5 meters", "Yarn Count": "200s super-fine cotton", "Motif style": "Panna Hazara (Thousand Emeralds)", "Weft Type": "Supplementary cotton" },
    timeline: [
      { stage: "Fine Thread Selection", date: "2026-01-02", location: "Bengal Spinners", status: "complete" },
      { stage: "Muslin Loom Drafting", date: "2026-01-10", location: "Arun Workshop", status: "complete" },
      { stage: "Weaving & Motif Weft", date: "2026-03-08", location: "Nadia, West Bengal", status: "complete" }
    ]
  },
  {
    id: "PROD_007",
    name: "Handspun Textured Khadi Cotton — Natural Cream",
    slug: "handspun-textured-khadi-cotton-natural-cream",
    price: 3200,
    originalPrice: 3800,
    currency: "INR",
    image: "product-khadi.png",
    gallery: ["product-khadi.png", "heritage-1.jpg"],
    category: "Khadi",
    categorySlug: "khadi",
    region: "Patan, Gujarat",
    weaver: { id: "ART-OD-2026-000107", name: "Harshad Salvi", avatar: "/assets/images/weaver-portrait.png" },
    verified: true,
    blockchainId: "0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
    giCertified: true,
    rating: 4.5,
    reviews: [
      { id: "rev_8", userName: "Rajesh P.", rating: 4, comment: "Highly breathable, has a beautiful organic texture. Very comfortable for daily wear.", date: "2026-02-15", verifiedPurchase: true }
    ],
    inStock: true,
    tags: ["Organic", "Sustainable", "Handspun", "Breatheable"],
    description: "A simple, elegant Khadi fabric hand-spun on charkha wheels and hand-woven. Its slubby, organic texture makes it breathable and durable, reflecting local village enterprise.",
    careInstructions: "Machine wash cold with similar colors. Warm iron when damp.",
    craftStory: "Khadi is the historic Indian cloth representing self-reliance. Spinners produce fine yarn on charkhas, which is woven directly in local village households.",
    craftTime: "14 Days",
    fabric: "100% Hand-spun Organic Cotton",
    specifications: { "Width": "44 inches", "Length": "5.0 meters", "Texture": "Slub cotton", "Color": "Undyed natural ivory" },
    timeline: [
      { stage: "Charkha Spinning", date: "2026-01-20", location: "Village Khadi Center", status: "complete" },
      { stage: "Loom Loading", date: "2026-01-28", location: "Salvi Home Weaves", status: "complete" },
      { stage: "Weaving", date: "2026-02-12", location: "Patan, Gujarat", status: "complete" }
    ]
  },
  {
    id: "PROD_008",
    name: "Patan Patola Double Ikat — Heirloom Elephant Grid",
    slug: "patan-patola-double-ikat-heirloom-elephant-grid",
    price: 48000,
    originalPrice: 58000,
    currency: "INR",
    image: "product-patola.png",
    gallery: ["product-patola.png", "heritage-2.jpg", "heritage-5.jpg"],
    category: "Patola",
    categorySlug: "patola",
    region: "Patan, Gujarat",
    weaver: { id: "ART-OD-2026-000107", name: "Harshad Salvi", avatar: "/assets/images/weaver-portrait.png" },
    verified: true,
    blockchainId: "0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
    giCertified: true,
    rating: 5.0,
    reviews: [
      { id: "rev_9", userName: "Devaki Patel", rating: 5, comment: "Words cannot describe the precision of the elephant motifs. A true masterpiece that will be passed down for generations.", date: "2026-03-01", verifiedPurchase: true }
    ],
    inStock: true,
    tags: ["Double Ikat", "Luxury", "Collectible", "Vegetable Dyes"],
    description: "A rare double-ikat Patola silk saree. Both warp and weft yarns are resist-dyed before weaving, creating identical rich patterns on both sides that last for centuries.",
    careInstructions: "Dry clean only. Store wrapped in silk paper inside wooden boxes.",
    craftStory: "Patola is double ikat where warp and weft threads are individually tied and dyed. The weaver matches the colors on the loom thread-by-thread. It takes 3-4 weavers up to 6 months.",
    craftTime: "180 Days",
    fabric: "100% Patan Mulberry Silk",
    specifications: { "Length": "5.5 meters", "Weft Warp": "Double Ikat alignment", "Dye type": "Madder, indigo, pomegranate skin extract", "Pattern": "Nari Kunjar Bhat (Women & Elephant)" },
    timeline: [
      { stage: "Yarn Design Plotting", date: "2025-08-01", location: "Patan Design Atelier", status: "complete" },
      { stage: "Tie & Dye Process (12 cycles)", date: "2025-10-15", location: "Salvi Dye House", status: "complete" },
      { stage: "Precision Loom Alignment", date: "2025-11-20", location: "Salvi Loom Room", status: "complete" },
      { stage: "Double Ikat Weaving", date: "2026-02-20", location: "Patan, Gujarat", status: "complete" }
    ]
  },
  // Add another 23 products dynamically to reach 30+ products
  ...Array.from({ length: 23 }).map((_, idx) => {
    const idNum = idx + 9;
    const catList = [
      { name: "Banarasi Silk", slug: "banarasi-silk", weaver: mockArtisans[0], price: 13000 + (idx * 500), image: "product-banarasi.png" },
      { name: "Kanjivaram", slug: "kanjivaram", weaver: mockArtisans[1], price: 17500 + (idx * 600), image: "product-kanjivaram.png" },
      { name: "Chanderi", slug: "chanderi", weaver: mockArtisans[2], price: 6200 + (idx * 200), image: "product-chanderi.png" },
      { name: "Ikat", slug: "ikat", weaver: mockArtisans[3], price: 4900 + (idx * 150), image: "product-ikat.png" },
      { name: "Pashmina", slug: "pashmina", weaver: mockArtisans[4], price: 29000 + (idx * 800), image: "product-pashmina.png" },
      { name: "Jamdani", slug: "jamdani", weaver: mockArtisans[5], price: 8800 + (idx * 300), image: "product-jamdani.png" },
      { name: "Khadi", slug: "khadi", weaver: mockArtisans[6], price: 2500 + (idx * 100), image: "product-khadi.png" }
    ];
    const cat = catList[idx % catList.length];
    
    // Some products are pending approval (e.g. from Sunita Devi or Kabir Khan)
    const isPending = idx > 18;
    const weaver = isPending 
      ? (idx % 2 === 0 ? mockArtisans[8] : mockArtisans[9]) 
      : cat.weaver;

    return {
      id: `PROD_0${idNum}`,
      name: `${cat.name} Handloom Saree — Special Edition ${idx + 1}`,
      slug: `${cat.slug}-handloom-saree-special-edition-${idx + 1}`,
      price: cat.price,
      originalPrice: Math.round(cat.price * 1.2),
      currency: "INR",
      image: cat.image,
      gallery: [cat.image],
      category: cat.name,
      categorySlug: cat.slug,
      region: weaver.region,
      weaver: { id: weaver.id, name: weaver.name, avatar: weaver.avatar },
      verified: !isPending, // If pending, verified is false
      blockchainId: isPending ? "" : `0x${idNum}b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a${idx}`,
      giCertified: weaver.giCertified,
      rating: Number((4.2 + (idx % 8) * 0.1).toFixed(1)),
      reviews: [],
      inStock: idx % 6 !== 0, // Some out of stock
      tags: [cat.name, "Handwoven", "Heritage", "Festival"],
      description: `A beautifully handwoven ${cat.name} textile showcasing the artisan's intricate design and mastery of handloom craft. Perfectly suited for festive and formal heritage wear.`,
      careInstructions: "Dry clean recommended. Keep wrapped in cotton cloth.",
      craftStory: `This piece represents the regional handloom weaving legacy of ${weaver.region}. Handcrafted over several weeks of meticulous yarn setup and loom weaving.`,
      craftTime: `${15 + (idx % 3) * 5} Days`,
      fabric: "Pure Natural Handloom Fiber",
      specifications: { "Length": "5.5 meters", "Blouse Piece": "Included", "Type": "Traditional Handloom" },
      timeline: isPending ? [] : [
        { stage: "Raw Materials Sourced", date: "2026-02-10", location: weaver.region, status: "complete" as const },
        { stage: "Woven on Loom", date: "2026-03-01", location: weaver.region, status: "complete" as const }
      ]
    };
  })
];

// 20 Mock Buyers
export const mockBuyers = Array.from({ length: 20 }).map((_, idx) => {
  const buyerNum = idx + 1;
  return {
    id: `BUYER_0${buyerNum}`,
    name: buyerNum === 1 ? "Priya Sharma" : `Buyer User ${buyerNum}`,
    email: buyerNum === 1 ? "buyer1@example.com" : `buyer${buyerNum}@example.com`,
    phone: `+91 99999 000${buyerNum.toString().padStart(2, '0')}`,
    avatar: "/assets/images/weaver-portrait.png",
    ordersCount: 2 + (idx % 4),
    walletAddress: `0xBuyerWalletAddress${buyerNum}`
  };
});

// 50 Orders with realistic data
export const mockOrders: Order[] = Array.from({ length: 50 }).map((_, idx) => {
  const orderNum = idx + 1;
  const product = mockProducts[idx % mockProducts.length];
  const buyer = mockBuyers[idx % mockBuyers.length];
  const artisan = mockArtisans.find(a => a.id === product.weaver.id) || mockArtisans[0];
  
  const statuses: Order['status'][] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  // First orders are delivered, middle shipped/processing, last pending/cancelled
  const status = idx < 30 ? 'Delivered' as const : idx < 42 ? 'Shipped' as const : idx < 47 ? 'Processing' as const : 'Pending' as const;

  const orderDate = new Date();
  orderDate.setDate(orderDate.getDate() - (50 - idx));

  return {
    id: `ORD-2026-${1000 + orderNum}`,
    buyerId: buyer.id,
    buyerName: buyer.name,
    productId: product.id,
    productName: product.name,
    productImage: product.image,
    artisanId: artisan.id,
    artisanName: artisan.name,
    amount: product.price,
    status: status,
    date: orderDate.toISOString().split('T')[0],
    blockchainTxHash: status === 'Delivered' ? `0xTxHashPolygonAmoy${1000 + orderNum}` : undefined,
    walletAddress: status === 'Delivered' ? buyer.walletAddress : undefined,
    timeline: [
      { status: 'Order Placed', date: orderDate.toISOString().split('T')[0], note: 'Order successfully logged on LoomLedger.' },
      status !== 'Pending' ? { status: 'Processing', date: orderDate.toISOString().split('T')[0], note: 'Artisan accepted and started packaging.' } : null,
      (status === 'Shipped' || status === 'Delivered') ? { status: 'Shipped', date: orderDate.toISOString().split('T')[0], note: 'Handed over to LoomLedger logistics.' } : null,
      status === 'Delivered' ? { status: 'Delivered', date: orderDate.toISOString().split('T')[0], note: 'Successfully verified & delivered on Polygon Amoy.' } : null
    ].filter(Boolean) as Order['timeline']
  };
});

// Netflix + Medium styled rich weaver stories
export const mockStories: Story[] = [
  {
    slug: "threads-of-kashi-ramesh-vishwakarma",
    title: "Threads of Kashi: Ramesh Vishwakarma's Six-Generation Legacy",
    artisanId: "ART-OD-2026-000101",
    artisanName: "Ramesh Vishwakarma",
    artisanAvatar: "/assets/images/weaver-portrait.png",
    region: "Varanasi, Uttar Pradesh",
    coverImage: "/assets/images/hero-weaver.png",
    excerpt: "Step inside Varanasi's oldest weaving clan, where silk warp meets liquid gold zari to weave tales of gods and kings.",
    content: "The rhythm of Ramesh Vishwakarma's pit loom has resounded in the Kabir Chaura lane of Varanasi for over forty years. Taught by his father at the age of eight, Ramesh manages a workshop that still employs the Kadhua brocade technique—a painstaking hand-weaving style where each floral motif (buti) is woven individually with supplementary gold wefts, leaving no loose threads on the back.\n\n\"A machine can replicate the pattern,\" Ramesh says, smoothing a patch of rich crimson red silk, \"but it cannot replicate the heartbeat. A handwoven saree breathes. The tension in the threads varies with my mood, my energy, and the weather. That variation is what makes it art, not a commodity.\"\n\nIn our digital age, Ramesh has partnered with LoomLedger to register his workshop's unique designs on the Polygon blockchain, ensuring that buyers can distinguish his family's craft from cheap machine-made duplicates imported from powerloom factories.",
    gallery: ["/assets/images/product-banarasi.png", "/assets/images/heritage-1.jpg", "/assets/images/heritage-5.jpg"],
    craftProcess: [
      { step: "01", title: "Pattern Designing (Naksha)", description: "The master designer plots the intricate motifs on graph paper, which is then translated into punch-cards." },
      { step: "02", title: "Zari Purifying", description: "Real silver wire is drawn and wrapped with silk thread, then dipped in liquid gold to create real Zari." },
      { step: "03", title: "Pit Loom Setup", description: "Drafting the heavy silk warp threads onto the traditional wooden pit loom, which takes up to 7 days." },
      { step: "04", title: "Kadhua Weft Interlock", description: "Manually weaving each floral motif thread-by-thread, ensuring zero floating threads." }
    ]
  },
  {
    slug: "sculpting-in-silk-lakshmi-sundaram",
    title: "Sculpting in Silk: How Lakshmi Sundaram Keeps Korvai Weaving Alive",
    artisanId: "ART-OD-2026-000102",
    artisanName: "Lakshmi Sundaram",
    artisanAvatar: "/assets/images/weaver-portrait.png",
    region: "Kanchipuram, Tamil Nadu",
    coverImage: "/assets/images/heritage-4.jpg",
    excerpt: "Discover the twin-weaver technique of Korvai, where silk borders are interlocked like temple spires.",
    content: "Kanchipuram silk is famous for its durability and heavy body, but its true signature is the Korvai border. Lakshmi Sundaram operates one of Kanchipuram's few remaining co-operatives specializing in genuine Korvai sarees.\n\nUnlike modern powerlooms, where borders and body are woven continuously, Korvai requires two weavers working in tandem. One weaver manages the body shuttle, while the other manages the contrasting border shuttles, joining them at the seams thread-by-thread. The result is a sharp, jagged contrast resembling temple spires.\n\n\"It is heavy work,\" Lakshmi explains. \"My partner and I sit side-by-side on the bench. We coordinate our breathing. When the loom sounds, we slide the shuttles simultaneously. We are sculpting silk, and it requires complete alignment.\"",
    gallery: ["/assets/images/product-kanjivaram.png", "/assets/images/heritage-4.jpg", "/assets/images/heritage-5.jpg"],
    craftProcess: [
      { step: "01", title: "Silk Degumming", description: "Boiling raw mulberry silk in soap water to extract natural gum, enhancing silk sheen." },
      { step: "02", title: "Two-Weaver Setup", description: "Arranging contrast warp threads on both ends of the loom for the heavy border panels." },
      { step: "03", title: "Korvai Interlocking", description: "Weaving contrasting borders and interlocking them thread-by-thread at the joints." }
    ]
  }
];

// FAQS for Landing Page
export const mockFaqs = [
  {
    q: "How does LoomLedger verify that a product is authentic handloom?",
    a: "Every product listed on LoomLedger is tagged by verified, registered artisans. When an artisan registers, their identity, government ID, and workshop location are vetted by platform administrators. Once approved, every product they upload is assigned a unique digital identity and recorded on the Polygon blockchain. Scanning the QR code displays this immutable record, including the weaver's name, workshop details, timeline, and fabric composition."
  },
  {
    q: "What is a Digital Product Passport (DPP)?",
    a: "A Digital Product Passport is a blockchain-secured record containing the complete supply chain history of the product. For LoomLedger, it includes raw material sourcing location, weave duration, artisan biography, GI certificate number, and a Polygon transaction hash showing the date of digital certification."
  },
  {
    q: "What is GI Certification?",
    a: "Geographical Indication (GI) is a government-issued protection certifying that a product possesses specific qualities and is made according to traditional methods native to a specific region (e.g., Banarasi Silk from Varanasi, Patola from Patan). LoomLedger works directly with GI-registered cooperatives."
  },
  {
    q: "Can I use LoomLedger without creating an account?",
    a: "Yes! LoomLedger's Marketplace, product verification page, artisan profiles, and stories are completely public. Anyone can search, filter, open product passports, and read artisan stories without logging in."
  }
];
