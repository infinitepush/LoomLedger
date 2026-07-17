"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const prisma_1 = require("../database/prisma");
class UserRepository {
    async findById(id) {
        return prisma_1.prisma.user.findUnique({
            where: { id },
            include: { artisan: true },
        });
    }
    async findByEmail(email) {
        return prisma_1.prisma.user.findUnique({
            where: { email },
            include: { artisan: true },
        });
    }
    async create(data) {
        return prisma_1.prisma.user.create({ data });
    }
    async update(id, data) {
        return prisma_1.prisma.user.update({
            where: { id },
            data,
            include: { artisan: true },
        });
    }
    async delete(id) {
        return prisma_1.prisma.user.delete({ where: { id } });
    }
    async list(where, orderBy, skip, take) {
        return prisma_1.prisma.user.findMany({
            where,
            orderBy,
            skip,
            take,
            include: { artisan: true },
        });
    }
    async count(where) {
        return prisma_1.prisma.user.count({ where });
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map