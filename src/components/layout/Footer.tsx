"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, MessageCircle, Play, Mail, Check } from 'lucide-react';

const footerLinks = {
  marketplace: {
    title: 'Marketplace',
    links: [
      { label: 'Browse All', path: '/marketplace' },
      { label: 'Banarasi Silk', path: '/marketplace?cat=banarasi-silk' },
      { label: 'Kanjivaram Silk', path: '/marketplace?cat=kanjivaram' },
      { label: 'Chanderi Weaves', path: '/marketplace?cat=chanderi' },
      { label: 'Pashmina Shawls', path: '/marketplace?cat=pashmina' },
    ],
  },
  platform: {
    title: 'Platform',
    links: [
      { label: 'Blockchain Verification', path: '/verify' },
      { label: 'Artisan Directory', path: '/stories' },
      { label: 'Digital Product Passports', path: '/verify' },
      { label: 'Seller Registration', path: '/signup' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Weaving Heritage', path: '/stories' },
      { label: 'Contact Support', path: '/contact' },
      { label: 'Privacy Policy', path: '#' },
      { label: 'Terms of Service', path: '#' },
    ],
  },
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-foreground text-background pt-16 pb-8 border-t border-border mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-background/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-baseline gap-1 text-2xl font-serif text-background">
              <span className="font-bold text-primary">Loom</span>
              <span className="font-normal text-background/60">Ledger</span>
            </Link>
            <p className="text-sm text-background/50 max-w-sm leading-relaxed">
              LoomLedger is a digital trust platform bridging traditional Indian artisans and conscious buyers using blockchain-secured Digital Product Passports.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-md bg-background/10 text-background/50 flex items-center justify-center hover:text-background hover:bg-background/20 transition-all" aria-label="Website"><Globe size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-md bg-background/10 text-background/50 flex items-center justify-center hover:text-background hover:bg-background/20 transition-all" aria-label="Support"><MessageCircle size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-md bg-background/10 text-background/50 flex items-center justify-center hover:text-background hover:bg-background/20 transition-all" aria-label="Video Showcase"><Play size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-md bg-background/10 text-background/50 flex items-center justify-center hover:text-background hover:bg-background/20 transition-all" aria-label="Contact Email"><Mail size={16} /></a>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h4 className="text-sm font-semibold text-background uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.path} className="text-sm text-background/50 hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Panel */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/30">
            &copy; {new Date().getFullYear()} LoomLedger. All rights reserved. Blockchain-minted digital product passports are subject to Polygon network conditions.
          </p>
          <div className="flex gap-4 text-xs text-background/30">
            <span>GI Registered Products</span>
            <span>Ahimsa Silk Approved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
