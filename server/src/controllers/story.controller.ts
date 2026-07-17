import { Request, Response, NextFunction } from 'express';
import { storyService } from '../services/story.service';
import { sendSuccess } from '../utils/response';

export class StoryController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const stories = await storyService.listStories();
      sendSuccess(res, stories);
    } catch (error) {
      next(error);
    }
  }

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const story = await storyService.getStoryBySlug(req.params.slug);
      sendSuccess(res, story);
    } catch (error) {
      next(error);
    }
  }

  async generate(req: Request, res: Response, next: NextFunction) {
    try {
      const artisanId = req.user?.artisanId;
      const story = await storyService.generateArtisanStory(artisanId!);
      sendSuccess(res, story, 'AI story generated and published successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const storyController = new StoryController();
