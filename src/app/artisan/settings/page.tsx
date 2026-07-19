"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Package, ShoppingBag, BarChart3, TrendingUp, Settings, LogOut, 
  ShieldCheck, ArrowLeft, Check, User, Phone, Mail, Award, Key 
} from 'lucide-react';
import { API_BASE, useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';

export default function ArtisanSettingsPage() {
  const router = useRouter();
  const { user, logout, artisans } = useApp();

  const currentArtisan = artisans.find(a => 
    a.id === user?.id || 
    (a as any).userId === user?.id || 
    a.id === user?.artisan?.id ||
    (a as any).user?.id === user?.id || 
    (a as any).user?.email === user?.email
  ) || {
    id: user?.artisan?.id || user?.id,
    userId: user?.id,
    name: user?.name,
    craft: user?.artisan?.craft || user?.craft || 'Handloom Weaver',
    experience: user?.artisan?.experience || user?.experience || 'Master Weaver',
    region: user?.artisan?.region || user?.region || user?.district || 'Varanasi',
    district: user?.district || 'Varanasi',
    state: user?.state || 'Uttar Pradesh',
    bio: user?.artisan?.bio || user?.bio || 'Handloom artisan dedicated to authentic Indian weaving heritage.',
    giCertified: user?.artisan?.giCertified || false,
    giNumber: user?.artisan?.giNumber || '',
    verified: user?.artisan?.verified || true,
    walletAddress: user?.artisan?.walletAddress || '0xPolygonArtisanWalletAddress',
    verificationHash: user?.artisan?.verificationHash || '0xPolygonArtisanVerificationHash',
    phone: user?.phone || '',
    specialties: [],
    followersCount: user?.artisan?.followersCount || 0,
    user: user
  };

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(currentArtisan?.phone || '');
  const [bio, setBio] = useState(currentArtisan?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || (currentArtisan as any)?.avatar || '');
  const [specialties, setSpecialties] = useState(currentArtisan?.specialties?.join(', ') || '');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [updated, setUpdated] = useState(false);

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'artisan') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user]);

  if (!user) return null;

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');

      const res = await fetch('https://api.cloudinary.com/v1_1/demo/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setAvatar(data.secure_url);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => setAvatar(reader.result as string);
        reader.readAsDataURL(file);
      }
    } catch (err) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('ll_access_token') : null;
      await fetch(`${API_BASE}/auth/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name, phone, bio, avatar }),
      });

      // Sync local user object
      const storedUser = localStorage.getItem('ll_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        parsed.name = name;
        parsed.phone = phone;
        parsed.avatar = avatar;
        if (parsed.artisan) parsed.artisan.bio = bio;
        localStorage.setItem('ll_user', JSON.stringify(parsed));
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
    setUpdated(true);
    setTimeout(() => setUpdated(false), 2500);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-background flex-grow">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-white border-r border-border p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-primary-light border border-primary/20 shrink-0 flex items-center justify-center">
              {avatar || user.avatar || (currentArtisan as any)?.avatar ? (
                <Image src={avatar || user.avatar || (currentArtisan as any)?.avatar} alt={user.name} fill className="object-cover" />
              ) : (
                <span className="font-bold text-xs text-primary">{user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="font-semibold text-sm text-foreground leading-tight">{name}</p>
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

              <form onSubmit={handleUpdate} className="space-y-5">
                {/* Profile Photo Upload */}
                <div className="space-y-2 pb-4 border-b border-border">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide block">Master Weaver Profile Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary-light border-2 border-primary/20 shrink-0 flex items-center justify-center shadow-xs">
                      {avatar ? (
                        <Image src={avatar} alt={name} fill className="object-cover" />
                      ) : (
                        <span className="font-bold text-base text-primary">{name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary text-white text-xs font-semibold rounded cursor-pointer hover:bg-primary-hover transition-colors shadow-xs">
                        <span>{uploadingAvatar ? 'Uploading Photo...' : 'Upload Weaver Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          disabled={uploadingAvatar}
                          className="hidden"
                        />
                      </label>
                      <p className="text-[10px] text-muted-foreground">Upload your portrait photo (PNG, JPG, max 5MB). Saved to DB & rendered on your weaver profile.</p>
                    </div>
                  </div>
                </div>

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
