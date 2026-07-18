"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, MapPin, Settings, Save, CheckCircle, Package, 
  Heart, ShoppingBag, LogOut, ShieldCheck, Mail, Phone, Home 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';

export default function BuyerSettingsPage() {
  const router = useRouter();
  const { user, logout, updateUserAddress } = useApp();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('address');
  
  // Profile state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Shipping Address state
  const [shippingName, setShippingName] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [country, setCountry] = useState('India');
  
  const [savingAddress, setSavingAddress] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Initialize fields
  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    setName(user.name || '');
    setEmail(user.email || '');
    setPhone(user.phone || '');
    setShippingName(user.name || '');

    // Load saved address from localStorage
    const saved = localStorage.getItem('ll_user_address');
    if (saved) {
      try {
        const addr = JSON.parse(saved);
        setShippingName(addr.shippingName || user.name || '');
        setAddressLine(addr.shippingAddress || addr.addressLine || '');
        setLandmark(addr.landmark || '');
        setCity(addr.shippingCity || addr.city || '');
        setState(addr.shippingState || addr.state || '');
        setPincode(addr.shippingPincode || addr.pincode || '');
        setShippingPhone(addr.shippingPhone || user.phone || '');
        setCountry(addr.country || 'India');
      } catch (err) {
        console.error('Failed to parse saved address:', err);
      }
    }
  }, [user, router]);

  if (!user) return null;

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAddress(true);

    const addressData = {
      shippingName: shippingName || name,
      shippingAddress: addressLine,
      addressLine,
      landmark,
      shippingCity: city,
      city,
      shippingState: state,
      state,
      shippingPincode: pincode,
      pincode,
      shippingPhone: shippingPhone || phone,
      country,
    };

    // Save locally
    localStorage.setItem('ll_user_address', JSON.stringify(addressData));
    
    // Update context if handler provided
    if (updateUserAddress) {
      updateUserAddress(addressData);
    }

    setTimeout(() => {
      setSavingAddress(false);
      setSavedSuccess(true);
      showToast('Shipping address updated successfully!', 'success');
      setTimeout(() => setSavedSuccess(false), 4000);
    }, 400);
  };

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
              { id: 'settings', label: 'Settings & Address', icon: Settings, path: '/buyer/settings' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.path !== '/buyer/settings') router.push(item.path);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-md transition-colors text-left ${
                  item.id === 'settings'
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

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10 max-w-4xl space-y-8">
        
        {/* Header Title */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground">Profile & Shipping Address</h1>
          <p className="text-sm text-muted-foreground">Manage your personal details and default delivery address for handloom orders.</p>
        </div>

        {/* Settings Navigation Tabs */}
        <div className="flex border-b border-border gap-6">
          <button
            onClick={() => setActiveTab('address')}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 transition-colors relative ${
              activeTab === 'address' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MapPin size={16} />
            <span>Shipping Address</span>
            {activeTab === 'address' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 transition-colors relative ${
              activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <User size={16} />
            <span>Personal Info</span>
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        </div>

        {/* Tab 1: Shipping Address Form */}
        {activeTab === 'address' && (
          <div className="bg-white border border-border rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
            
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary-light text-primary">
                  <Home size={20} />
                </div>
                <div>
                  <h2 className="font-serif font-semibold text-lg text-foreground">Default Delivery Address</h2>
                  <p className="text-xs text-muted-foreground">This address will be auto-filled during checkout for your orders.</p>
                </div>
              </div>
              {savedSuccess && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                  <CheckCircle size={14} /> Saved
                </span>
              )}
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recipient Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={shippingName}
                    onChange={e => setShippingName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-secondary/30 border border-border rounded-md text-sm outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={shippingPhone}
                    onChange={e => setShippingPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-secondary/30 border border-border rounded-md text-sm outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Flat / House No. / Building / Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House No. 42, Weaver Colony, Mandir Marg"
                  value={addressLine}
                  onChange={e => setAddressLine(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-secondary/30 border border-border rounded-md text-sm outline-none focus:border-primary focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Landmark / Area (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Near Vishwanath Temple Gate 2"
                  value={landmark}
                  onChange={e => setLandmark(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-secondary/30 border border-border rounded-md text-sm outline-none focus:border-primary focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City / District</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Varanasi"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-secondary/30 border border-border rounded-md text-sm outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">State / Province</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uttar Pradesh"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-secondary/30 border border-border rounded-md text-sm outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">PIN Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 221001"
                    value={pincode}
                    onChange={e => setPincode(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-secondary/30 border border-border rounded-md text-sm outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Country</label>
                <input
                  type="text"
                  readOnly
                  value={country}
                  className="w-full px-3.5 py-2.5 bg-secondary/60 border border-border rounded-md text-sm text-muted-foreground cursor-not-allowed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={savingAddress}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-50 text-sm"
                >
                  <Save size={16} />
                  <span>{savingAddress ? 'Saving Address...' : 'Save Shipping Address'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Personal Profile Form */}
        {activeTab === 'profile' && (
          <div className="bg-white border border-border rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-2.5 pb-4 border-b border-border">
              <div className="p-2 rounded-lg bg-primary-light text-primary">
                <User size={20} />
              </div>
              <div>
                <h2 className="font-serif font-semibold text-lg text-foreground">Personal Account Details</h2>
                <p className="text-xs text-muted-foreground">Your account credentials and contact details.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-secondary/30 border border-border rounded-md text-sm">
                  <User size={16} className="text-muted-foreground shrink-0" />
                  <span className="font-medium text-foreground">{name}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-secondary/30 border border-border rounded-md text-sm">
                  <Mail size={16} className="text-muted-foreground shrink-0" />
                  <span className="font-medium text-foreground">{email}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Account Role</label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-secondary/30 border border-border rounded-md text-sm">
                  <ShieldCheck size={16} className="text-primary shrink-0" />
                  <span className="font-semibold text-primary capitalize">{user.role} Account</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
