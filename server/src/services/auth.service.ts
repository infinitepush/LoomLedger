import { prisma } from '../database/prisma';
import { hashPassword, comparePassword } from '../auth/password';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../auth/jwt';
import { JwtPayload } from '../middlewares/auth.middleware';
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '../utils/errors';
import { RegisterBuyerInput, RegisterArtisanInput, LoginInput } from '../validators/auth.validator';
import { v4 as uuidv4 } from 'uuid';

export class AuthService {
  async registerBuyer(input: RegisterBuyerInput) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) throw new ConflictError('Email already registered');

    const passwordHash = await hashPassword(input.password);
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        passwordHash,
        role: 'buyer',
        emailVerified: true,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role as any);
    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
      ...tokens,
    };
  }

  async registerArtisan(input: RegisterArtisanInput) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) throw new ConflictError('Email already registered');

    const passwordHash = await hashPassword(input.password);
    const walletAddress = '0x' + (uuidv4().replace(/-/g, '') + uuidv4().replace(/-/g, '')).substring(0, 40);
    const verificationHash = '0x' + uuidv4().replace(/-/g, '') + uuidv4().replace(/-/g, '').substring(0, 24);

    const user = await prisma.$transaction(async (tx) => {
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

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { artisan: true },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role as any);
    return {
      user: {
        id: fullUser!.id,
        name: fullUser!.name,
        email: fullUser!.email,
        role: fullUser!.role,
        avatar: fullUser!.avatar,
        phone: fullUser!.phone,
        artisan: fullUser!.artisan ? {
          id: fullUser!.artisan.id,
          craft: fullUser!.artisan.craft,
          experience: fullUser!.artisan.experience,
          region: fullUser!.artisan.region,
          bio: fullUser!.artisan.bio,
          verified: fullUser!.artisan.verified,
          walletAddress: fullUser!.artisan.walletAddress,
          verificationHash: fullUser!.artisan.verificationHash,
          giCertified: fullUser!.artisan.giCertified,
          giNumber: fullUser!.artisan.giNumber,
        } : undefined,
      },
      artisanId: fullUser?.artisan?.id || user.id,
      walletAddress,
      txHash: verificationHash,
      ...tokens,
    };
  }

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
      include: { artisan: true },
    });
    if (!user) throw new UnauthorizedError('Invalid email or password');
    if (!user.passwordHash) throw new UnauthorizedError('Please use Google login');
    if (!user.isActive) throw new UnauthorizedError('Account is deactivated');

    const valid = await comparePassword(input.password, user.passwordHash);
    if (!valid) throw new UnauthorizedError('Invalid email or password');

    const tokens = await this.generateTokens(user.id, user.email, user.role as any);
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

  async refreshToken(token: string) {
    const stored = await prisma.refreshToken.findUnique({ where: { token } });
    if (!stored) throw new UnauthorizedError('Invalid refresh token');
    if (stored.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { id: stored.id } });
      throw new UnauthorizedError('Refresh token expired');
    }

    const payload = verifyRefreshToken(token);
    await prisma.refreshToken.delete({ where: { id: stored.id } });

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) throw new NotFoundError('User not found');

    return this.generateTokens(user.id, user.email, user.role as any);
  }

  async logout(token: string) {
    await prisma.refreshToken.deleteMany({ where: { token } });
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { artisan: true },
    });
    if (!user) throw new NotFoundError('User not found');

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

  async updateProfile(userId: string, input: { name?: string; phone?: string; avatar?: string; bio?: string; craft?: string }) {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(input.name && { name: input.name }),
        ...(input.phone && { phone: input.phone }),
        ...(input.avatar && { avatar: input.avatar }),
      },
      include: { artisan: true },
    });

    if (updatedUser.artisan && (input.bio || input.craft)) {
      await prisma.artisan.update({
        where: { id: updatedUser.artisan.id },
        data: {
          ...(input.bio && { bio: input.bio }),
          ...(input.craft && { craft: input.craft }),
        },
      });
    }

    return this.getMe(userId);
  }

  private async generateTokens(userId: string, email: string, role: JwtPayload['role']) {
    let artisanId: string | undefined;
    if (role === 'artisan') {
      const artisan = await prisma.artisan.findUnique({ where: { userId } });
      if (artisan) {
        artisanId = artisan.id;
      }
    }

    const payload: JwtPayload = { userId, email, role, artisanId };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: { token: refreshToken, userId, expiresAt },
    });

    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
