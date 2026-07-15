"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Star,
  Award,
  Zap,
  BookOpen,
  HelpCircle,
  ChevronDown,
  UserCheck,
  Fingerprint,
  Heart,
  Search
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { mockFaqs, mockStories } from '@/data/mockData';

// Simple CTA Button helper
import Button from '@/components/ui/Button';

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  const { products, artisans, addToCart, toggleWishlist, isWishlisted } = useApp();
  
  // Filter verified and featured products
  const featuredProducts = products.filter(p => p.verified).slice(0, 4);
  const featuredArtisans = artisans.filter(a => a.verified).slice(0, 3);
  
  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // AI Story Showcase index
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const activeStory = mockStories[activeStoryIdx] || mockStories[0];

  return (
    <div className="flex flex-col w-full">
      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-[#F5F3EF]/50">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-success-light text-success text-xs font-semibold rounded-full border border-success/15">
              <ShieldCheck size={14} />
              <span>GI-Registered & Blockchain-Verified</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight font-semibold tracking-tight text-foreground">
              Every Thread <br />
              <span className="text-primary italic font-medium font-serif">Tells a Story</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Discover verified Indian handloom products straight from traditional artisans. Each item carries a blockchain-based Digital Product Passport documenting its weaver, materials, and Geographical Indication.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/marketplace" className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary-hover transition-all shadow-md flex items-center gap-2">
                <span>Explore Marketplace</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/verify" className="px-6 py-3 bg-white text-foreground border border-border font-medium rounded-md hover:bg-secondary transition-all flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" />
                <span>Verify Product</span>
              </Link>
            </div>
            
            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/80">
              <div>
                <p className="text-2xl font-bold text-foreground font-serif">30+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Master Crafts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground font-serif">12K+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Verified Safe</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground font-serif">100%</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Direct Payouts</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-border">
              <Image 
                src="/assets/images/hero-weaver.png" 
                alt="Master weaver on pit loom"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating certificate stamp badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-md shadow-lg border border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold">LL</div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Ramesh Vishwakarma</h4>
                    <p className="text-xs text-muted-foreground">Varanasi Master Weaver • 6th Generation</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-success bg-success-light px-2.5 py-1 rounded">
                  <ShieldCheck size={14} />
                  <span>Polygon Verified</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="py-20 border-b border-border bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Curated Heritage</span>
              <h2 className="text-3xl font-serif font-semibold text-foreground">Featured Masterpieces</h2>
              <p className="text-sm text-muted-foreground max-w-xl">
                Every piece is authenticated, GI tagged, and linked to its weaver's profile.
              </p>
            </div>
            <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover group">
              <span>View All Products</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <motion.article 
                key={product.id}
                className="group border border-border rounded-lg bg-card overflow-hidden transition-all hover:shadow-lg flex flex-col h-full"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                  <Image 
                    src={`/assets/images/${product.image}`}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.giCertified && (
                      <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        GI Certified
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-muted-foreground hover:text-error transition-all ${
                      isWishlisted(product.id) ? 'text-error' : ''
                    }`}
                  >
                    <Heart size={16} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{product.category}</span>
                      <span>{product.region.split(',')[0]}</span>
                    </div>
                    <Link href={`/marketplace/${product.slug}`} className="block">
                      <h3 className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground">by {product.weaver.name}</p>
                  </div>
                  
                  <div className="pt-4 mt-auto border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-muted-foreground line-through ml-2">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="text-xs bg-primary-light text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-md font-medium transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY LOOMLEDGER SECTION */}
      <section className="py-20 border-b border-border bg-[#F5F3EF]/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Uncompromising Trust</span>
            <h2 className="text-3xl font-serif font-semibold text-foreground">Empowering Artisans, Securing Crafts</h2>
            <p className="text-sm text-muted-foreground">
              We resolve market trust deficits with three core digital components.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Digital Product Passport",
                description: "Each saree has a blockchain-minted passport storing fiber tests, weave duration, loom specifications, and local verification status."
              },
              {
                icon: Fingerprint,
                title: "GI Verification Stamp",
                description: "We validate Geographical Indication certifications directly, blocking machine-made replicas from mimicking hand-woven tags."
              },
              {
                icon: UserCheck,
                title: "Artisan Direct Ecosystem",
                description: "LoomLedger removes middlemen completely, delivering 100% of sales directly to the verified weaver's digital wallet."
              }
            ].map((pillar, i) => (
              <div key={i} className="bg-white border border-border p-8 rounded-lg shadow-sm space-y-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-md bg-primary-light text-primary flex items-center justify-center shadow-sm">
                  <pillar.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW VERIFICATION WORKS */}
      <section className="py-20 border-b border-border bg-white" id="how-it-works">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Provenance Tracking</span>
            <h2 className="text-3xl font-serif font-semibold text-foreground">How Verification Works</h2>
            <p className="text-sm text-muted-foreground">
              Verify your handloom heritage from fiber to fashion in three simple steps.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step lines for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-border-strong z-0" />
            
            {[
              {
                step: "01",
                title: "Artisan Loom Listing",
                desc: "Weavers log yarns, dye types, and loom hours. Upon completion, a Geographical Indication certificate is verified."
              },
              {
                step: "02",
                title: "Polygon Block Minting",
                desc: "An immutable verification hash is created on-chain containing artisan details, wallet address, and fabric parameters."
              },
              {
                step: "03",
                title: "Secure QR Passport Scan",
                desc: "Scan the product's QR tag with your mobile camera to instantly review details on the Polygon blockchain ledger."
              }
            ].map((st, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-4 bg-white px-6">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-md border-4 border-white">
                  {st.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{st.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED ARTISANS SECTION */}
      <section className="py-20 border-b border-border bg-[#F5F3EF]/30">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">The Craftspeople</span>
              <h2 className="text-3xl font-serif font-semibold text-foreground">Master Weavers Spotlight</h2>
              <p className="text-sm text-muted-foreground max-w-xl">
                We verify and showcase artisans preserving decades of generational knowledge.
              </p>
            </div>
            <Link href="/stories" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover group">
              <span>Read Weaver Stories</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtisans.map(artisan => (
              <div key={artisan.id} className="bg-white border border-border rounded-lg p-6 hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border">
                      <Image 
                        src="/assets/images/weaver-portrait.png"
                        alt={artisan.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-foreground text-base leading-tight">{artisan.name}</h3>
                        <ShieldCheck size={16} className="text-success fill-success/10" />
                      </div>
                      <p className="text-xs text-muted-foreground">{artisan.craft}</p>
                      <p className="text-[10px] text-primary bg-primary-light px-2 py-0.5 rounded-full inline-block font-semibold mt-1">
                        {artisan.generation}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {artisan.region.split(',')[0]}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {artisan.experience} exp</span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {artisan.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {artisan.specialties.map(spec => (
                      <span key={spec} className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-semibold">{artisan.productsCount} listed products</span>
                  <Link href={`/artisan/${artisan.id}`} className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1">
                    <span>View Profile</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TRADITIONAL CRAFT CATEGORIES */}
      <section className="py-20 border-b border-border bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Diverse Heritages</span>
            <h2 className="text-3xl font-serif font-semibold text-foreground">Traditional Craft Categories</h2>
            <p className="text-sm text-muted-foreground">
              Shop directly from India's regional craft clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Banarasi Silk", region: "Varanasi, UP", count: 12, img: "product-banarasi.png", slug: "banarasi-silk" },
              { name: "Kanjivaram Silk", region: "Kanchipuram, TN", count: 8, img: "product-kanjivaram.png", slug: "kanjivaram" },
              { name: "Chanderi Weaves", region: "Ashoknagar, MP", count: 6, img: "product-chanderi.png", slug: "chanderi" },
              { name: "Pochampally Ikat", region: "Pochampally, TS", count: 9, img: "product-ikat.png", slug: "ikat" },
              { name: "Kashmiri Pashmina", region: "Srinagar, JK", count: 5, img: "product-pashmina.png", slug: "pashmina" },
              { name: "Bengal Jamdani", region: "Nadia, WB", count: 7, img: "product-jamdani.png", slug: "jamdani" },
              { name: "Handspun Khadi", region: "Patan, GJ", count: 11, img: "product-khadi.png", slug: "khadi" },
              { name: "Patan Patola", region: "Patan, GJ", count: 4, img: "product-patola.png", slug: "patola" }
            ].map(cat => (
              <Link 
                href={`/marketplace?cat=${cat.slug}`}
                key={cat.name}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-border shadow-sm"
              >
                <Image 
                  src={`/assets/images/${cat.img}`}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-serif font-semibold text-lg">{cat.name}</h3>
                  <p className="text-xs text-white/70">{cat.region}</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded text-white text-xs font-semibold">
                  {cat.count} Items
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. AI STORYTELLING SHOWCASE */}
      <section className="py-20 border-b border-border bg-[#F5F3EF]/30">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">AI Weaver Stories</span>
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">Preserving Heritage via AI Storytelling</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We leverage large language models to help weavers describe their intricate process, family histories, and regional design meanings—sharing ancient knowledge with conscious consumers globally.
            </p>
            
            <div className="flex flex-col gap-3">
              {mockStories.map((story, i) => (
                <button
                  key={story.slug}
                  onClick={() => setActiveStoryIdx(i)}
                  className={`flex items-center gap-4 p-3 rounded-lg border text-left transition-all ${
                    activeStoryIdx === i
                      ? 'border-primary bg-primary-light/50 text-foreground'
                      : 'border-border bg-white text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-secondary relative overflow-hidden flex-shrink-0">
                    <Image src="/assets/images/weaver-portrait.png" alt={story.artisanName} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{story.artisanName}</h4>
                    <p className="text-xs line-clamp-1">{story.title}</p>
                  </div>
                </button>
              ))}
            </div>
            
            <Link 
              href={`/stories/${activeStory.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover group"
            >
              <span>Read Full Digital Storybook</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="lg:col-span-7 bg-white border border-border rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
            <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden">
              <Image 
                src={activeStory.coverImage}
                alt={activeStory.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-wider bg-primary px-2.5 py-1 rounded font-semibold">{activeStory.region}</span>
                <h3 className="text-lg sm:text-xl font-serif font-semibold mt-2">{activeStory.title}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-foreground/80 leading-relaxed italic border-l-2 border-primary pl-4">
                &ldquo;{activeStory.excerpt}&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-4">
                {activeStory.content}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
              {activeStory.craftProcess.slice(0, 3).map((pr, i) => (
                <div key={i} className="text-xs space-y-1 bg-secondary/50 p-2.5 rounded">
                  <span className="font-bold text-primary">{pr.step}</span>
                  <h4 className="font-semibold text-foreground leading-tight line-clamp-1">{pr.title}</h4>
                  <p className="text-[10px] text-muted-foreground line-clamp-2">{pr.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. CUSTOMER TESTIMONIALS */}
      <section className="py-20 border-b border-border bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Trusted Reviews</span>
            <h2 className="text-3xl font-serif font-semibold text-foreground">Loved by Collectors Globally</h2>
            <p className="text-sm text-muted-foreground">
              What conscious fashion lovers say about their LoomLedger acquisitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The transparency is incredible. I scanned the QR tag on my crimson Banarasi silk and saw Ramesh's workshop photos, silk yarn batch counts, and Polygon transaction log. A pure masterpiece.",
                author: "Anjali Mehta",
                role: "Heritage Saree Collector, Mumbai",
                rating: 5
              },
              {
                quote: "Finally, a way to protect authentic weavers from cheap powerloom replicas. The Kanjivaram Korvai joins are crisp and gorgeous. Direct payment to the weaver wallet is a stellar step.",
                author: "Dr. Meenakshi Iyer",
                role: "Cultural Historian, Chennai",
                rating: 5
              },
              {
                quote: "A pashmina shawl that is actually hand-spun cashmere. The Sozni detail is mind-bogglingly fine. The digital GI verification tag gives complete peace of mind.",
                author: "Sophie Dubois",
                role: "Sustainable Fashion Director, Paris",
                rating: 5
              }
            ].map((t, i) => (
              <div key={i} className="bg-secondary/40 border border-border p-8 rounded-lg space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-0.5 text-accent">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} size={16} fill="currentColor" className="stroke-none" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-border-strong/40">
                  <h4 className="font-semibold text-sm text-foreground">{t.author}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. STATISTICS SECTION */}
      <section className="py-16 bg-[#2D3A5C] text-white">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl lg:text-5xl font-bold font-serif text-accent">3,200+</p>
            <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mt-1">Artisans On-boarded</p>
          </div>
          <div>
            <p className="text-4xl lg:text-5xl font-bold font-serif text-accent">12.4K+</p>
            <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mt-1">Verified Passports</p>
          </div>
          <div>
            <p className="text-4xl lg:text-5xl font-bold font-serif text-accent">₹1.8Cr+</p>
            <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mt-1">Direct Artisan Income</p>
          </div>
          <div>
            <p className="text-4xl lg:text-5xl font-bold font-serif text-accent">98.4%</p>
            <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mt-1">Authenticity Score</p>
          </div>
        </div>
      </section>

      {/* 11. PARTNER ORGANIZATIONS */}
      <section className="py-12 border-b border-border bg-white text-center">
        <div className="container">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6">Our Supporting Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-60">
            <span className="font-serif font-bold text-lg text-foreground/80">Ministry of Textiles, Govt. of India</span>
            <span className="font-serif font-bold text-lg text-foreground/80">GI Registry India</span>
            <span className="font-serif font-bold text-lg text-foreground/80">Handloom Export Promotion Council</span>
            <span className="font-serif font-bold text-lg text-foreground/80">Silk Mark Authority of India</span>
          </div>
        </div>
      </section>

      {/* 12. FAQ SECTION */}
      <section className="py-20 border-b border-border bg-white">
        <div className="container container--narrow">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Clear Information</span>
            <h2 className="text-3xl font-serif font-semibold text-foreground">Frequently Asked Questions</h2>
            <p className="text-sm text-muted-foreground">
              Learn how we run verification, blockchain registry, and direct pay out integrations.
            </p>
          </div>

          <div className="space-y-4">
            {mockFaqs.map((faq, idx) => (
              <div key={idx} className="border border-border rounded-lg overflow-hidden bg-secondary/30">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-sm sm:text-base text-foreground bg-white hover:bg-secondary/20 transition-all"
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={16} 
                    className={`text-muted-foreground transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 border-t border-border text-sm text-muted-foreground leading-relaxed bg-white">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. CALL TO ACTION SECTION */}
      <section className="py-20 bg-primary text-white text-center relative overflow-hidden">
        {/* Background decorative vector */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        
        <div className="container max-w-2xl relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold leading-tight">
            Protect and Collect Authentic Handloom
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-lg mx-auto leading-relaxed">
            Support rural weavers directly. Shop certified double-ikat Patola, Banarasi silk, and Pashmina with instant blockchain verify tools.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/marketplace" className="px-6 py-3 bg-white text-primary font-bold rounded-md hover:bg-secondary transition-all shadow-lg">
              Shop Marketplace
            </Link>
            <Link href="/signup" className="px-6 py-3 bg-indigo text-white border border-white/20 font-bold rounded-md hover:bg-indigo-hover transition-all">
              Register as Artisan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
