import { Request, Response, NextFunction } from 'express';
export declare class AdminController {
    listPending(req: Request, res: Response, next: NextFunction): Promise<void>;
    approve(req: Request, res: Response, next: NextFunction): Promise<void>;
    reject(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteArtisan(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const adminController: AdminController;
//# sourceMappingURL=admin.controller.d.ts.map