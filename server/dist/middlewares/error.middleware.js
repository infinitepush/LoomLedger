"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
exports.notFoundHandler = notFoundHandler;
const errors_1 = require("../utils/errors");
const logger_1 = require("../utils/logger");
const response_1 = require("../utils/response");
function errorMiddleware(err, req, res, _next) {
    if (err instanceof errors_1.ValidationError) {
        (0, response_1.sendError)(res, err.message, err.statusCode, err.errors);
        return;
    }
    if (err instanceof errors_1.AppError) {
        if (!err.isOperational) {
            logger_1.logger.error(`Non-operational error: ${err.message}`, { stack: err.stack });
        }
        (0, response_1.sendError)(res, err.message, err.statusCode);
        return;
    }
    // Prisma known errors
    if (err.code === 'P2002') {
        (0, response_1.sendError)(res, 'A record with this value already exists', 409);
        return;
    }
    if (err.code === 'P2025') {
        (0, response_1.sendError)(res, 'Record not found', 404);
        return;
    }
    // Multer errors
    if (err.message === 'File too large') {
        (0, response_1.sendError)(res, 'File size exceeds the 5MB limit', 413);
        return;
    }
    logger_1.logger.error(`Unhandled error: ${err.message}`, { stack: err.stack, url: req.url, method: req.method });
    (0, response_1.sendError)(res, 'Internal Server Error', 500);
}
function notFoundHandler(req, res) {
    (0, response_1.sendError)(res, `Route ${req.method} ${req.originalUrl} not found`, 404);
}
//# sourceMappingURL=error.middleware.js.map