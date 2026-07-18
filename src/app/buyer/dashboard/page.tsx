"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Heart, Package, ShieldCheck, Star, Settings, ChevronRight, MapPin, User, LogOut, ArrowRight, FileText } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';
import VerificationBadge from '@/components/ui/VerificationBadge';

export default function BuyerDashboardPage() {
  const router = useRouter();
  const { user, logout, products, orders, wishlist, savedArtisans } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // Verify role
  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'buyer') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user]);

  if (!user) return null;

  const buyerOrders = orders.filter(o => o.buyerId === user.id);
  const recentOrders = buyerOrders.slice(0, 3);
  const recommendedProducts = products.slice(4, 7);

  // Digital Passports and Certificates purchased (mock from delivered orders)
  const purchasedCertificates = buyerOrders
    .filter(o => o.status === 'Delivered')
    .map(o => ({
      orderId: o.id,
      productName: o.productName,
      date: o.date,
      txHash: o.blockchainTxHash || "0xPolygonTxHashMock"
    }));

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-background flex-grow">
      
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white border-r border-border p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm">
              {user.name.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground leading-tight">{user.name}</p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-0.5">{user.role} workspace</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { id: 'overview', label: 'Dashboard', icon: User, path: '/buyer/dashboard' },
              { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, path: '/marketplace' },
              { id: 'orders', label: 'Orders', icon: Package, path: '/buyer/orders' },
              { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '/buyer/wishlist' },
              { id: 'settings', label: 'Settings', icon: Settings, path: '/buyer/settings' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.path !== '/buyer/dashboard') router.push(item.path);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-md transition-colors text-left ${
                  activeTab === item.id
                    ? 'bg-primary-light text-primary'
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

      {/* Main Panel */}
      <main className="flex-1 p-6 sm:p-10 max-w-5xl space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-[#2D3A5C] text-white p-6 sm:p-8 rounded-lg space-y-3 relative overflow-hidden shadow-sm">
          <div className="absolute right-0 bottom-0 opacity-10 font-serif text-[120px] pointer-events-none select-none translate-y-8 translate-x-4">LL</div>
          <h1 className="text-xl sm:text-2xl font-serif font-semibold">Namaste, {user.name}</h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-md leading-relaxed">
            Welcome to your digital vault. Explore verified handloom collections or verify passport tokens using transaction block hashes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Orders', value: buyerOrders.length, icon: Package },
            { label: 'Wishlist Items', value: wishlist.length, icon: Heart },
            { label: 'Saved Artisans', value: savedArtisans.length, icon: ShieldCheck },
            { label: 'Certificates Vault', value: purchasedCertificates.length, icon: FileText }
          ].map((stat, i) => (
            <div className="bg-white border border-border p-5 rounded-lg flex items-center gap-4 shadow-xs" key={i}>
              <div className="w-10 h-10 rounded-md bg-secondary/80 text-primary flex items-center justify-center shrink-0">
                <stat.icon size={20} />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">{stat.label}</span>
                <span className="text-xl font-bold text-foreground mt-0.5 block">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Main Column: Recent Orders & Certificates */}
          <div className="md:col-span-8 space-y-8">
            
            {/* Recent Orders */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-serif font-semibold text-lg text-foreground">Recent Orders</h3>
                <Link href="/buyer/orders" className="text-xs text-primary font-bold hover:underline flex items-center gap-0.5">
                  <span>View All Orders</span>
                  <ChevronRight size={12} />
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <div className="bg-white border border-border p-10 rounded-lg text-center space-y-3">
                  <span className="text-xl">🛍️</span>
                  <p className="text-xs text-muted-foreground">You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map(order => (
                    <div key={order.id} className="bg-white border border-border rounded-lg p-4 flex gap-4 items-center justify-between">
                      <div className="flex gap-3 items-center">
                        <div className="relative w-12 h-16 rounded overflow-hidden bg-secondary shrink-0">
                          <Image src={`/assets/images/${order.productImage}`} alt={order.productName} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-xs sm:text-sm text-foreground line-clamp-1">{order.productName}</h4>
                          <p className="text-[10px] text-muted-foreground mt-0.5">by {order.artisanName}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">Ordered on: {order.date}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="text-xs font-bold text-foreground block">₹{order.amount.toLocaleString('en-IN')}</span>
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
                  ))}
                </div>
              )}
            </div>

            {/* Purchased Certificates */}
            <div className="space-y-4">
              <h3 className="font-serif font-semibold text-lg text-foreground">Verified Certificates Vault</h3>
              
              {purchasedCertificates.length === 0 ? (
                <div className="bg-white border border-border p-10 rounded-lg text-center space-y-2">
                  <FileText size={24} className="text-muted-foreground mx-auto" />
                  <p className="text-xs text-muted-foreground">Certificates appear here once products are delivered on-chain.</p>
                </div>
              ) : (
                <div className="bg-white border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-secondary/40 border-b border-border">
                      <tr>
                        <th className="p-3">Product Name</th>
                        <th className="p-3">Date Authenticated</th>
                        <th className="p-3">Polygon Hash</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {purchasedCertificates.map(cert => (
                        <tr key={cert.orderId} className="hover:bg-secondary/20">
                          <td className="p-3 font-semibold text-foreground">{cert.productName}</td>
                          <td className="p-3 text-muted-foreground">{cert.date}</td>
                          <td className="p-3"><code className="text-[10px] font-mono text-primary select-all">{cert.txHash.substring(0, 16)}...</code></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

          {/* Right Sidebar Column: Profile Completion & Saved Artisans */}
          <div className="md:col-span-4 space-y-8">
            
            {/* Saved Delivery Address Summary Card */}
            <div className="bg-white border border-border rounded-lg p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                  <MapPin size={16} className="text-primary" />
                  <span>Shipping Address</span>
                </h3>
                <Link href="/buyer/settings" className="text-[10px] font-bold text-primary hover:underline">
                  Manage
                </Link>
              </div>

              {(() => {
                let saved: any = null;
                if (typeof window !== 'undefined') {
                  const raw = localStorage.getItem('ll_user_address');
                  if (raw) {
                    try { saved = JSON.parse(raw); } catch (e) {}
                  }
                }
                if (!saved && user.shippingAddress) saved = user.shippingAddress;

                if (!saved || !saved.shippingAddress) {
                  return (
                    <div className="space-y-2 pt-1">
                      <p className="text-xs text-muted-foreground">No default shipping address saved yet.</p>
                      <Link 
                        href="/buyer/settings" 
                        className="inline-flex items-center gap-1 text-xs font-semibold bg-primary-light text-primary px-3 py-1.5 rounded hover:bg-primary/10 transition-colors"
                      >
                        + Add Shipping Address
                      </Link>
                    </div>
                  );
                }

                return (
                  <div className="space-y-1.5 pt-1 text-xs text-muted-foreground bg-secondary/30 p-3 rounded border border-border/60">
                    <p className="font-semibold text-foreground">{saved.shippingName || user.name}</p>
                    <p className="line-clamp-2 leading-relaxed">{saved.shippingAddress || saved.addressLine}</p>
                    <p>{saved.shippingCity || saved.city}, {saved.shippingState || saved.state} - {saved.shippingPincode || saved.pincode}</p>
                    <p className="text-[10px] font-medium text-primary pt-0.5">📞 {saved.shippingPhone || user.phone}</p>
                  </div>
                );
              })()}
            </div>

            {/* Recommended Products */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider">Recommended for You</h3>
              <div className="space-y-3">
                {recommendedProducts.map(prod => (
                  <Link href={`/marketplace/${prod.slug}`} key={prod.id} className="group flex gap-3 bg-white border border-border p-2.5 rounded-lg hover:shadow transition-shadow">
                    <div className="relative w-10 h-12 rounded overflow-hidden bg-secondary shrink-0">
                      <Image src={prod.image.startsWith('http') || prod.image.startsWith('/') || prod.image.startsWith('data:') ? prod.image : `/assets/images/${prod.image}`} alt={prod.name} fill className="object-cover" />
                    </div>
                    <div className="space-y-0.5 overflow-hidden">
                      <h4 className="font-semibold text-xs text-foreground line-clamp-1 group-hover:text-primary transition-colors">{prod.name}</h4>
                      <p className="text-[10px] text-muted-foreground">by {prod.weaver.name}</p>
                      <span className="text-xs font-bold text-foreground">₹{prod.price.toLocaleString('en-IN')}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
