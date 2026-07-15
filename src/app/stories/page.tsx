"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Clock, Heart, Search } from 'lucide-react';
import { mockStories } from '@/data/mockData';
import Badge from '@/components/ui/Badge';

export default function StoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Featured story (first one)
  const featuredStory = mockStories[0];
  // Rest of stories
  const otherStories = mockStories.slice(1);

  const filteredStories = mockStories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.artisanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 bg-background flex-grow">
      <div className="container">
        
        {/* Page header */}
        <div className="mb-10 text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-light text-primary text-xs font-semibold rounded-full border border-primary/10">
            <BookOpen size={14} />
            <span>AI Storytelling Platform</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground">Weaver Chronicles</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every thread has a story, and every weaver preserves a legacy. Journey through India's ancient weaving clusters, documented through interactive weaver profiles.
          </p>
        </div>

        {/* Featured Story Banner (Netflix style) */}
        {featuredStory && !searchTerm && (
          <div className="bg-white border border-border rounded-xl overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12 gap-0 mb-16 hover:shadow-lg transition-shadow">
            <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[300px]">
              <Image
                src={featuredStory.coverImage}
                alt={featuredStory.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:hidden" />
            </div>
            
            <div className="p-6 sm:p-10 lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="saffron" size="sm">Featured Story</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} />
                    <span>5 min read</span>
                  </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-semibold text-foreground leading-tight">
                  {featuredStory.title}
                </h2>
                
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {featuredStory.excerpt}
                </p>
                
                <div className="flex items-center gap-3 pt-2">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-secondary">
                    <Image src="/assets/images/weaver-portrait.png" alt={featuredStory.artisanName} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{featuredStory.artisanName}</p>
                    <p className="text-[10px] text-muted-foreground">{featuredStory.region}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <Link href={`/stories/${featuredStory.slug}`} className="px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors shadow flex items-center gap-1.5">
                  <span>Read Full Chronicle</span>
                  <ArrowRight size={14} />
                </Link>
                <Link href={`/artisan/${featuredStory.artisanId}`} className="text-xs text-primary font-bold hover:underline">
                  Visit Workshop
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search stories by weaver or craft region..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-border pl-10 pr-4 py-2.5 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
          />
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map(story => (
            <article key={story.slug} className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="relative aspect-[16/10] bg-secondary">
                  <Image src={story.coverImage} alt={story.title} fill className="object-cover" />
                </div>
                
                <div className="px-6 space-y-2">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-widest block">{story.region.split(',')[0]}</span>
                  <Link href={`/stories/${story.slug}`}>
                    <h3 className="font-serif font-semibold text-lg text-foreground line-clamp-2 hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{story.excerpt}</p>
                </div>
              </div>

              <div className="px-6 py-4 mt-6 border-t border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-secondary">
                    <Image src="/assets/images/weaver-portrait.png" alt={story.artisanName} fill className="object-cover" />
                  </div>
                  <span className="font-semibold text-foreground">{story.artisanName}</span>
                </div>
                <Link href={`/stories/${story.slug}`} className="text-primary font-bold hover:underline flex items-center gap-1">
                  <span>Read</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
