"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Package, ChevronLeft, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';

export default function BuyerOrdersPage() {
  const router = useRouter();
  const { user, orders } = useApp();

  React.useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

  if (!user) return null;

  const buyerOrders = orders.filter(o => o.buyerId === user.id);

  return (
    <div className="py-8 bg-background flex-grow">
      <div className="container max-w-4xl space-y-6">
        <Link href="/buyer/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
          <ChevronLeft size={14} />
          <span>Back to Account Dashboard</span>
        </Link>

        <div className="space-y-1">
          <h1 className="text-2xl font-serif font-semibold text-foreground">My Orders</h1>
          <p className="text-xs text-muted-foreground">Track and review all purchase histories and blockchain ledger records.</p>
        </div>

        {buyerOrders.length === 0 ? (
          <div className="bg-white border border-border p-16 rounded-lg text-center space-y-4 shadow-sm">
            <span className="text-3xl">🛍️</span>
            <h3 className="font-semibold text-foreground">No Orders Placed</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">Browse the marketplace and discover authenticated handloom items to place your first order.</p>
            <Link href="/marketplace" className="inline-block px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover shadow">
              Shop Marketplace
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {buyerOrders.map(order => (
              <div key={order.id} className="bg-white border border-border rounded-lg p-5 sm:p-6 space-y-4 shadow-sm">
                
                {/* Top Panel */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4 text-xs">
                  <div>
                    <span className="text-muted-foreground font-semibold">Order ID: </span>
                    <code className="font-mono text-primary font-bold">{order.id}</code>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-semibold">Ordered: </span>
                    <span className="text-foreground font-medium">{order.date}</span>
                  </div>
                  <div>
                    <Badge
                      variant={
                        order.status === 'Delivered' ? 'success' :
                        order.status === 'Shipped' ? 'indigo' : 'warning'
                      }
                      size="xs"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>

                {/* Details */}
                <div className="flex gap-4 items-center">
                  <div className="relative w-14 h-20 rounded overflow-hidden bg-secondary shrink-0">
                    <Image src={`/assets/images/${order.productImage}`} alt={order.productName} fill className="object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold text-sm text-foreground line-clamp-1">{order.productName}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">by {order.artisanName}</p>
                    <span className="text-sm font-bold text-foreground mt-2 block">₹{order.amount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Blockchain block if delivered */}
                {order.status === 'Delivered' && order.blockchainTxHash && (
                  <div className="bg-success-light/45 border border-success/15 rounded p-3 text-xs flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-success font-semibold">
                      <ShieldCheck size={16} />
                      <span>Polygon Amoy Transaction Logged</span>
                    </div>
                    <code className="text-[10px] font-mono text-muted-foreground break-all">{order.blockchainTxHash}</code>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
