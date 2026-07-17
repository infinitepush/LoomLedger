"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = requireRole;
const errors_1 = require("../utils/errors");
function requireRole(...roles) {
    return (req, _res, next) => {
        if (!req.user) {
            return next(new errors_1.ForbiddenError('Authentication required'));
        }
        if (!roles.includes(req.user.role)) {
            return next(new errors_1.ForbiddenError(`Access restricted to: ${roles.join(', ')}`));
        }
        next();
    };
}
//# sourceMappingURL=role.middleware.js.map