"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const prisma_1 = require("../database/prisma");
const password_1 = require("../auth/password");
const jwt_1 = require("../auth/jwt");
const errors_1 = require("../utils/errors");
const uuid_1 = require("uuid");
class AuthService {
    async registerBuyer(input) {
        const existing = await prisma_1.prisma.user.findUnique({ where: { email: input.email } });
        if (existing)
            throw new errors_1.ConflictError('Email already registered');
        const passwordHash = await (0, password_1.hashPassword)(input.password);
        const user = await prisma_1.prisma.user.create({
            data: {
                name: input.name,
                email: input.email,
                phone: input.phone,
                passwordHash,
                role: 'buyer',
                emailVerified: true,
            },
        });
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        return {
            user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
            ...tokens,
        };
    }
    async registerArtisan(input) {
        const existing = await prisma_1.prisma.user.findUnique({ where: { email: input.email } });
        if (existing)
            throw new errors_1.ConflictError('Email already registered');
        const passwordHash = await (0, password_1.hashPassword)(input.password);
        const walletAddress = '0x' + ((0, uuid_1.v4)().replace(/-/g, '') + (0, uuid_1.v4)().replace(/-/g, '')).substring(0, 40);
        const verificationHash = '0x' + (0, uuid_1.v4)().replace(/-/g, '') + (0, uuid_1.v4)().replace(/-/g, '').substring(0, 24);
        const user = await prisma_1.prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    phone: input.phone,
                    passwordHash,
                    role: 'artisan',
                    emailVerified: true,
                },
            });
            await tx.artisan.create({
                data: {
                    userId: newUser.id,
                    craft: input.craft,
                    experience: input.experience,
                    region: `${input.district}, ${input.state}`,
                    district: input.district,
                    state: input.state,
                    bio: input.bio,
                    giCertified: !!input.giNumber,
                    giNumber: input.giNumber || null,
                    status: 'pending',
                    verified: false,
                    walletAddress,
                    verificationHash,
                },
            });
            return newUser;
        });
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        return {
            user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
            artisanId: user.id,
            walletAddress,
            txHash: verificationHash,
            ...tokens,
        };
    }
    async login(input) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { email: input.email },
            include: { artisan: true },
        });
        if (!user)
            throw new errors_1.UnauthorizedError('Invalid email or password');
        if (!user.passwordHash)
            throw new errors_1.UnauthorizedError('Please use Google login');
        if (!user.isActive)
            throw new errors_1.UnauthorizedError('Account is deactivated');
        const valid = await (0, password_1.comparePassword)(input.password, user.passwordHash);
        if (!valid)
            throw new errors_1.UnauthorizedError('Invalid email or password');
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                phone: user.phone,
                artisan: user.artisan ? {
                    id: user.artisan.id,
                    craft: user.artisan.craft,
                    verified: user.artisan.verified,
                    walletAddress: user.artisan.walletAddress,
                    verificationHash: user.artisan.verificationHash,
                    region: user.artisan.region,
                    giCertified: user.artisan.giCertified,
                    giNumber: user.artisan.giNumber,
                } : undefined,
            },
            ...tokens,
        };
    }
    async refreshToken(token) {
        const stored = await prisma_1.prisma.refreshToken.findUnique({ where: { token } });
        if (!stored)
            throw new errors_1.UnauthorizedError('Invalid refresh token');
        if (stored.expiresAt < new Date()) {
            await prisma_1.prisma.refreshToken.delete({ where: { id: stored.id } });
            throw new errors_1.UnauthorizedError('Refresh token expired');
        }
        const payload = (0, jwt_1.verifyRefreshToken)(token);
        await prisma_1.prisma.refreshToken.delete({ where: { id: stored.id } });
        const user = await prisma_1.prisma.user.findUnique({ where: { id: payload.userId } });
        if (!user)
            throw new errors_1.NotFoundError('User not found');
        return this.generateTokens(user.id, user.email, user.role);
    }
    async logout(token) {
        await prisma_1.prisma.refreshToken.deleteMany({ where: { token } });
    }
    async getMe(userId) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            include: { artisan: true },
        });
        if (!user)
            throw new errors_1.NotFoundError('User not found');
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            createdAt: user.createdAt,
            artisan: user.artisan ? {
                id: user.artisan.id,
                craft: user.artisan.craft,
                experience: user.artisan.experience,
                region: user.artisan.region,
                bio: user.artisan.bio,
                verified: user.artisan.verified,
                status: user.artisan.status,
                walletAddress: user.artisan.walletAddress,
                verificationHash: user.artisan.verificationHash,
                giCertified: user.artisan.giCertified,
                giNumber: user.artisan.giNumber,
                followersCount: user.artisan.followersCount,
            } : undefined,
        };
    }
    async generateTokens(userId, email, role) {
        let artisanId;
        if (role === 'artisan') {
            const artisan = await prisma_1.prisma.artisan.findUnique({ where: { userId } });
            if (artisan) {
                artisanId = artisan.id;
            }
        }
        const payload = { userId, email, role, artisanId };
        const accessToken = (0, jwt_1.signAccessToken)(payload);
        const refreshToken = (0, jwt_1.signRefreshToken)(payload);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await prisma_1.prisma.refreshToken.create({
            data: { token: refreshToken, userId, expiresAt },
        });
        return { accessToken, refreshToken };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map