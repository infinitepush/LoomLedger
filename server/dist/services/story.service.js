"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyService = exports.StoryService = void 0;
const story_repository_1 = require("../repositories/story.repository");
const slugify_1 = require("../utils/slugify");
const gemini_1 = require("../ai/gemini");
const errors_1 = require("../utils/errors");
const prisma_1 = require("../database/prisma");
class StoryService {
    async listStories() {
        const stories = await story_repository_1.storyRepository.list({ published: true });
        return stories.map(s => this.mapStory(s));
    }
    async getStoryBySlug(slug) {
        const story = await story_repository_1.storyRepository.findBySlug(slug);
        if (!story)
            throw new errors_1.NotFoundError('Story not found');
        return this.mapStory(story);
    }
    async generateArtisanStory(artisanId) {
        const artisan = await prisma_1.prisma.artisan.findUnique({
            where: { id: artisanId },
            include: { user: true },
        });
        if (!artisan)
            throw new errors_1.NotFoundError('Artisan profile not found');
        const generatedText = await gemini_1.geminiService.generateArtisanStory(artisan.user.name, artisan.craft, artisan.region);
        const slug = (0, slugify_1.generateSlug)(`${artisan.user.name}-heritage`);
        const excerpt = generatedText.substring(0, 150) + '...';
        // Create the story
        const story = await prisma_1.prisma.story.create({
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
    mapStory(s) {
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
exports.StoryService = StoryService;
exports.storyService = new StoryService();
//# sourceMappingURL=story.service.js.map