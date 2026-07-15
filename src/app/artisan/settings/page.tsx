"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Package, ShoppingBag, BarChart3, TrendingUp, Settings, LogOut, 
  ShieldCheck, ArrowLeft, Check, User, Phone, Mail, Award, Key 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';

export default function ArtisanSettingsPage() {
  const router = useRouter();
  const { user, logout, artisans } = useApp();

  const currentArtisan = artisans.find(a => a.id === user?.id) || artisans[0];

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(currentArtisan?.phone || '');
  const [bio, setBio] = useState(currentArtisan?.bio || '');
  const [specialties, setSpecialties] = useState(currentArtisan?.specialties?.join(', ') || '');
  const [updated, setUpdated] = useState(false);

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'artisan') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user]);

  if (!user) return null;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdated(true);
    setTimeout(() => setUpdated(false), 2000);
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
                  item.id === 'settings'
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
            <h1 className="text-2xl font-serif font-semibold text-foreground">Workshop Settings</h1>
            <p className="text-xs text-muted-foreground">Manage your credentials, studio biography details, and security keys.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Inputs */}
            <div className="md:col-span-7 bg-white border border-border rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
              {updated && (
                <div className="bg-success-light/35 border border-success/20 text-success text-xs p-3 rounded text-center flex items-center justify-center gap-2">
                  <Check size={14} />
                  <span>Workshop settings updated successfully</span>
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Workshop Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-white border border-border pl-10 pr-4 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Contact Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-white border border-border pl-10 pr-4 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-white border border-border pl-10 pr-4 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Specialties (comma-separated)</label>
                  <input
                    type="text"
                    value={specialties}
                    onChange={e => setSpecialties(e.target.value)}
                    className="w-full bg-white border border-border px-3.5 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Studio Heritage Biography</label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    className="w-full bg-white border border-border px-3.5 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary-hover transition-colors text-sm shadow"
                >
                  Save Settings
                </button>
              </form>
            </div>

            {/* Right details card */}
            <div className="md:col-span-5 bg-white border border-border rounded-lg p-6 space-y-6 shadow-sm">
              <h3 className="font-serif font-semibold text-lg text-foreground border-b border-border pb-3">Immutable Blockchain Identity</h3>
              
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Artisan Wallet Keys</span>
                  <code className="text-xs text-foreground font-mono bg-secondary/50 p-2.5 rounded block mt-1 select-all break-all border border-border/60">
                    {currentArtisan?.walletAddress || "0xDefaultArtisanWalletMockAddress"}
                  </code>
                </div>

                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Verification Hash</span>
                  <code className="text-xs text-foreground font-mono bg-secondary/50 p-2.5 rounded block mt-1 select-all break-all border border-border/60">
                    {currentArtisan?.verificationHash || "0xMockPolygonArtisanTxHash"}
                  </code>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-success fill-success/10" />
                  <span className="font-semibold text-foreground">Active GI Certified Node</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
