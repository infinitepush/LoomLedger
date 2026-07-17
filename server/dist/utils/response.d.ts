import { Response } from 'express';
export declare function sendSuccess<T>(res: Response, data: T, message?: string, statusCode?: number): void;
export declare function sendPaginated<T>(res: Response, data: T[], total: number, page: number, limit: number, message?: string): void;
export declare function sendError(res: Response, message: string, statusCode?: number, errors?: Record<string, string[]>): void;
export declare function getPaginationParams(query: Record<string, unknown>): {
    page: number;
    limit: number;
    skip: number;
};
//# sourceMappingURL=response.d.ts.map