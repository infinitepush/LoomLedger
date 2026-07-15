"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Search, Heart, ShieldCheck, SlidersHorizontal, Eye, X, ArrowUpDown, RefreshCcw, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Product } from '@/data/mockData';
import Badge from '@/components/ui/Badge';
import VerificationBadge from '@/components/ui/VerificationBadge';

const sortOptions = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' }
];

function MarketplaceContent() {
  const { products, addToCart, toggleWishlist, isWishlisted } = useApp();
  const searchParams = useSearchParams();
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceMax, setPriceMax] = useState(60000);
  const [onlyGi, setOnlyGi] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  
  // Quick View State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync with searchParams from landing page links
  useEffect(() => {
    const cat = searchParams.get('cat');
    const search = searchParams.get('search');
    if (cat) setSelectedCategory(cat);
    if (search) setSearchTerm(search);
  }, [searchParams]);

  // Categories list derived from products
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return ['all', ...Array.from(set)];
  }, [products]);

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.weaver.name.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.categorySlug === selectedCategory || p.category === selectedCategory);
    }

    // Price filter
    result = result.filter(p => p.price <= priceMax);

    // GI certified filter
    if (onlyGi) {
      result = result.filter(p => p.giCertified);
    }

    // Verified filter
    if (onlyVerified) {
      result = result.filter(p => p.verified);
    }

    // Sort logic
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchTerm, selectedCategory, priceMax, onlyGi, onlyVerified, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceMax(60000);
    setOnlyGi(false);
    setOnlyVerified(false);
    setSortBy('recommended');
  };

  return (
    <div className="py-8 bg-background flex-grow">
      <div className="container">
        
        {/* Page header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-serif font-semibold text-foreground">Handloom Marketplace</h1>
          <p className="text-sm text-muted-foreground">Shop directly from registered artisans. Blockchain-secured Digital Passports accompany every listing.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch lg:items-center justify-between">
          <div className="relative flex-grow max-w-xl">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products, weavers, styles, states..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-border rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-white border border-border text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={resetFilters} 
              className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md text-xs font-semibold text-muted-foreground hover:bg-secondary transition-colors"
            >
              <RefreshCcw size={12} />
              <span>Reset</span>
            </button>
            
            <span className="text-sm text-muted-foreground font-medium bg-secondary px-3 py-1.5 rounded-md">
              {filteredProducts.length} items
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3 bg-white border border-border rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <SlidersHorizontal size={18} className="text-primary" />
              <h2 className="font-semibold text-sm uppercase tracking-wider text-foreground">Filters</h2>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">Category</h3>
              <div className="flex flex-col gap-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === 'all' ? 'all' : cat)}
                    className={`text-left text-sm py-1 px-2 rounded transition-colors ${
                      (cat === 'all' && selectedCategory === 'all') || (cat !== 'all' && selectedCategory === cat)
                        ? 'bg-primary-light text-primary font-semibold'
                        : 'text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    {cat === 'all' ? 'All Craft Categories' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">Max Price</h3>
                <span className="text-xs font-semibold text-primary">₹{priceMax.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="60000"
                step="1000"
                value={priceMax}
                onChange={e => setPriceMax(Number(e.target.value))}
                className="w-full accent-primary bg-secondary h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>₹2,000</span>
                <span>₹60,000</span>
              </div>
            </div>

            {/* GI Certification & Blockchain status */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">Certification</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyGi}
                    onChange={e => setOnlyGi(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                  />
                  <span>GI Certified only</span>
                </label>
                <label className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyVerified}
                    onChange={e => setOnlyVerified(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                  />
                  <span>Blockchain Verified</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-border rounded-lg p-16 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl mx-auto">🧶</div>
                <h3 className="text-lg font-semibold text-foreground">No Products Found</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">We couldn't find any products matching your specific combinations. Try resetting filters.</p>
                <button onClick={resetFilters} className="px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded hover:bg-primary-hover transition-colors">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <article key={product.id} className="group bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
                    <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
                      <Image
                        src={`/assets/images/${product.image}`}
                        alt={product.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                      
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.giCertified && (
                          <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
                            GI Certified
                          </span>
                        )}
                        {product.verified && (
                          <span className="bg-success text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow flex items-center gap-1">
                            <ShieldCheck size={12} />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`absolute top-3 right-3 w-8.5 h-8.5 rounded-full bg-white/90 shadow flex items-center justify-center text-muted-foreground hover:text-error transition-all ${
                          isWishlisted(product.id) ? 'text-error' : ''
                        }`}
                      >
                        <Heart size={16} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
                      </button>

                      {/* Quick view button overlay */}
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 text-foreground hover:bg-primary hover:text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                      >
                        <Eye size={12} />
                        <span>Quick View</span>
                      </button>
                    </div>

                    <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
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

                      <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-base font-bold text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-muted-foreground line-through ml-2">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="text-xs bg-primary-light text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-md font-semibold transition-all"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-border w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground shadow"
            >
              <X size={16} />
            </button>

            <div className="relative w-full md:w-1/2 aspect-[3/4] md:aspect-auto md:h-full bg-secondary min-h-[300px]">
              <Image
                src={`/assets/images/${quickViewProduct.image}`}
                alt={quickViewProduct.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 md:w-1/2 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="indigo" size="xs">{quickViewProduct.category}</Badge>
                  {quickViewProduct.verified && <VerificationBadge size="sm" />}
                </div>

                <h3 className="font-serif font-semibold text-lg text-foreground">{quickViewProduct.name}</h3>
                <p className="text-xs text-muted-foreground">Crafted by {quickViewProduct.weaver.name} in {quickViewProduct.region}</p>
                <p className="text-xs text-foreground/80 leading-relaxed line-clamp-4">{quickViewProduct.description}</p>
                
                <div className="grid grid-cols-2 gap-4 bg-secondary/50 p-3 rounded-md text-xs">
                  <div>
                    <span className="text-muted-foreground block">Craft Time</span>
                    <span className="font-semibold text-foreground">{quickViewProduct.craftTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Fabric</span>
                    <span className="font-semibold text-foreground">{quickViewProduct.fabric}</span>
                  </div>
                </div>

                <div className="text-xl font-bold text-foreground">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex gap-3">
                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="flex-grow py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded hover:bg-primary-hover transition-colors text-center"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    toggleWishlist(quickViewProduct);
                  }}
                  className={`w-11 h-11 border border-border rounded flex items-center justify-center text-muted-foreground hover:text-error hover:border-error transition-all ${
                    isWishlisted(quickViewProduct.id) ? 'text-error border-error' : ''
                  }`}
                >
                  <Heart size={18} fill={isWishlisted(quickViewProduct.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <React.Suspense fallback={<div className="py-20 text-center text-xs text-muted-foreground">Loading Marketplace...</div>}>
      <MarketplaceContent />
    </React.Suspense>
  );
}
