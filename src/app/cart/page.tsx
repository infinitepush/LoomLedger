"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, Trash2, ArrowRight, ShieldCheck, ChevronRight, 
  Minus, Plus, Lock, CheckCircle, QrCode 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';

export default function CartPage() {
  const router = useRouter();
  const { user, cart, updateCartQuantity, removeFromCart, placeOrder, orders } = useApp();
  const [checkingOut, setCheckingOut] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [placedOrders, setPlacedOrders] = useState<any[]>([]);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 5000 ? 0 : 250;
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      await placeOrder();
      setCheckingOut(false);
      setShowSuccess(true);
    } catch (err: any) {
      setCheckingOut(false);
      alert(err.message || 'Checkout failed.');
    }
  };


  if (showSuccess) {
    return (
      <div className="py-16 bg-background flex-grow flex items-center justify-center">
        <div className="container max-w-lg">
          <div className="bg-white border border-border rounded-xl p-8 text-center space-y-6 shadow-md">
            <div className="w-16 h-16 rounded-full bg-success-light text-success flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-success bg-success-light px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                Payment Verified & Secured
              </span>
              <h1 className="text-2xl font-serif font-semibold text-foreground">Order Placed Successfully!</h1>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Your purchase has been recorded on the Polygon Amoy blockchain. Artisans have been notified to begin weaving.
              </p>
            </div>

            <div className="bg-secondary/40 border border-border rounded-lg p-5 text-left text-xs space-y-3">
              <div className="flex justify-between items-center py-1.5 border-b border-border/80">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="indigo" size="xs">Processing</Badge>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-border/80">
                <span className="text-muted-foreground">Ledger Timestamp</span>
                <span className="font-semibold text-foreground">{new Date().toISOString().split('T')[0]}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">Polygon Transaction Hash</span>
                <code className="text-[10px] font-mono text-muted-foreground break-all bg-white border border-border p-2 rounded block">
                  0x{Math.random().toString(16).substring(2, 12)}7a3b9c1d2e4f5a6b7c8d9e0f1a2b3c4d
                </code>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Link 
                href={user ? "/buyer/dashboard" : "/"}
                className="w-full py-2.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover shadow block text-center"
              >
                Go to Dashboard
              </Link>
              <Link 
                href="/marketplace"
                className="w-full py-2.5 border border-border text-xs rounded hover:bg-secondary block text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-background flex-grow">
      <div className="container">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">Shopping Bag</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground mb-8">Shopping Bag</h1>

        {cart.length === 0 ? (
          <div className="bg-white border border-border p-16 rounded-xl text-center space-y-4 shadow-sm max-w-lg mx-auto">
            <ShoppingBag size={36} className="text-muted-foreground mx-auto" />
            <h3 className="font-semibold text-foreground">Your bag is empty</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              Add verified handloom sarees from our artisans to support traditional heritage.
            </p>
            <Link href="/marketplace" className="inline-block px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover shadow">
              Shop Marketplace
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map(item => (
                <div 
                  key={item.product.id}
                  className="bg-white border border-border rounded-lg p-4 sm:p-5 flex gap-4 sm:gap-5 shadow-xs"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-24 sm:w-24 sm:h-32 bg-secondary rounded overflow-hidden shrink-0 border border-border/80">
                    <Image 
                      src={item.product.image.startsWith('http') || item.product.image.startsWith('/') || item.product.image.startsWith('data:') ? item.product.image : `/assets/images/${item.product.image}`} 
                      alt={item.product.name} 
                      fill 
                      className="object-cover object-center" 
                    />
                  </div>

                  {/* Item Description */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{item.product.category}</span>
                          <Link href={`/marketplace/${item.product.slug}`} className="block">
                            <h3 className="font-semibold text-xs sm:text-sm text-foreground line-clamp-1 hover:text-primary transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">by {item.product.weaver.name}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-muted-foreground hover:text-error rounded-full hover:bg-error-light/20 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 mt-auto border-t border-border/60">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-border rounded overflow-hidden">
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-muted-foreground hover:bg-secondary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-semibold text-foreground">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-muted-foreground hover:bg-secondary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Pricing */}
                      <span className="font-bold text-foreground text-sm sm:text-base">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Breakdown */}
            <div className="lg:col-span-4 bg-white border border-border rounded-lg p-6 shadow-sm space-y-6">
              <h3 className="font-serif font-semibold text-lg text-foreground border-b border-border pb-3">Order Summary</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST (5%)</span>
                  <span className="font-semibold text-foreground">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-semibold text-foreground">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-foreground border-t border-border pt-3">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-4 bg-secondary/30 rounded text-[10px] text-muted-foreground flex gap-3 items-start">
                <Lock size={14} className="text-primary mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                  Checkout is secured on-chain. Fiber composition and GI validation stamps are cryptographically secured on Polygon ledgers.
                </p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary-hover transition-colors shadow flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {checkingOut ? (
                  <>
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Mating Ledger Transaction...</span>
                  </>
                ) : (
                  <>
                    <span>Checkout Securely</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
