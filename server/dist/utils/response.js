"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendPaginated = sendPaginated;
exports.sendError = sendError;
exports.getPaginationParams = getPaginationParams;
function sendSuccess(res, data, message = 'Success', statusCode = 200) {
    const response = { success: true, message, data };
    res.status(statusCode).json(response);
}
function sendPaginated(res, data, total, page, limit, message = 'Success') {
    const totalPages = Math.ceil(total / limit);
    const response = {
        success: true,
        message,
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        },
    };
    res.status(200).json(response);
}
function sendError(res, message, statusCode = 500, errors) {
    const response = { success: false, message, meta: errors ? { errors } : undefined };
    res.status(statusCode).json(response);
}
function getPaginationParams(query) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 12));
    const skip = (page - 1) * limit;
    return { page, limit, skip };
}
//# sourceMappingURL=response.js.map