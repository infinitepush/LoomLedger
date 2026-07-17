"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();

  const [role, setRole] = useState<'buyer' | 'artisan' | 'admin'>('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email.trim(), password);
      setLoading(false);
      if (success) {
        if (role === 'admin') router.push('/admin/dashboard');
        else if (role === 'artisan') router.push('/artisan/dashboard');
        else router.push('/buyer/dashboard');
      } else {
        setError('Invalid credentials. Please verify your email and password.');
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-12 bg-background flex-grow">
      
      {/* Visual illustration Column (Pinterest heritage style) */}
      <div className="hidden lg:block lg:col-span-5 relative bg-secondary overflow-hidden">
        <Image
          src="/assets/images/heritage-3.jpg"
          alt="Weaver courtyard with lanterns"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-foreground/80 via-foreground/30 to-transparent" />
        
        <div className="absolute bottom-10 left-10 right-10 text-white space-y-3">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Secure Access Hub</span>
          <h2 className="text-2xl font-serif font-semibold">Decentralized Trust Network</h2>
          <p className="text-xs text-white/70 leading-relaxed">
            Verify products, track order timetables, and audit blockchain transactions from our secure dashboard control panel.
          </p>
        </div>
      </div>

      {/* Form Column */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white border border-border rounded-xl p-8 shadow-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-serif font-semibold text-foreground">Welcome Back</h1>
            <p className="text-xs text-muted-foreground">Access your LoomLedger digital workspace dashboard.</p>
          </div>

          {/* Role selector */}
          <div className="flex border border-border rounded-md overflow-hidden bg-secondary/50">
            {(['buyer', 'artisan', 'admin'] as const).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r);
                  setError('');
                }}
                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  role === r
                    ? 'bg-foreground text-background font-bold'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Error panel */}
          {error && (
            <div className="bg-error-light/35 border border-error/25 text-error text-xs p-3 rounded text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wide">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. user@mail.com"
                  className="w-full bg-white border border-border pl-10 pr-4 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Password</label>
                <button type="button" className="text-[10px] text-primary font-bold hover:underline">Forgot Password?</button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full bg-white border border-border pl-10 pr-10 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                />
                <span>Remember Me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary-hover transition-colors text-sm shadow disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>



          {/* Bottom */}
          <div className="text-center text-xs text-muted-foreground">
            <span>Don't have an account? </span>
            <Link href="/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
