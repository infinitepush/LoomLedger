import { Request, Response, NextFunction } from 'express';
export declare class StoryController {
    list(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBySlug(req: Request, res: Response, next: NextFunction): Promise<void>;
    generate(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const storyController: StoryController;
//# sourceMappingURL=story.controller.d.ts.map