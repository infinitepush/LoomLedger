"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Package,
  DollarSign,
  BarChart3,
  Upload,
  Plus,
  TrendingUp,
  Eye,
  ShoppingBag,
  Clock,
  Star,
  Settings,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Award,
  Bell,
  Users,
  Wallet
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';
import VerificationBadge from '@/components/ui/VerificationBadge';

export default function ArtisanDashboardPage() {
  const router = useRouter();
  const { user, logout, products, orders, artisans } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // Verify role
  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'artisan') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user]);

  if (!user) return null;

  const currentArtisan = artisans.find(a => 
    a.id === user.id || 
    (a as any).userId === user.id || 
    a.id === user.artisan?.id ||
    (a as any).user?.id === user.id || 
    (a as any).user?.email === user.email
  ) || {
    id: user.artisan?.id || user.id,
    userId: user.id,
    name: user.name,
    craft: user.artisan?.craft || user.craft || 'Handloom Weaver',
    experience: user.artisan?.experience || user.experience || 'Master Weaver',
    region: user.artisan?.region || user.region || user.district || 'Varanasi',
    district: user.district || 'Varanasi',
    state: user.state || 'Uttar Pradesh',
    bio: user.artisan?.bio || user.bio || 'Handloom artisan dedicated to authentic Indian weaving heritage.',
    giCertified: user.artisan?.giCertified || false,
    giNumber: user.artisan?.giNumber || '',
    verified: user.artisan?.verified || true,
    walletAddress: user.artisan?.walletAddress || '0xPolygonArtisanWalletAddress',
    verificationHash: user.artisan?.verificationHash || '0xPolygonArtisanVerificationHash',
    followersCount: user.artisan?.followersCount || 0,
    rating: 5.0,
    reviewCount: 0,
    user: user
  };

  const artisanProducts = products.filter(p => p.weaver?.id === user.id || (p as any).artisanId === user.id || (p as any).artisanId === currentArtisan.id || (p.weaver && p.weaver.id === currentArtisan.id));
  const artisanOrders = orders.filter(o => o.artisanId === user.id || o.artisanId === currentArtisan.id);
  const pendingOrders = artisanOrders.filter(o => o.status === 'Pending' || o.status === 'Processing');
  const deliveredOrders = artisanOrders.filter(o => o.status === 'Delivered');

  // Calculate stats
  const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.amount, 0);
  const visitorsCount = 1420;
  const followersCount = currentArtisan?.followersCount || 0;
  const profileViews = followersCount * 1.5;
  const storyViews = 840;

  const stats = [
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, change: '+12.5% this month', icon: DollarSign, color: 'text-success bg-success-light' },
    { label: 'Orders Received', value: artisanOrders.length, change: `+${pendingOrders.length} pending`, icon: ShoppingBag, color: 'text-indigo bg-indigo-light' },
    { label: 'Products Listed', value: artisanProducts.length, change: `${artisanProducts.filter(p => p.verified).length} active`, icon: Package, color: 'text-primary bg-primary-light' },
    { label: 'Profile Views', value: profileViews, change: `+${followersCount} followers`, icon: Eye, color: 'text-accent bg-accent-light' }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-background flex-grow">
      
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white border-r border-border p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary border border-border flex-shrink-0">
              <Image src="/assets/images/weaver-portrait.png" alt={user.name} fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
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
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.path !== '/artisan/dashboard') router.push(item.path);
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
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif font-semibold text-foreground">Workshop Dashboard</h1>
            <p className="text-xs text-muted-foreground">Manage your loom listings, verify transactions, and monitor customer metrics.</p>
          </div>
          
          <div className="flex gap-3">
            <Link href="/artisan/products?upload=true" className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover shadow flex items-center gap-2">
              <Plus size={14} />
              <span>Add New Product</span>
            </Link>
          </div>
        </div>

        {/* Verification Status Widget */}
        <div className={`border rounded-lg p-5 flex flex-col md:flex-row items-center justify-between gap-6 ${
          currentArtisan?.verified 
            ? 'bg-success-light/45 border-success/20' 
            : 'bg-warning-light/45 border-warning/20'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-full bg-white shadow-xs ${
              currentArtisan?.verified ? 'text-success' : 'text-warning'
            }`}>
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm text-foreground">
                  {currentArtisan?.verified ? 'Verified Master Workshop Active' : 'Artisan Verification Pending'}
                </h4>
                <Badge variant={currentArtisan?.verified ? 'success' : 'warning'} size="xs">
                  {currentArtisan?.verified ? 'Polygon Active' : 'In Review'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground max-w-lg">
                {currentArtisan?.verified 
                  ? 'Your digital credentials are registered on Polygon Amoy. All products you list will automatically carry authenticity certificates.' 
                  : 'Administrators are validating your government weaver card and GI registry details. You can still prepare drafts.'}
              </p>
              {currentArtisan?.verified && currentArtisan?.verificationHash && (
                <code className="text-[10px] font-mono text-muted-foreground block pt-1">
                  On-chain ID: {currentArtisan.verificationHash.substring(0, 36)}...
                </code>
              )}
            </div>
          </div>
          {currentArtisan?.verified && (
            <div className="bg-white border border-border p-3 rounded-lg flex items-center gap-3 shadow-xs flex-shrink-0 text-xs">
              <Wallet size={16} className="text-primary" />
              <div>
                <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider block">Wallet Balance</span>
                <span className="font-bold text-foreground block">₹{totalRevenue.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div className="bg-white border border-border p-5 rounded-lg flex items-start justify-between shadow-xs" key={i}>
              <div className="space-y-2">
                <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">{stat.label}</span>
                <span className="text-xl font-bold text-foreground block">{stat.value}</span>
                <span className="text-[10px] text-muted-foreground block">{stat.change}</span>
              </div>
              <div className={`p-2 rounded-md ${stat.color} shrink-0`}>
                <stat.icon size={18} />
              </div>
            </div>
          ))}
        </div>

        {/* Charts & Listings */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Sales Analytics Chart (Mock Graphic) */}
          <div className="md:col-span-8 bg-white border border-border rounded-lg p-6 space-y-6 shadow-sm">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider">Monthly Revenue Analytics</h3>
              <span className="text-xs text-muted-foreground">Last 6 Months</span>
            </div>
            
            {/* SVG Line Graph Mock */}
            <div className="relative h-48 w-full bg-secondary/20 rounded border border-border/50 flex items-end p-4">
              <svg className="absolute inset-0 w-full h-full p-6 text-primary" viewBox="0 0 100 50" preserveAspectRatio="none">
                <path
                  d="M 0 45 L 20 38 L 40 42 L 60 22 L 80 28 L 100 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Dots */}
                <circle cx="0" cy="45" r="1.5" className="fill-primary" />
                <circle cx="20" cy="38" r="1.5" className="fill-primary" />
                <circle cx="40" cy="42" r="1.5" className="fill-primary" />
                <circle cx="60" cy="22" r="1.5" className="fill-primary" />
                <circle cx="80" cy="28" r="1.5" className="fill-primary" />
                <circle cx="100" cy="10" r="1.5" className="fill-primary" />
              </svg>
              
              <div className="w-full flex justify-between text-[10px] text-muted-foreground z-10 pt-44">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>

          {/* Notifications / Alerts Panel */}
          <div className="md:col-span-4 bg-white border border-border rounded-lg p-6 space-y-5 shadow-sm">
            <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider flex items-center gap-1.5 pb-3 border-b border-border">
              <Bell size={16} className="text-primary" />
              <span>Alert Notifications</span>
            </h3>
            
            <div className="space-y-4">
              <div className="text-xs space-y-1 p-3 bg-primary-light/50 border border-primary/10 rounded">
                <span className="font-bold text-primary flex items-center gap-1">
                  <ShieldCheck size={12} />
                  <span>On-Chain Record Minted</span>
                </span>
                <p className="text-muted-foreground leading-relaxed">Banarasi Crimson Saree has been verified on Polygon Amoy ledger.</p>
              </div>
              <div className="text-xs space-y-1 p-3 bg-secondary/70 border border-border rounded">
                <span className="font-bold text-indigo flex items-center gap-1">
                  <ShoppingBag size={12} />
                  <span>New Order Received</span>
                </span>
                <p className="text-muted-foreground leading-relaxed">ORD-2026-1847 has been submitted by buyer Priya Sharma.</p>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
