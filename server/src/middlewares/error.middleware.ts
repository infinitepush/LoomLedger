import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../utils/errors';
import { logger } from '../utils/logger';
import { sendError } from '../utils/response';

export function errorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ValidationError) {
    sendError(res, err.message, err.statusCode, err.errors);
    return;
  }

  if (err instanceof AppError) {
    if (!err.isOperational) {
      logger.error(`Non-operational error: ${err.message}`, { stack: err.stack });
    }
    sendError(res, err.message, err.statusCode);
    return;
  }

  // Prisma known errors
  if ((err as any).code === 'P2002') {
    sendError(res, 'A record with this value already exists', 409);
    return;
  }
  if ((err as any).code === 'P2025') {
    sendError(res, 'Record not found', 404);
    return;
  }

  // Multer errors
  if (err.message === 'File too large') {
    sendError(res, 'File size exceeds the 5MB limit', 413);
    return;
  }

  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack, url: req.url, method: req.method });
  sendError(res, 'Internal Server Error', 500);
}

export function notFoundHandler(req: Request, res: Response): void {
  sendError(res, `Route ${req.method} ${req.originalUrl} not found`, 404);
}
