"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, BookOpen, Clock, Heart, MapPin, Share2 } from 'lucide-react';
import { mockStories } from '@/data/mockData';
import Badge from '@/components/ui/Badge';

export default function StoryDetailPage() {
  const { slug } = useParams();

  const story = useMemo(() => {
    return mockStories.find(s => s.slug === slug) || mockStories[0];
  }, [slug]);

  if (!story) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2>Story not found</h2>
        <Link href="/stories" className="text-primary font-bold">Back to Stories</Link>
      </div>
    );
  }

  return (
    <div className="py-8 bg-background flex-grow">
      <div className="container max-w-4xl">
        
        {/* Navigation back */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/stories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-semibold">
            <ArrowLeft size={16} />
            <span>Back to Chronicles</span>
          </Link>
          <button className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary">
            <Share2 size={16} />
          </button>
        </div>

        {/* Story Head */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <Badge variant="indigo" size="sm">{story.region.split(',')[0]}</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock size={12} />
              <span>5 min read</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-foreground leading-tight">
            {story.title}
          </h1>

          <div className="flex items-center gap-3 pt-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary">
              <Image src="/assets/images/weaver-portrait.png" alt={story.artisanName} fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Written in collaboration with {story.artisanName}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin size={10} />
                <span>Master Weaver workshop, {story.region}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border shadow-md mb-10">
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Narrative Content */}
        <article className="prose prose-stone max-w-none mb-16 text-foreground/90 space-y-6 leading-relaxed text-base">
          {story.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('"') || paragraph.startsWith('“')) {
              return (
                <blockquote key={i} className="border-l-4 border-primary pl-6 py-1 my-6 italic text-lg text-foreground font-serif leading-relaxed">
                  {paragraph}
                </blockquote>
              );
            }
            return (
              <p key={i}>
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Handloom Craft Process Steps */}
        <div className="bg-white border border-border rounded-xl p-6 sm:p-8 space-y-8 shadow-sm mb-16">
          <div className="space-y-2 border-b border-border pb-4">
            <h3 className="text-xl font-serif font-semibold text-foreground">The Handloom Craft Process</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Detailed steps taken by the weaver to finalize this specific craft style.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {story.craftProcess.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-base flex-shrink-0 shadow-sm">
                  {step.step}
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground">{step.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Showcase */}
        {story.gallery && story.gallery.length > 0 && (
          <div className="space-y-4 mb-16">
            <h3 className="text-lg font-serif font-semibold text-foreground">Weave Details & Swatches</h3>
            <div className="grid grid-cols-3 gap-4">
              {story.gallery.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-border bg-secondary shadow-sm">
                  <Image
                    src={img}
                    alt={`${story.artisanName} swatch view ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-[#2D3A5C] text-white p-8 rounded-xl text-center space-y-4">
          <h3 className="font-serif font-semibold text-xl">Support {story.artisanName}'s Workshop</h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto leading-relaxed">
            By purchasing a blockchain-verified saree or textile from their workshop, you directly fund sustainable local artisan livelihoods.
          </p>
          <div className="flex gap-4 justify-center pt-2">
            <Link href={`/artisan/${story.artisanId}`} className="px-6 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors shadow">
              View Artisan Profile
            </Link>
            <Link href="/marketplace" className="px-6 py-2 border border-white/20 text-white text-xs font-semibold rounded hover:bg-white/10 transition-all">
              Shop Marketplace
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
