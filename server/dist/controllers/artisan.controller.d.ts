import { Request, Response, NextFunction } from 'express';
export declare class ArtisanController {
    getProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
    getStats(req: Request, res: Response, next: NextFunction): Promise<void>;
    list(req: Request, res: Response, next: NextFunction): Promise<void>;
    toggleSave(req: Request, res: Response, next: NextFunction): Promise<void>;
    getSaved(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const artisanController: ArtisanController;
//# sourceMappingURL=artisan.controller.d.ts.map