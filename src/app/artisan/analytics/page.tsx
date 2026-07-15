"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Package, ShoppingBag, BarChart3, TrendingUp, Settings, LogOut, 
  ShieldCheck, ArrowLeft, DollarSign, Eye, Award, Star 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';

export default function ArtisanAnalyticsPage() {
  const router = useRouter();
  const { user, logout, products, orders, artisans } = useApp();

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'artisan') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user]);

  if (!user) return null;

  const currentArtisan = artisans.find(a => a.id === user.id) || artisans[0];
  const artisanProducts = products.filter(p => p.weaver.id === user.id);
  const artisanOrders = orders.filter(o => o.artisanId === user.id);
  const deliveredOrders = artisanOrders.filter(o => o.status === 'Delivered');

  const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.amount, 0);

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
                  item.id === 'analytics'
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
            <h1 className="text-2xl font-serif font-semibold text-foreground">Sales & Craft Analytics</h1>
            <p className="text-xs text-muted-foreground">Detailed metrics of your digital storefront transactions and audience views.</p>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-border p-5 rounded-lg flex items-center gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-md bg-success-light text-success flex items-center justify-center shrink-0">
                <DollarSign size={20} />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">On-Chain Earnings</span>
                <span className="text-xl font-bold text-foreground mt-0.5 block">₹{totalRevenue.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="bg-white border border-border p-5 rounded-lg flex items-center gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-md bg-indigo-light text-indigo flex items-center justify-center shrink-0">
                <ShoppingBag size={20} />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">Total Sales</span>
                <span className="text-xl font-bold text-foreground mt-0.5 block">{deliveredOrders.length} items</span>
              </div>
            </div>

            <div className="bg-white border border-border p-5 rounded-lg flex items-center gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-md bg-accent-light text-accent flex items-center justify-center shrink-0">
                <Star size={20} className="fill-accent/15" />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">Average Rating</span>
                <span className="text-xl font-bold text-foreground mt-0.5 block">{currentArtisan.rating || 5.0} / 5.0</span>
              </div>
            </div>
          </div>

          {/* Charts/Visual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-border rounded-lg p-6 space-y-6 shadow-sm">
              <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider border-b border-border pb-3">Monthly Distribution</h3>
              
              {/* Graphic bars mock */}
              <div className="h-44 flex items-end justify-between pt-4 max-w-sm mx-auto">
                {[
                  { month: 'Jan', value: 45000 },
                  { month: 'Feb', value: 38000 },
                  { month: 'Mar', value: 52000 },
                  { month: 'Apr', value: 65000 },
                  { month: 'May', value: 80000 },
                  { month: 'Jun', value: totalRevenue || 70000 }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <span className="text-[9px] text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{(item.value / 1000).toFixed(0)}k
                    </span>
                    <div 
                      className="bg-primary hover:bg-primary-hover w-8 sm:w-10 rounded-t-sm transition-all duration-500" 
                      style={{ height: `${(item.value / 100000) * 140}px` }} 
                    />
                    <span className="text-[10px] text-muted-foreground font-semibold">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-border rounded-lg p-6 space-y-6 shadow-sm">
              <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider border-b border-border pb-3">Top Products Performance</h3>
              
              <div className="space-y-4">
                {artisanProducts.slice(0, 3).map((prod, idx) => (
                  <div key={prod.id} className="flex items-center justify-between gap-4 text-xs">
                    <div className="flex gap-2.5 items-center overflow-hidden">
                      <span className="font-bold text-muted-foreground w-4">#{idx + 1}</span>
                      <div className="relative w-8 h-10 rounded overflow-hidden bg-secondary shrink-0">
                        <Image src={`/assets/images/${prod.image}`} alt={prod.name} fill className="object-cover" />
                      </div>
                      <span className="font-semibold text-foreground line-clamp-1">{prod.name}</span>
                    </div>
                    <span className="font-bold text-foreground shrink-0">₹{prod.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
