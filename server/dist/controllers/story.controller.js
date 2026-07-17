"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyController = exports.StoryController = void 0;
const story_service_1 = require("../services/story.service");
const response_1 = require("../utils/response");
class StoryController {
    async list(req, res, next) {
        try {
            const stories = await story_service_1.storyService.listStories();
            (0, response_1.sendSuccess)(res, stories);
        }
        catch (error) {
            next(error);
        }
    }
    async getBySlug(req, res, next) {
        try {
            const story = await story_service_1.storyService.getStoryBySlug(req.params.slug);
            (0, response_1.sendSuccess)(res, story);
        }
        catch (error) {
            next(error);
        }
    }
    async generate(req, res, next) {
        try {
            const artisanId = req.user?.artisanId;
            const story = await story_service_1.storyService.generateArtisanStory(artisanId);
            (0, response_1.sendSuccess)(res, story, 'AI story generated and published successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.StoryController = StoryController;
exports.storyController = new StoryController();
//# sourceMappingURL=story.controller.js.map