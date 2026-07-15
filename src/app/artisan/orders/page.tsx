"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Package, ShoppingBag, BarChart3, TrendingUp, Settings, LogOut, 
  ShieldCheck, ArrowLeft, Truck, Check, RefreshCw 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';

export default function ArtisanOrdersPage() {
  const router = useRouter();
  const { user, logout, orders, artisans } = useApp();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'artisan') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user]);

  if (!user) return null;

  const currentArtisan = artisans.find(a => a.id === user.id) || artisans[0];
  const artisanOrders = orders.filter(o => o.artisanId === user.id);

  const handleUpdateStatus = (orderId: string, nextStatus: 'Shipped' | 'Delivered') => {
    setUpdatingId(orderId);
    setTimeout(() => {
      setUpdatingId(null);
      const updatedOrders = orders.map(ord => {
        if (ord.id === orderId) {
          const nowStr = new Date().toISOString().split('T')[0];
          return {
            ...ord,
            status: nextStatus,
            timeline: [
              ...ord.timeline,
              { status: nextStatus, date: nowStr, note: `Status updated to ${nextStatus} by weaver.` }
            ]
          };
        }
        return ord;
      });
      // Store updated orders back in context
      if (typeof window !== 'undefined') {
        localStorage.setItem('ll_orders', JSON.stringify(updatedOrders));
      }
      // Re-trigger state sync
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-background flex-grow">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-white border-r border-border p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary border border-border shrink-0">
              <Image src="/assets/images/weaver-portrait.png" alt={user.name} fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="font-semibold text-sm text-foreground leading-tight">{user.name}</p>
                {currentArtisan?.verified && <ShieldCheck size={14} className="text-success" />}
              </div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-0.5">{currentArtisan?.craft}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: BarChart3, path: '/artisan/dashboard' },
              { id: 'products', label: 'My Products', icon: Package, path: '/artisan/products' },
              { id: 'orders', label: 'Orders Received', icon: ShoppingBag, path: '/artisan/orders' },
              { id: 'analytics', label: 'Sales Analytics', icon: TrendingUp, path: '/artisan/analytics' },
              { id: 'settings', label: 'Settings', icon: Settings, path: '/artisan/settings' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-md transition-colors text-left ${
                  item.id === 'orders'
                    ? 'bg-primary-light text-primary font-bold'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={() => { logout(); router.push('/login'); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-error hover:bg-error-light/30 rounded-md transition-colors text-left mt-6"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-6 sm:p-10 max-w-5xl space-y-8">
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-serif font-semibold text-foreground">Customer Orders Received</h1>
            <p className="text-xs text-muted-foreground">Monitor delivery timetables, verify payouts, and edit shipping states on-chain.</p>
          </div>

          {artisanOrders.length === 0 ? (
            <div className="bg-white border border-border p-16 rounded-xl text-center space-y-4 shadow-sm">
              <span className="text-3xl">🛍️</span>
              <h3 className="font-semibold text-foreground">No Orders Received</h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">Orders will automatically populate once customers buy from your marketplace catalog.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {artisanOrders.map(order => (
                <div 
                  key={order.id}
                  className="bg-white border border-border rounded-lg p-5 sm:p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start justify-between"
                >
                  <div className="flex gap-4 items-start flex-grow">
                    <div className="relative w-16 h-20 rounded overflow-hidden bg-secondary border border-border shrink-0">
                      <Image src={`/assets/images/${order.productImage}`} alt={order.productName} fill className="object-cover" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">{order.id}</span>
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
                      
                      <h3 className="font-serif font-semibold text-foreground text-sm sm:text-base leading-tight">
                        {order.productName}
                      </h3>
                      
                      <p className="text-xs text-muted-foreground">Buyer: {order.buyerName}</p>
                      <p className="text-xs text-muted-foreground">Order Date: {order.date}</p>
                      
                      <div className="pt-2">
                        <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wide block">Blockchain Shipment Hash</span>
                        <code className="text-[10px] font-mono text-primary select-all break-all block mt-0.5">
                          {order.blockchainTxHash || "0xPolygonTxHashMock"}
                        </code>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex md:flex-col justify-between items-end gap-3 self-stretch border-t md:border-t-0 border-border pt-4 md:pt-0">
                    <div className="text-right">
                      <span className="text-[10px] text-muted-foreground block">Payout Amount</span>
                      <span className="font-bold text-foreground text-base">₹{order.amount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex gap-2">
                      {order.status === 'Processing' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'Shipped')}
                          disabled={updatingId === order.id}
                          className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-1 shadow disabled:opacity-50"
                        >
                          {updatingId === order.id ? (
                            <RefreshCw size={12} className="animate-spin" />
                          ) : (
                            <Truck size={12} />
                          )}
                          <span>Ship Saree</span>
                        </button>
                      )}
                      
                      {order.status === 'Shipped' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'Delivered')}
                          disabled={updatingId === order.id}
                          className="px-3 py-1.5 bg-success text-white text-xs font-semibold rounded hover:bg-success-hover flex items-center gap-1 shadow disabled:opacity-50"
                        >
                          {updatingId === order.id ? (
                            <RefreshCw size={12} className="animate-spin" />
                          ) : (
                            <Check size={12} />
                          )}
                          <span>Mark Delivered</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
