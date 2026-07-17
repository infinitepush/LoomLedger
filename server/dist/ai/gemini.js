"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiService = exports.GeminiService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const env_1 = require("../config/env");
const logger_1 = require("../utils/logger");
class GeminiService {
    ai = null;
    constructor() {
        this.initialize();
    }
    initialize() {
        if (env_1.env.GEMINI_API_KEY) {
            try {
                this.ai = new generative_ai_1.GoogleGenerativeAI(env_1.env.GEMINI_API_KEY);
                logger_1.logger.info('Gemini AI Service initialized successfully.');
            }
            catch (err) {
                logger_1.logger.error('Failed to initialize Gemini SDK:', err);
            }
        }
    }
    async askAssistantFallback(question) {
        if (this.ai) {
            try {
                const prompt = `You are the LoomLedger Assistant, a helpful AI chatbot for a blockchain-verified Indian handloom platform.
The user asked: "${question}"

Please provide a highly detailed, professional, and helpful response about LoomLedger:
- Artisans can register with their details, region, craft type, and optional Geographical Indication (GI) Certification number (which is recorded on Polygon blockchain).
- Buyers can purchase authentic, verified handloom products directly from weavers.
- Each product gets a Digital Passport (NFT) minted on Polygon containing IPFS metadata, weaver details, thread count, and yarn sourcing timeline.
- Users can scan QR codes to verify authenticity.
- If the question is a greeting, respond in a warm, welcoming manner.
- If the question is about registration, explain steps: register -> select Weaver/Buyer role -> verify details.

Provide a concise, helpful response (max 150 words).`;
                const model = this.ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
                const response = await model.generateContent({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }]
                });
                return response.response.text() || '';
            }
            catch (err) {
                logger_1.logger.error('Gemini assistant fallback failed:', err);
            }
        }
        return "To register as a weaver on LoomLedger:\n1. Open the LoomLedger app.\n2. Tap Sign Up/Register.\n3. Select Artisan/Weaver role.\n4. Fill in your details including name, region, and craft type.\n5. Submit your profile for admin verification and on-chain Polygon registration.";
    }
    async generateProductSpecs(productName, category) {
        if (this.ai) {
            try {
                const prompt = `You are an expert Indian Handloom textile storyteller.
        Generate product details for a traditional handloom item:
        Name: "${productName}"
        Category: "${category}"

        Provide the output in JSON format with exactly the following fields:
        {
          "description": "A compelling 3-4 sentence paragraph describing the weaver heritage, motifs used, and suitability.",
          "fabric": "Material details, e.g., '100% Pure Mulberry Silk' or 'Cotton Handspun Warp'",
          "craftTime": "Time taken on loom, e.g., '12 Days on Loom' or '4 Weeks'",
          "specifications": {
            "Dye Type": "Organic Natural Dyes / Tested Indigo Dyebath",
            "Loom Type": "Wooden Pit Loom / Hand-guided Frame Loom",
            "Zari Grade": "Real Zari / Metallic zari weave"
          },
          "tags": ["Tag1", "Tag2"]
        }`;
                const model = this.ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
                const response = await model.generateContent({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig: { responseMimeType: 'application/json' }
                });
                const text = response.response.text();
                if (text) {
                    const parsed = JSON.parse(text);
                    return {
                        description: parsed.description || '',
                        fabric: parsed.fabric || '',
                        craftTime: parsed.craftTime || '',
                        specifications: parsed.specifications || {},
                        tags: parsed.tags || [],
                    };
                }
            }
            catch (err) {
                logger_1.logger.error('Gemini call failed, using simulation fallback:', err);
            }
        }
        // High quality simulated description fallback
        return {
            description: `An authentic handwoven creation featuring intricate, traditional motifs. Inspired by generational weave patterns, this ${category} is crafted painstakingly using pure threads, creating a shimmering dual-tone effect suitable for weddings and grand festive celebrations.`,
            fabric: "Pure mulberry silk warp and weft",
            craftTime: "18 Days on Loom",
            specifications: {
                'Dye Type': 'Hand-dyed organic colors',
                'Loom Type': 'Traditional hand-operated wooden loom',
                'Zari Type': 'Tested golden zari borders',
                'Thread Count': '120/2 double ply silk'
            },
            tags: ['Pure Silk', 'Handwoven', 'Heritage Weave', category]
        };
    }
    async generateArtisanStory(name, craft, region) {
        if (this.ai) {
            try {
                const prompt = `Write a short, engaging 200-word heritage story about a master handloom weaver named ${name} who specializes in ${craft} from ${region}. Emphasize the history of their family, the loom, and preservation of tradition.`;
                const model = this.ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
                const response = await model.generateContent({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }]
                });
                return response.response.text() || '';
            }
            catch (err) {
                logger_1.logger.error('Gemini story call failed:', err);
            }
        }
        return `For over three generations, ${name}'s family has kept the rhythmic clatter of the pit looms alive in ${region}. Specializing in the delicate art of ${craft}, their loom tells a story of patience, where every single thread is placed by hand. "This is not just fabric," ${name} says. "It is our ancestry woven into patterns." Every design carries ancestral motifs passed down from parent to child, representing the absolute apex of Indian textile craftsmanship.`;
    }
}
exports.GeminiService = GeminiService;
exports.geminiService = new GeminiService();
//# sourceMappingURL=gemini.js.map