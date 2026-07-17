import { storyRepository } from '../repositories/story.repository';
import { artisanRepository } from '../repositories/artisan.repository';
import { generateSlug } from '../utils/slugify';
import { geminiService } from '../ai/gemini';
import { NotFoundError } from '../utils/errors';
import { prisma } from '../database/prisma';

export class StoryService {
  async listStories() {
    const stories = await storyRepository.list({ published: true });
    return stories.map(s => this.mapStory(s));
  }

  async getStoryBySlug(slug: string) {
    const story = await storyRepository.findBySlug(slug);
    if (!story) throw new NotFoundError('Story not found');
    return this.mapStory(story);
  }

  async generateArtisanStory(artisanId: string) {
    const artisan = await prisma.artisan.findUnique({
      where: { id: artisanId },
      include: { user: true },
    });
    if (!artisan) throw new NotFoundError('Artisan profile not found');

    const generatedText = await geminiService.generateArtisanStory(
      artisan.user.name,
      artisan.craft,
      artisan.region
    );

    const slug = generateSlug(`${artisan.user.name}-heritage`);
    const excerpt = generatedText.substring(0, 150) + '...';

    // Create the story
    const story = await prisma.story.create({
      data: {
        title: `${artisan.user.name}'s Loom Heritage Story`,
        slug,
        excerpt,
        content: generatedText,
        coverImage: 'weaver-portrait.png',
        readTime: '3 min read',
        artisanId: artisan.id,
      },
    });

    return this.mapStory(story);
  }

  private mapStory(s: any) {
    return {
      id: s.id,
      title: s.title,
      slug: s.slug,
      excerpt: s.excerpt,
      content: s.content,
      image: s.coverImage,
      readTime: s.readTime || '3 min read',
      weaver: {
        id: s.artisan?.userId || s.artisanId,
        name: s.artisan?.user?.name || 'Master Artisan',
        avatar: s.artisan?.user?.avatar || 'weaver-portrait.png',
        craft: s.artisan?.craft || 'Handloom Weaver',
        region: s.artisan?.region || 'India',
      },
    };
  }
}

export const storyService = new StoryService();
