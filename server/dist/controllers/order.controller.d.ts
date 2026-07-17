import { Request, Response, NextFunction } from 'express';
export declare class OrderController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    listBuyer(req: Request, res: Response, next: NextFunction): Promise<void>;
    listArtisan(req: Request, res: Response, next: NextFunction): Promise<void>;
    getDetail(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const orderController: OrderController;
//# sourceMappingURL=order.controller.d.ts.map