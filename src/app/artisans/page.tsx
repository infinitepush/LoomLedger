"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Award, UserCheck, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { API_BASE, useApp } from '@/context/AppContext';
import VerificationBadge from '@/components/ui/VerificationBadge';

export default function ArtisansPage() {
  const { artisans: contextArtisans } = useApp();
  const [artisans, setArtisans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const res = await fetch(`${API_BASE}/artisans?status=all`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setArtisans(json.data);
        } else if (contextArtisans && contextArtisans.length > 0) {
          setArtisans(contextArtisans);
        } else if (json.data) {
          setArtisans(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch artisans:', err);
        if (contextArtisans && contextArtisans.length > 0) {
          setArtisans(contextArtisans);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchArtisans();
  }, [contextArtisans]);

  const statesList = React.useMemo(() => {
    const set = new Set(artisans.map(a => a.state).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [artisans]);

  const filteredArtisans = artisans.filter(artisan => {
    const matchesSearch = 
      (artisan.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artisan.craft || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artisan.district || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = selectedState === 'all' || artisan.state === selectedState;

    return matchesSearch && matchesState;
  });

  return (
    <div className="py-12 bg-background flex-grow">
      <div className="container space-y-12">
        
        {/* Onboarding Call to Action */}
        <div className="bg-[#F5F3EF]/60 border border-border/80 rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Artisan Portal</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground">Are you a traditional weaver?</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Join LoomLedger to secure your craft's legacy using blockchain Digital Passports, protect your intellectual property, and list your authentic handlooms directly to global collectors.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <Link 
              href="/signup" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary-hover transition-all shadow-md text-sm"
            >
              <UserPlus size={16} />
              <span>Register as Weaver</span>
            </Link>
            <Link 
              href="/login" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-foreground border border-border font-medium rounded-md hover:bg-secondary transition-all text-sm"
            >
              <LogIn size={16} />
              <span>Weaver Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Directory header and search */}
        <div className="space-y-6">
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground">Meet Our Master Weavers</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Discover the certified artisans carrying forward India's rich handloom heritage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2.5 bg-white border border-border rounded-md px-3.5 py-2.5 h-11 shadow-xs">
              <Search size={18} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by weaver name, craft, or district..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm outline-none border-none focus:ring-0 text-foreground"
              />
            </div>

            <div className="flex items-center gap-2 bg-white border border-border rounded-md px-3.5 py-2.5 h-11 shrink-0 shadow-xs">
              <MapPin size={18} className="text-muted-foreground" />
              <select
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
                className="bg-transparent text-sm outline-none border-none focus:ring-0 text-foreground pr-8 cursor-pointer"
              >
                <option value="all">All States</option>
                {statesList.filter(s => s !== 'all').map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Weaver Grid */}
        {loading ? (
          <div className="py-20 text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-3">
            <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Discovering master weavers...</span>
          </div>
        ) : filteredArtisans.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-xl bg-white space-y-2">
            <h3 className="font-semibold text-lg text-foreground">No Weavers Found</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">We couldn't find any approved weavers matching your filter. Try adjusting your search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtisans.map(artisan => {
              const initial = (artisan.user?.name || 'W')
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();

              return (
                <div key={artisan.id} className="bg-white border border-border rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                  {/* Decorative corner background */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-125 transition-transform duration-500" />
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-lg border border-primary/10 shrink-0 overflow-hidden relative">
                        {artisan.user?.avatar || (artisan as any).avatar ? (
                          <Image src={artisan.user?.avatar || (artisan as any).avatar} alt={artisan.user?.name || 'Weaver'} fill className="object-cover" />
                        ) : (
                          <span>{initial}</span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-serif font-semibold text-lg text-foreground leading-tight">{artisan.user?.name || 'Master Weaver'}</h3>
                          {artisan.verified && <VerificationBadge size="sm" showLabel={false} />}
                        </div>
                        <p className="text-xs font-medium text-primary uppercase tracking-wide">{artisan.craft}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {artisan.bio || "Crafting ancient weaves and preserving India's heritage."}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-2 text-xs border-t border-border/60">
                      <div className="space-y-0.5">
                        <span className="text-muted-foreground block">Experience</span>
                        <span className="font-semibold text-foreground flex items-center gap-1">
                          <Award size={12} className="text-primary" />
                          {artisan.experience || 'Legacy Artist'}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-muted-foreground block">Region</span>
                        <span className="font-semibold text-foreground flex items-center gap-1">
                          <MapPin size={12} className="text-primary" />
                          {artisan.district || artisan.state ? `${artisan.district || ''}, ${artisan.state || ''}` : 'India'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link 
                      href={`/artisan/${artisan.id}`} 
                      className="w-full py-2.5 bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Explore Weaver Profile</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
