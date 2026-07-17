"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Share2,
  Truck,
  RotateCcw,
  Award,
  QrCode,
  Globe,
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';
import VerificationBadge from '@/components/ui/VerificationBadge';

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { products, addToCart, toggleWishlist, isWishlisted } = useApp();

  const product = useMemo(() => {
    return products.find(p => p.slug === slug) || products[0];
  }, [products, slug]);

  const [activeImage, setActiveImage] = useState(product?.image || 'product-banarasi.png');
  const [showCertificate, setShowCertificate] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2>Product not found</h2>
        <Link href="/marketplace" className="text-primary font-bold">Back to Marketplace</Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  
  // Related products
  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-8 bg-background">
      <div className="container">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={12} />
          <Link href="/marketplace" className="hover:text-primary">Marketplace</Link>
          <ChevronRight size={12} />
          <Link href={`/marketplace?cat=${product.categorySlug}`} className="hover:text-primary">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </nav>

        {/* Product presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-border bg-secondary">
              <Image
                src={activeImage.startsWith('http') || activeImage.startsWith('/') || activeImage.startsWith('data:') ? activeImage : `/assets/images/${activeImage}`}
                alt={product.name}
                fill
                className="object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {product.verified && (
                  <span className="bg-success-light text-success text-[10px] font-bold px-3 py-1 rounded shadow flex items-center gap-1 border border-success/20">
                    <ShieldCheck size={12} />
                    <span>Blockchain Verified</span>
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-24 rounded border overflow-hidden flex-shrink-0 bg-secondary ${
                      activeImage === img ? 'border-primary ring-1 ring-primary' : 'border-border'
                    }`}
                  >
                    <Image
                      src={img.startsWith('http') || img.startsWith('/') || img.startsWith('data:') ? img : `/assets/images/${img}`}
                      alt={`${product.name} gallery image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 flex-wrap">
              {product.verified && <VerificationBadge size="md" />}
              {product.giCertified && <Badge variant="saffron" size="sm" icon={Award}>GI Certified</Badge>}
              <Badge variant="indigo" size="sm">{product.category}</Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>by <Link href={`/artisan/${product.weaver.id}`} className="text-primary font-semibold hover:underline">{product.weaver.name}</Link></span>
              <span>·</span>
              <span className="flex items-center gap-1"><MapPin size={12} /> {product.region}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} className="stroke-accent" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviews?.length || 0} customer reviews)</span>
            </div>

            <div className="py-4 border-y border-border flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm sm:text-base text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  <Badge variant="accent" size="xs">{Math.round((1 - product.price / product.originalPrice) * 100)}% off</Badge>
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/40 border border-border p-3.5 rounded-md flex items-start gap-3">
                <Clock size={16} className="text-primary mt-0.5" />
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-semibold">Craft Time</span>
                  <span className="text-sm font-semibold text-foreground">{product.craftTime}</span>
                </div>
              </div>
              <div className="bg-secondary/40 border border-border p-3.5 rounded-md flex items-start gap-3">
                <Award size={16} className="text-primary mt-0.5" />
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-semibold">Fabric</span>
                  <span className="text-sm font-semibold text-foreground">{product.fabric}</span>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Specifications</h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-border/50">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-semibold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => addToCart(product)}
                className="flex-grow py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary-hover transition-colors shadow flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>
              
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 border border-border rounded-md flex items-center justify-center text-muted-foreground hover:text-error hover:border-error transition-all ${
                  wishlisted ? 'text-error border-error bg-error-light/35' : 'bg-white'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Assurances */}
            <div className="p-4 bg-secondary/30 rounded-lg space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Truck size={14} className="text-success" /><span>Free delivery on orders above ₹5,000</span></div>
              <div className="flex items-center gap-2"><RotateCcw size={14} className="text-success" /><span>Easy 14-day replacement scheme</span></div>
            </div>
          </div>
        </div>

        {/* Product Journey Timeline */}
        {product.timeline && product.timeline.length > 0 && (
          <div className="py-12 border-t border-border">
            <h3 className="text-xl font-serif font-semibold text-foreground mb-2">Product Provenance Journey</h3>
            <p className="text-sm text-muted-foreground mb-8">Follow the chronological craft steps logged by the weaver.</p>
            
            <div className="relative border-l-2 border-primary-light pl-6 space-y-8 ml-3">
              {product.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-primary border-4 border-white shadow-sm" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground flex items-center gap-2">
                      <span>{step.stage}</span>
                      {step.status === 'complete' && <Badge variant="success" size="xs">Verified</Badge>}
                    </h4>
                    <p className="text-xs text-muted-foreground">{step.date} · {step.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blockchain Validation Panel */}
        {product.verified && (
          <div className="py-12 border-t border-border">
            <div className="bg-success-light border border-success/15 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-left w-full md:max-w-2xl">
                <div className="flex items-center gap-2 text-success">
                  <ShieldCheck size={22} />
                  <h3 className="font-semibold text-base leading-tight">Digital Ledger Verification Pass</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  This handloom is registered on the Polygon Amoy blockchain. Proof of authenticity and artisan wallet addresses are immutable.
                </p>
                <div className="pt-2">
                  <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">Blockchain Transaction Hash</span>
                  <code className="text-xs text-foreground/80 font-mono break-all bg-white border border-border p-1.5 rounded block mt-1">
                    {product.blockchainId}
                  </code>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowCertificate(true)}
                  className="px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors shadow"
                >
                  View Digital Certificate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="py-12 border-t border-border">
            <h3 className="text-xl font-serif font-semibold text-foreground mb-8">Related Handlooms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rel => (
                <article key={rel.id} className="group border border-border rounded-lg bg-white overflow-hidden transition-all hover:shadow flex flex-col h-full">
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                    <Image
                      src={rel.image.startsWith('http') || rel.image.startsWith('/') || rel.image.startsWith('data:') ? rel.image : `/assets/images/${rel.image}`}
                      alt={rel.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground">{rel.category}</span>
                      <Link href={`/marketplace/${rel.slug}`} className="block">
                        <h4 className="font-semibold text-sm text-foreground line-clamp-1 mt-1 group-hover:text-primary transition-colors">{rel.name}</h4>
                      </Link>
                    </div>
                    <div className="pt-4 border-t border-border flex items-center justify-between mt-4">
                      <span className="font-bold text-foreground">{formatPrice(rel.price)}</span>
                      <span className="text-[10px] text-primary font-bold">View Saree</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certificate Lightbox Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-border w-full max-w-lg rounded-lg overflow-hidden shadow-2xl relative p-8 text-center space-y-6">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>

            <div className="border-4 border-double border-accent p-6 space-y-6 relative bg-[#FAFAF8]">
              {/* Authenticity Certificate Seal background mock */}
              <div className="text-xs uppercase tracking-widest text-primary font-bold border-b border-accent pb-2">
                Certificate of Authenticity
              </div>
              
              <div className="space-y-2">
                <h2 className="font-serif font-bold text-xl text-foreground">{product.name}</h2>
                <p className="text-xs text-muted-foreground font-serif italic">Gi Registry Certified Handwoven Art</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left text-xs py-4 border-y border-border/80">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Master Artisan</span>
                  <span className="font-semibold text-foreground">{product.weaver.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Origin Hub</span>
                  <span className="font-semibold text-foreground">{product.region}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Dye Composition</span>
                  <span className="font-semibold text-foreground">{product.fabric}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Passport Token ID</span>
                  <span className="font-semibold text-primary font-mono text-[10px]">{product.id}</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center pt-2 gap-3">
                <QrCode size={100} className="text-foreground p-1 border border-border rounded" />
                <span className="text-[10px] text-muted-foreground tracking-wider font-mono select-all">
                  Tx: {product.blockchainId.substring(0, 24)}...
                </span>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => {
                  alert("Digital Certificate downloaded as PDF successfully.");
                  setShowCertificate(false);
                }}
                className="px-6 py-2.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover shadow"
              >
                Download PDF
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-6 py-2.5 border border-border text-xs rounded hover:bg-secondary"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
