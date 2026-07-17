"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, User, Mail, Phone, MapPin, Award, CheckCircle, FileText, Lock, QrCode } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';

export default function SignupPage() {
  const router = useRouter();
  const { signUpBuyer, signUpArtisan } = useApp();

  const [role, setRole] = useState<'buyer' | 'artisan'>('buyer');
  
  // Buyer form states
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerPassword, setBuyerPassword] = useState('');

  // Artisan form states
  const [artisanName, setArtisanName] = useState('');
  const [artisanEmail, setArtisanEmail] = useState('');
  const [artisanPhone, setArtisanPhone] = useState('');
  const [artisanState, setArtisanState] = useState('');
  const [artisanDistrict, setArtisanDistrict] = useState('');
  const [artisanCraft, setArtisanCraft] = useState('');
  const [artisanExp, setArtisanExp] = useState('');
  const [giNumber, setGiNumber] = useState('');
  const [artisanBio, setArtisanBio] = useState('');
  const [artisanPassword, setArtisanPassword] = useState('');
  const [mockIdFile, setMockIdFile] = useState<string | null>(null);

  // Success modal/status states
  const [registering, setRegistering] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedArtisanId, setGeneratedArtisanId] = useState('');
  const [mockWallet, setMockWallet] = useState('');
  const [mockTxHash, setMockTxHash] = useState('');

  const handleBuyerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistering(true);
    try {
      await signUpBuyer(buyerName, buyerEmail, buyerPhone, buyerPassword);
      setRegistering(false);
      router.push('/buyer/dashboard');
    } catch (err: any) {
      setRegistering(false);
      alert(err.message || 'Buyer registration failed.');
    }
  };

  const handleArtisanSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistering(true);
    try {
      const resData: any = await signUpArtisan({
        name: artisanName,
        email: artisanEmail,
        phone: artisanPhone,
        district: artisanDistrict,
        state: artisanState,
        craft: artisanCraft,
        experience: artisanExp,
        giNumber: giNumber,
        bio: artisanBio,
        giCertified: !!giNumber,
        password: artisanPassword
      } as any);
      
      setRegistering(false);
      setGeneratedArtisanId(resData.artisanId || 'ART-NEW');
      setMockWallet(resData.walletAddress || '0xArtisanWallet');
      setMockTxHash(resData.txHash || '0xVerificationTxHash');
      setShowSuccess(true);
    } catch (err: any) {
      setRegistering(false);
      alert(err.message || 'Artisan registration failed.');
    }
  };


  return (
    <div className="py-8 bg-background flex-grow flex items-center justify-center">
      <div className="container max-w-xl">
        
        <div className="bg-white border border-border rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-serif font-semibold text-foreground">Create Your Account</h1>
            <p className="text-xs text-muted-foreground">Join India's verified digital handloom trust platform.</p>
          </div>

          {/* Role selection tab */}
          <div className="flex border border-border rounded-md overflow-hidden bg-secondary/50">
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                role === 'buyer'
                  ? 'bg-foreground text-background font-bold'
                  : 'text-muted-foreground hover:bg-secondary'
              }`}
            >
              Register as Buyer
            </button>
            <button
              type="button"
              onClick={() => setRole('artisan')}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                role === 'artisan'
                  ? 'bg-foreground text-background font-bold'
                  : 'text-muted-foreground hover:bg-secondary'
              }`}
            >
              Register as Weaver
            </button>
          </div>

          {/* Form switcher */}
          {role === 'buyer' ? (
            <form onSubmit={handleBuyerSignup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={e => setBuyerName(e.target.value)}
                    placeholder="e.g. Ramesh"
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
                    value={buyerEmail}
                    onChange={e => setBuyerEmail(e.target.value)}
                    placeholder="e.g. buyer@mail.com"
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
                    value={buyerPhone}
                    onChange={e => setBuyerPhone(e.target.value)}
                    placeholder="e.g. +91 99999 88888"
                    className="w-full bg-white border border-border pl-10 pr-4 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={buyerPassword}
                    onChange={e => setBuyerPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full bg-white border border-border pl-10 pr-4 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={registering}
                className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary-hover transition-colors text-sm shadow disabled:opacity-50"
              >
                {registering ? 'Creating Buyer Account...' : 'Complete Registration'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleArtisanSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    required
                    value={artisanName}
                    onChange={e => setArtisanName(e.target.value)}
                    placeholder="e.g. Ramesh V."
                    className="w-full bg-white border border-border px-3 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    required
                    value={artisanEmail}
                    onChange={e => setArtisanEmail(e.target.value)}
                    placeholder="e.g. weaver@mail.com"
                    className="w-full bg-white border border-border px-3 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">State</label>
                  <input
                    type="text"
                    required
                    value={artisanState}
                    onChange={e => setArtisanState(e.target.value)}
                    placeholder="e.g. Uttar Pradesh"
                    className="w-full bg-white border border-border px-3 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">District</label>
                  <input
                    type="text"
                    required
                    value={artisanDistrict}
                    onChange={e => setArtisanDistrict(e.target.value)}
                    placeholder="e.g. Varanasi"
                    className="w-full bg-white border border-border px-3 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Craft Specialty</label>
                  <input
                    type="text"
                    required
                    value={artisanCraft}
                    onChange={e => setArtisanCraft(e.target.value)}
                    placeholder="e.g. Banarasi Brocade"
                    className="w-full bg-white border border-border px-3 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Years Experience</label>
                  <input
                    type="number"
                    required
                    value={artisanExp}
                    onChange={e => setArtisanExp(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full bg-white border border-border px-3 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">GI License Number (If certified)</label>
                  <input
                    type="text"
                    value={giNumber}
                    onChange={e => setGiNumber(e.target.value)}
                    placeholder="e.g. GI-2009-34"
                    className="w-full bg-white border border-border px-3 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={artisanPhone}
                    onChange={e => setArtisanPhone(e.target.value)}
                    placeholder="e.g. +91 99999 12345"
                    className="w-full bg-white border border-border px-3 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
              </div>

              {/* Mock upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Upload Government Weaver Card / ID</label>
                <div className="border-2 border-dashed border-border rounded p-4 text-center cursor-pointer bg-secondary/20 hover:bg-secondary/40 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setMockIdFile(e.target.files[0].name);
                      }
                    }}
                    className="hidden"
                    id="govt-file"
                  />
                  <label htmlFor="govt-file" className="cursor-pointer space-y-1 text-xs text-muted-foreground block">
                    <FileText size={20} className="text-primary mx-auto" />
                    <span className="font-semibold text-primary block">Select File to Upload</span>
                    <span>{mockIdFile || 'Weaver Identity Card (PDF/JPEG)'}</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Artisan Biography / Studio Story</label>
                <textarea
                  rows={3}
                  value={artisanBio}
                  onChange={e => setArtisanBio(e.target.value)}
                  placeholder="Describe your family weaving heritage, workshop set-up, or materials used..."
                  className="w-full bg-white border border-border px-3.5 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Choose Password</label>
                <input
                  type="password"
                  required
                  value={artisanPassword}
                  onChange={e => setArtisanPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full bg-white border border-border px-3.5 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                />
              </div>

              <button
                type="submit"
                disabled={registering}
                className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary-hover transition-colors text-sm shadow disabled:opacity-50"
              >
                {registering ? 'Deploying Ledger Registry...' : 'Submit Profile for Verification'}
              </button>
            </form>
          )}

          <div className="text-center text-xs text-muted-foreground border-t border-border pt-4">
            <span>Already have an account? </span>
            <Link href="/login" className="text-primary font-bold hover:underline">Log In</Link>
          </div>
        </div>
      </div>

      {/* Artisan Blockchain Verification Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border border-border w-full max-w-lg rounded-xl p-8 text-center space-y-6 shadow-2xl relative"
            >
              <div className="w-16 h-16 rounded-full bg-success-light text-success flex items-center justify-center mx-auto shadow">
                <CheckCircle size={36} />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-success bg-success-light px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                  Successfully Registered on Polygon Amoy
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground">Weaver Profile Authenticated</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Your artisan license and wallet registries have been successfully locked on-chain. Admin verification is pending.
                </p>
              </div>

              <div className="bg-secondary/40 border border-border rounded-lg p-5 text-left text-xs space-y-3.5">
                <div className="flex justify-between items-center py-1.5 border-b border-border">
                  <span className="text-muted-foreground font-medium">Assigned Artisan ID</span>
                  <span className="font-bold text-foreground">{generatedArtisanId}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-border">
                  <span className="text-muted-foreground font-medium">Ledger Status</span>
                  <Badge variant="warning" size="xs">Pending Approval</Badge>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-border">
                  <span className="text-muted-foreground font-medium">Artisan Wallet Address</span>
                  <code className="text-[10px] font-mono text-foreground font-bold">{mockWallet}</code>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold block">On-Chain Registration Transaction Hash</span>
                  <code className="text-[10px] font-mono text-muted-foreground break-all bg-white border border-border p-2 rounded block">
                    {mockTxHash}
                  </code>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-muted-foreground font-semibold flex items-center gap-1">
                    <ShieldCheck size={14} className="text-success" />
                    <span>Digital Passport Active</span>
                  </span>
                  <QrCode size={40} className="text-foreground" />
                </div>
              </div>

              <button
                onClick={() => {
                  setShowSuccess(false);
                  router.push('/artisan/dashboard');
                }}
                className="w-full py-2.5 bg-foreground text-background text-sm font-semibold rounded hover:bg-foreground/90 transition-colors"
              >
                Enter Artisan Control Panel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
