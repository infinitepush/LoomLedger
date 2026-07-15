"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Award, Users, Globe, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-8 bg-background flex-grow">
      
      {/* Hero */}
      <div className="bg-[#F5F3EF]/50 py-16 border-b border-border text-center mb-16">
        <div className="container max-w-xl space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Our Mission</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground">Preserving Heritage Through Trust</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            LoomLedger was founded to defend India's handloom weavers against low-cost machine replicas, combining decentralized technology with Geographical Indication validation.
          </p>
        </div>
      </div>

      <div className="container max-w-3xl space-y-12">
        {/* Story Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-foreground">The Handloom Trust Deficit</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Indian handloom textiles represent thousands of years of design heritage. However, powerlooms produce cheap polyester copies, labeling them as handwoven Banarasi or Kanjivaram silk. Buyers cannot verify the difference, and weavers lose their livelihoods.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            LoomLedger establishes digital transparency. By minting details on a public blockchain ledger, we create permanent, tamper-proof records of fiber composition, loom hours, and regional validation.
          </p>
        </section>

        {/* Pillars Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="border border-border p-6 rounded-lg bg-white space-y-3">
            <ShieldCheck size={24} className="text-primary" />
            <h3 className="font-semibold text-base text-foreground">Blockchain Ledgers</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We record workshop validations on Polygon. Transaction hashes prove the date, location, and specific master weaver of each item.
            </p>
          </div>
          <div className="border border-border p-6 rounded-lg bg-white space-y-3">
            <Award size={24} className="text-primary" />
            <h3 className="font-semibold text-base text-foreground">GI Registry Validation</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Only verified artisans holding government GI certification numbers can list on our authenticated marketplace.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-[#2D3A5C] text-white p-8 rounded-xl text-center space-y-4">
          <h3 className="font-serif font-semibold text-xl">Join the Movement</h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto leading-relaxed">
            Support fair wages, direct payments, and transparent craft timelines. Browse our verified marketplace.
          </p>
          <div className="pt-2">
            <Link href="/marketplace" className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors shadow">
              <span>Explore Marketplace</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
