"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, QrCode, Hash, Search, CheckCircle, XCircle, Clock, Award, MapPin, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';

export default function VerifyPage() {
  const { products, artisans } = useApp();
  const [method, setMethod] = useState<'qr' | 'id' | 'artisan'>('qr');
  const [searchVal, setSearchVal] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;

    setVerifying(true);
    setResult(null);

    setTimeout(() => {
      setVerifying(false);
      
      if (method === 'id') {
        // Find product by ID or slug
        const prod = products.find(p => p.id.toLowerCase() === searchVal.trim().toLowerCase() || p.slug.toLowerCase().includes(searchVal.trim().toLowerCase()));
        if (prod) {
          setResult({
            type: 'product',
            verified: prod.verified,
            title: prod.name,
            artisan: prod.weaver.name,
            region: prod.region,
            blockchainId: prod.blockchainId || "0xMockPolygonTxHashGeneratedOnDemand",
            giCertified: prod.giCertified,
            mintDate: "2026-03-02",
            image: prod.image,
            fabric: prod.fabric,
            timeline: prod.timeline
          });
        } else {
          setResult({ verified: false });
        }
      } else if (method === 'artisan') {
        // Find artisan by ID or name
        const art = artisans.find(a => a.id.toLowerCase() === searchVal.trim().toLowerCase() || a.name.toLowerCase().includes(searchVal.trim().toLowerCase()));
        if (art) {
          setResult({
            type: 'artisan',
            verified: art.verified,
            title: art.name,
            region: art.region,
            craft: art.craft,
            experience: art.experience,
            blockchainId: art.verificationHash || "0xMockPolygonArtisanTxHash",
            giCertified: art.giCertified,
            mintDate: art.blockchainTimestamp ? art.blockchainTimestamp.split('T')[0] : "2026-01-10",
            awards: art.awards
          });
        } else {
          setResult({ verified: false });
        }
      }
    }, 1500);
  };

  const handleMockQrScan = () => {
    setVerifying(true);
    setResult(null);
    setTimeout(() => {
      setVerifying(false);
      // Select the first product as a mock QR scan result
      const prod = products[0];
      setResult({
        type: 'product',
        verified: true,
        title: prod.name,
        artisan: prod.weaver.name,
        region: prod.region,
        blockchainId: prod.blockchainId,
        giCertified: prod.giCertified,
        mintDate: "2026-03-02",
        image: prod.image,
        fabric: prod.fabric,
        timeline: prod.timeline
      });
    }, 1500);
  };

  return (
    <div className="py-8 bg-background flex-grow">
      
      {/* Header */}
      <div className="bg-[#F5F3EF]/50 py-12 border-b border-border text-center mb-10">
        <div className="container max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-success-light text-success text-xs font-semibold rounded-full border border-success/15">
            <ShieldCheck size={14} />
            <span>Digital Authenticity Certificate</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground">Verify Handloom Provenance</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Enter the unique ID printed on your product's passport tag or scan the QR code to verify its on-chain digital registration.
          </p>
        </div>
      </div>

      <div className="container max-w-2xl">
        {/* Tabs */}
        <div className="flex border border-border rounded-lg overflow-hidden bg-white mb-8">
          {[
            { id: 'qr', label: 'Scan QR Tag', icon: QrCode },
            { id: 'id', label: 'Product ID', icon: Hash },
            { id: 'artisan', label: 'Artisan ID', icon: ShieldCheck }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setMethod(tab.id as any);
                setResult(null);
                setSearchVal('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs sm:text-sm font-semibold transition-all ${
                method === tab.id
                  ? 'bg-foreground text-background font-bold'
                  : 'text-muted-foreground hover:bg-secondary/40'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Input Zones */}
        <div className="bg-white border border-border rounded-lg p-6 sm:p-8 shadow-sm mb-10">
          {method === 'qr' ? (
            <div className="text-center space-y-6">
              <div className="border-2 border-dashed border-border rounded-xl p-10 max-w-md mx-auto space-y-4 bg-secondary/10">
                <QrCode size={56} className="text-primary mx-auto animate-pulse" />
                <h3 className="font-semibold text-sm text-foreground">Awaiting QR Scanner Feed</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  LoomLedger tags feature high-security QR signatures that cross-reference fabric blueprints with decentralized ledgers.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleMockQrScan}
                    className="px-4 py-2 bg-primary text-white text-xs font-bold rounded hover:bg-primary-hover transition-colors shadow"
                  >
                    Trigger Mock Camera Scan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                  {method === 'id' ? 'Enter Product Passport ID' : 'Enter Registered Artisan ID'}
                </label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                    placeholder={method === 'id' ? "e.g., PROD_001 or varanasi-gold..." : "e.g., ART-OD-2026-000101"}
                    className="w-full bg-white border border-border pl-10 pr-4 py-2.5 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={verifying}
                className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary-hover transition-all text-sm disabled:opacity-50"
              >
                {verifying ? 'Consulting Decentralized Ledger...' : 'Run On-Chain Verification'}
              </button>
            </form>
          )}
        </div>

        {/* Verification Loading Skeleton */}
        {verifying && (
          <div className="border border-border rounded-lg p-6 bg-white space-y-4 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-secondary mx-auto" />
            <div className="w-1/3 h-5 bg-secondary mx-auto rounded" />
            <div className="w-3/4 h-4 bg-secondary mx-auto rounded" />
            <div className="space-y-2 pt-6">
              <div className="w-full h-8 bg-secondary rounded" />
              <div className="w-full h-8 bg-secondary rounded" />
            </div>
          </div>
        )}

        {/* Verification Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border rounded-lg p-6 sm:p-8 space-y-6 ${
              result.verified
                ? 'bg-success-light/45 border-success/20'
                : 'bg-error-light/40 border-error/20'
            }`}
          >
            {/* Header Result */}
            <div className="text-center space-y-3">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm">
                {result.verified ? (
                  <CheckCircle size={32} className="text-success" />
                ) : (
                  <XCircle size={32} className="text-error" />
                )}
              </div>
              <h2 className="text-2xl font-serif font-semibold text-foreground">
                {result.verified ? 'Verification Authenticated' : 'Verification Unsuccessful'}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                {result.verified
                  ? `Immutable registry documents loaded. This handloom is certified authentic.`
                  : `No records match that identifier. It may be unregistered or a counterfeit.`}
              </p>
            </div>

            {/* Content Details */}
            {result.verified && (
              <div className="space-y-6">
                <div className="bg-white border border-border rounded-lg p-5 text-sm space-y-3">
                  <h3 className="font-semibold text-foreground border-b border-border pb-2 flex items-center justify-between">
                    <span>Provenance Passport Details</span>
                    <Badge variant="indigo" size="xs">
                      {result.type === 'product' ? 'Product Passport' : 'Artisan Record'}
                    </Badge>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                    <div>
                      <span className="text-muted-foreground block">Name</span>
                      <span className="font-semibold text-foreground">{result.title}</span>
                    </div>
                    {result.type === 'product' ? (
                      <>
                        <div>
                          <span className="text-muted-foreground block">Artisan Weaver</span>
                          <span className="font-semibold text-foreground">{result.artisan}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Fabric Details</span>
                          <span className="font-semibold text-foreground">{result.fabric}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <span className="text-muted-foreground block">Craft Specialty</span>
                          <span className="font-semibold text-foreground">{result.craft}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Experience</span>
                          <span className="font-semibold text-foreground">{result.experience}</span>
                        </div>
                      </>
                    )}
                    <div>
                      <span className="text-muted-foreground block">GI Origin Cluster</span>
                      <span className="font-semibold text-foreground flex items-center gap-1">
                        <MapPin size={12} className="text-primary" />
                        <span>{result.region}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">GI Certified Status</span>
                      <span className="font-semibold text-accent">{result.giCertified ? 'Certified' : 'Not Certified'}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border/80">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">Polygon Amoy Blockhash</span>
                    <code className="text-xs text-foreground font-mono break-all bg-secondary/40 p-2 rounded block mt-1">
                      {result.blockchainId}
                    </code>
                  </div>
                </div>

                {/* Timeline for product */}
                {result.type === 'product' && result.timeline && (
                  <div className="bg-white border border-border rounded-lg p-5 space-y-4">
                    <h4 className="font-semibold text-sm text-foreground">Supply Chain Record Entries</h4>
                    <div className="border-l-2 border-primary-light pl-4 space-y-4 ml-1">
                      {result.timeline.map((step: any, i: number) => (
                        <div key={i} className="text-xs relative">
                          <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary border border-white" />
                          <p className="font-semibold text-foreground">{step.stage}</p>
                          <p className="text-muted-foreground text-[10px]">{step.date} · {step.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => alert("Digital stamp certificate downloaded.")}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-foreground text-background text-sm font-semibold rounded hover:bg-foreground/90 transition-all shadow"
                  >
                    <Download size={16} />
                    <span>Download Certificate</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
