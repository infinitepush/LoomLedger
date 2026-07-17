import { Request, Response, NextFunction } from 'express';
export declare class CartController {
    get(req: Request, res: Response, next: NextFunction): Promise<void>;
    add(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    remove(req: Request, res: Response, next: NextFunction): Promise<void>;
    clear(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const cartController: CartController;
//# sourceMappingURL=cart.controller.d.ts.map