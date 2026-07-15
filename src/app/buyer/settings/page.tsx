"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, User, Phone, Mail, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function BuyerSettingsPage() {
  const router = useRouter();
  const { user } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [updated, setUpdated] = useState(false);

  React.useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

  if (!user) return null;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdated(true);
    setTimeout(() => setUpdated(false), 2000);
  };

  return (
    <div className="py-8 bg-background flex-grow">
      <div className="container max-w-xl space-y-6">
        <Link href="/buyer/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
          <ChevronLeft size={14} />
          <span>Back to Account Dashboard</span>
        </Link>

        <div className="space-y-1">
          <h1 className="text-2xl font-serif font-semibold text-foreground">Account Settings</h1>
          <p className="text-xs text-muted-foreground">Manage your credentials, shipping keys, and contact preferences.</p>
        </div>

        <div className="bg-white border border-border rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
          {updated && (
            <div className="bg-success-light/35 border border-success/20 text-success text-xs p-3 rounded text-center flex items-center justify-center gap-2">
              <Check size={14} />
              <span>Profile details updated successfully</span>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wide">Full Name</label>
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
              <label className="text-xs font-bold text-foreground uppercase tracking-wide">Email Address</label>
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

            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary-hover transition-colors text-sm shadow"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
