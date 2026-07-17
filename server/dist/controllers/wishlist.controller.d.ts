import { Request, Response, NextFunction } from 'express';
export declare class WishlistController {
    get(req: Request, res: Response, next: NextFunction): Promise<void>;
    toggle(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const wishlistController: WishlistController;
//# sourceMappingURL=wishlist.controller.d.ts.map