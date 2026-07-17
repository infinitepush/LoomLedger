export declare class StoryService {
    listStories(): Promise<{
        id: any;
        title: any;
        slug: any;
        excerpt: any;
        content: any;
        image: any;
        readTime: any;
        weaver: {
            id: any;
            name: any;
            avatar: any;
            craft: any;
            region: any;
        };
    }[]>;
    getStoryBySlug(slug: string): Promise<{
        id: any;
        title: any;
        slug: any;
        excerpt: any;
        content: any;
        image: any;
        readTime: any;
        weaver: {
            id: any;
            name: any;
            avatar: any;
            craft: any;
            region: any;
        };
    }>;
    generateArtisanStory(artisanId: string): Promise<{
        id: any;
        title: any;
        slug: any;
        excerpt: any;
        content: any;
        image: any;
        readTime: any;
        weaver: {
            id: any;
            name: any;
            avatar: any;
            craft: any;
            region: any;
        };
    }>;
    private mapStory;
}
export declare const storyService: StoryService;
//# sourceMappingURL=story.service.d.ts.map