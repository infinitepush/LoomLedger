"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const logger_1 = require("./utils/logger");
const prisma_1 = require("./database/prisma");
const server = app_1.default.listen(env_1.env.PORT, () => {
    logger_1.logger.info(`🚀 Server running in ${env_1.env.NODE_ENV} mode on port ${env_1.env.PORT}`);
});
// Handle graceful shutdowns
const shutdown = async () => {
    logger_1.logger.info('Shutting down server gracefully...');
    server.close(async () => {
        logger_1.logger.info('HTTP server closed.');
        await prisma_1.prisma.$disconnect();
        logger_1.logger.info('Database connections closed.');
        process.exit(0);
    });
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('unhandledRejection', (reason, promise) => {
    logger_1.logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (error) => {
    logger_1.logger.error('Uncaught Exception:', error);
});
//# sourceMappingURL=server.js.map