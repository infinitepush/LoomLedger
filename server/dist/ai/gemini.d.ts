export declare class GeminiService {
    private ai;
    constructor();
    private initialize;
    askAssistantFallback(question: string): Promise<string>;
    generateProductSpecs(productName: string, category: string): Promise<{
        description: string;
        fabric: string;
        craftTime: string;
        specifications: Record<string, string>;
        tags: string[];
    }>;
    generateArtisanStory(name: string, craft: string, region: string): Promise<string>;
}
export declare const geminiService: GeminiService;
//# sourceMappingURL=gemini.d.ts.map