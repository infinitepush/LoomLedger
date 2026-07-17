"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, ChevronRight, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, addToCart, toggleWishlist } = useApp();

  return (
    <div className="py-8 bg-background flex-grow">
      <div className="container">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">Wishlist</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground mb-8">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="bg-white border border-border p-16 rounded-xl text-center space-y-4 shadow-sm max-w-lg mx-auto">
            <Heart size={36} className="text-muted-foreground mx-auto" />
            <h3 className="font-semibold text-foreground">Wishlist is empty</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              Save verified items you love here to easily purchase them later.
            </p>
            <Link href="/marketplace" className="inline-block px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover shadow">
              Shop Marketplace
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map(product => (
              <div 
                key={product.id} 
                className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-xs transition-shadow flex flex-col justify-between h-full"
              >
                <div className="relative aspect-[3/4] bg-secondary border-b border-border">
                  <Image 
                    src={product.image.startsWith('http') || product.image.startsWith('/') || product.image.startsWith('data:') ? product.image : `/assets/images/${product.image}`} 
                    alt={product.name} 
                    fill 
                    className="object-cover" 
                  />
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 w-8.5 h-8.5 rounded-full bg-white/90 shadow flex items-center justify-center text-error transition-all"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{product.category}</span>
                    <Link href={`/marketplace/${product.slug}`} className="block font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </Link>
                    <span className="text-sm font-bold text-foreground block mt-1">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag size={12} />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
