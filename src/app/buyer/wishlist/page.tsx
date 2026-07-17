"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, ChevronLeft, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function BuyerWishlistPage() {
  const router = useRouter();
  const { user, wishlist, addToCart, toggleWishlist } = useApp();

  React.useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

  if (!user) return null;

  return (
    <div className="py-8 bg-background flex-grow">
      <div className="container max-w-4xl space-y-6">
        <Link href="/buyer/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
          <ChevronLeft size={14} />
          <span>Back to Account Dashboard</span>
        </Link>

        <div className="space-y-1">
          <h1 className="text-2xl font-serif font-semibold text-foreground">My Wishlist</h1>
          <p className="text-xs text-muted-foreground">Save items you love and move them directly to your shopping cart.</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white border border-border p-16 rounded-lg text-center space-y-4 shadow-sm">
            <Heart size={32} className="text-muted-foreground mx-auto" />
            <h3 className="font-semibold text-foreground">Wishlist is Empty</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">Explore categories and click the heart icon on any saree to save it for later.</p>
            <Link href="/marketplace" className="inline-block px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover shadow">
              Shop Marketplace
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {wishlist.map(product => (
              <div key={product.id} className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-sm transition-shadow flex">
                <div className="relative w-24 sm:w-28 bg-secondary shrink-0">
                  <Image 
                    src={product.image.startsWith('http') || product.image.startsWith('/') || product.image.startsWith('data:') ? product.image : `/assets/images/${product.image}`} 
                    alt={product.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold block">{product.category}</span>
                    <Link href={`/marketplace/${product.slug}`} className="block font-semibold text-xs sm:text-sm text-foreground line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                    <span className="text-sm font-bold text-foreground block">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex gap-2 mt-4 pt-3 border-t border-border/60">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-grow py-1.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors flex items-center justify-center gap-1"
                    >
                      <ShoppingBag size={12} />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="p-1.5 border border-border rounded hover:bg-error-light/30 hover:text-error text-muted-foreground transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
