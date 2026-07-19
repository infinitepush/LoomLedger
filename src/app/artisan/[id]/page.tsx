"use client";

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { MapPin, Clock, Star, Award, Heart, ShieldCheck, Mail, Phone, Calendar, Check } from 'lucide-react';
import { API_BASE, useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';
import VerificationBadge from '@/components/ui/VerificationBadge';

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
}

export default function ArtisanProfilePage() {
  const { id } = useParams();
  const { artisans, products, addToCart, toggleWishlist, isWishlisted, toggleSaveArtisan, isArtisanSaved } = useApp();

  const [fetchedArtisan, setFetchedArtisan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(false);

  // Find artisan from context or fetched object
  const artisan = useMemo(() => {
    if (fetchedArtisan) return fetchedArtisan;
    return artisans.find(a => a.id === id || (a as any).userId === id);
  }, [artisans, id, fetchedArtisan]);

  // Fetch directly from backend API if not available in memory context
  useEffect(() => {
    if (!artisan && id) {
      setLoading(true);
      fetch(`${API_BASE}/artisans/${id}`)
        .then(res => res.json())
        .then(json => {
          if (json.success && json.data) {
            setFetchedArtisan(json.data);
          }
        })
        .catch(err => console.error('Failed to load artisan profile:', err))
        .finally(() => setLoading(false));
    }
  }, [id, artisan]);

  const artisanProducts = useMemo(() => {
    if (!artisan) return [];
    return products.filter(p => (
      (p as any).artisanId === artisan.id || 
      (p.weaver && p.weaver.id === artisan.id) ||
      ((p as any).artisan && (p as any).artisan.id === artisan.id)
    ));
  }, [products, artisan]);

  if (loading) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-3 flex-grow">
        <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span>Loading artisan profile...</span>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="py-20 text-center space-y-4 flex-grow">
        <h2 className="text-xl font-serif font-semibold text-foreground">Artisan Profile Not Found</h2>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">We couldn't locate this weaver's profile in the registry.</p>
        <Link href="/artisans" className="inline-block px-4 py-2 bg-primary text-primary-foreground font-semibold rounded text-xs">
          Back to Weavers
        </Link>
      </div>
    );
  }

  const isSaved = isArtisanSaved ? isArtisanSaved(artisan.id) : false;
  const name = artisan.user?.name || artisan.name || 'Master Weaver';
  const craft = artisan.craft || 'Handloom Artisan';
  const region = artisan.district ? `${artisan.district}, ${artisan.state || ''}` : (artisan.region || artisan.state || 'India');
  const experience = artisan.experience ? `${artisan.experience} Years Exp.` : 'Master Weaver';
  const rating = artisan.rating || '5.0';
  const followersCount = (artisan.followersCount || 120) + (following ? 1 : 0);
  const specialties = artisan.specialties || (artisan.craft ? [artisan.craft] : ['Handloom Weaving']);

  return (
    <div className="py-8 bg-background flex-grow">
      
      {/* Profile Header Hero */}
      <div className="bg-[#F5F3EF]/50 py-12 border-b border-border mb-10">
        <div className="container flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20 shadow-md bg-secondary flex-shrink-0">
            {artisan.user?.avatar || (artisan as any).avatar ? (
              <Image
                src={artisan.user?.avatar || (artisan as any).avatar}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary-light text-primary flex items-center justify-center font-bold text-3xl font-serif">
                {name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div className="text-center md:text-left space-y-4 flex-grow">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground">{name}</h1>
                {artisan.verified && <VerificationBadge size="md" />}
                {artisan.giCertified && <Badge variant="saffron" size="sm" icon={Award}>GI Artisan</Badge>}
              </div>
              <p className="text-sm text-primary font-semibold uppercase tracking-wide">{craft}</p>
              {artisan.generation && <p className="text-xs text-muted-foreground">{artisan.generation}</p>}
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin size={13} className="text-primary" /> {region}</span>
              <span className="flex items-center gap-1"><Clock size={13} className="text-primary" /> {experience}</span>
              <span className="flex items-center gap-1"><Star size={13} className="text-accent fill-accent/15" /> {rating} Rating</span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => setFollowing(prev => !prev)}
                className={`px-5 py-2 text-xs font-semibold rounded transition-all shadow-sm ${
                  following 
                    ? 'bg-success text-white' 
                    : 'bg-primary text-white hover:bg-primary-hover'
                }`}
              >
                {following ? (
                  <span className="flex items-center gap-1">
                    <Check size={12} />
                    <span>Following</span>
                  </span>
                ) : 'Follow Artisan'}
              </button>
              <button
                onClick={() => toggleSaveArtisan(artisan)}
                className={`px-4 py-2 text-xs font-semibold rounded border transition-all ${
                  isSaved
                    ? 'bg-error-light/35 border-error text-error'
                    : 'bg-white border-border text-muted-foreground hover:bg-secondary'
                }`}
              >
                {isSaved ? 'Artisan Saved' : 'Save Artisan'}
              </button>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-5 flex gap-8 shadow-sm flex-shrink-0 text-center text-xs">
            <div>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Followers</span>
              <span className="text-lg font-bold text-foreground mt-1 block">
                {followersCount}
              </span>
            </div>
            <div className="border-l border-border pr-2" />
            <div>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Products</span>
              <span className="text-lg font-bold text-foreground mt-1 block">{artisanProducts.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sidebar Bio Info */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-border rounded-lg p-6 space-y-6 shadow-sm">
              <h3 className="font-serif font-semibold text-lg text-foreground border-b border-border pb-3">Artisan Biography</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {artisan.bio || "Preserving traditional handloom weaving heritage and crafting authentic textiles with skill and dedication."}
              </p>
              
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">Craft Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((spec: string) => (
                    <Badge key={spec} variant="default" size="sm">{spec}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Awards & Achievements */}
            {((artisan.awards && artisan.awards.length > 0) || (artisan.achievements && artisan.achievements.length > 0)) && (
              <div className="bg-white border border-border rounded-lg p-6 space-y-6 shadow-sm">
                <h3 className="font-serif font-semibold text-lg text-foreground border-b border-border pb-3">Awards & Recognition</h3>
                
                {artisan.awards && artisan.awards.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wide flex items-center gap-1.5">
                      <Award size={14} className="text-accent" />
                      <span>Artisan Awards</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      {artisan.awards.map((aw: string) => (
                        <li key={aw} className="flex gap-2 items-start">
                          <Check size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>{aw}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {artisan.achievements && artisan.achievements.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wide flex items-center gap-1.5">
                      <Calendar size={14} className="text-accent" />
                      <span>Workshop Milestones</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      {artisan.achievements.map((ach: string) => (
                        <li key={ach} className="flex gap-2 items-start">
                          <Check size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </aside>

          {/* Main Products Grid */}
          <main className="lg:col-span-8 space-y-8">
            <div className="border-b border-border pb-4 flex justify-between items-baseline">
              <h2 className="font-serif font-semibold text-xl text-foreground">Artisan's Handlooms</h2>
              <span className="text-xs text-muted-foreground font-semibold">{artisanProducts.length} items listed</span>
            </div>

            {artisanProducts.length === 0 ? (
              <div className="bg-white border border-border rounded-lg p-16 text-center space-y-3">
                <span className="text-2xl">🧶</span>
                <h4 className="font-semibold text-foreground">No Active Listings</h4>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">This weaver's workshop doesn't have any public marketplace products listed currently.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {artisanProducts.map(product => (
                  <article key={product.id} className="group bg-white border border-border rounded-lg overflow-hidden hover:shadow transition-all flex flex-col h-full">
                    <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
                      <Image
                        src={product.image && (product.image.startsWith('http') || product.image.startsWith('/') || product.image.startsWith('data:')) ? product.image : `/assets/images/${product.image || 'banarasi-saree.png'}`}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`absolute top-3 right-3 w-8.5 h-8.5 rounded-full bg-white/90 shadow flex items-center justify-center text-muted-foreground hover:text-error transition-all ${
                          isWishlisted(product.id) ? 'text-error' : ''
                        }`}
                      >
                        <Heart size={16} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <Link href={`/marketplace/${product.slug}`} className="block">
                          <h3 className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted-foreground">Fabric: {product.fabric}</p>
                      </div>

                      <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                        <span className="font-bold text-foreground">{formatPrice(product.price)}</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="text-xs bg-primary-light text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-md font-semibold transition-all"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
