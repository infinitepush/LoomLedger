import { Prisma } from '@prisma/client';
export declare class ArtisanRepository {
    findById(id: string): Promise<({
        user: {
            name: string;
            id: string;
            email: string;
            phone: string | null;
            passwordHash: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            avatar: string | null;
            isActive: boolean;
            emailVerified: boolean;
            googleId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        status: import(".prisma/client").$Enums.ArtisanStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        craft: string;
        experience: string;
        region: string;
        district: string | null;
        state: string | null;
        bio: string | null;
        giCertified: boolean;
        giNumber: string | null;
        verified: boolean;
        followersCount: number;
        walletAddress: string | null;
        verificationHash: string | null;
        govtIdUrl: string | null;
    }) | null>;
    findByUserId(userId: string): Promise<({
        user: {
            name: string;
            id: string;
            email: string;
            phone: string | null;
            passwordHash: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            avatar: string | null;
            isActive: boolean;
            emailVerified: boolean;
            googleId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        status: import(".prisma/client").$Enums.ArtisanStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        craft: string;
        experience: string;
        region: string;
        district: string | null;
        state: string | null;
        bio: string | null;
        giCertified: boolean;
        giNumber: string | null;
        verified: boolean;
        followersCount: number;
        walletAddress: string | null;
        verificationHash: string | null;
        govtIdUrl: string | null;
    }) | null>;
    create(data: Prisma.ArtisanCreateInput): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
            phone: string | null;
            passwordHash: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            avatar: string | null;
            isActive: boolean;
            emailVerified: boolean;
            googleId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        status: import(".prisma/client").$Enums.ArtisanStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        craft: string;
        experience: string;
        region: string;
        district: string | null;
        state: string | null;
        bio: string | null;
        giCertified: boolean;
        giNumber: string | null;
        verified: boolean;
        followersCount: number;
        walletAddress: string | null;
        verificationHash: string | null;
        govtIdUrl: string | null;
    }>;
    update(id: string, data: Prisma.ArtisanUpdateInput): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
            phone: string | null;
            passwordHash: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            avatar: string | null;
            isActive: boolean;
            emailVerified: boolean;
            googleId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        status: import(".prisma/client").$Enums.ArtisanStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        craft: string;
        experience: string;
        region: string;
        district: string | null;
        state: string | null;
        bio: string | null;
        giCertified: boolean;
        giNumber: string | null;
        verified: boolean;
        followersCount: number;
        walletAddress: string | null;
        verificationHash: string | null;
        govtIdUrl: string | null;
    }>;
    list(where?: Prisma.ArtisanWhereInput, orderBy?: Prisma.ArtisanOrderByWithRelationInput, skip?: number, take?: number): Promise<({
        user: {
            name: string;
            id: string;
            email: string;
            phone: string | null;
            passwordHash: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            avatar: string | null;
            isActive: boolean;
            emailVerified: boolean;
            googleId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        status: import(".prisma/client").$Enums.ArtisanStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        craft: string;
        experience: string;
        region: string;
        district: string | null;
        state: string | null;
        bio: string | null;
        giCertified: boolean;
        giNumber: string | null;
        verified: boolean;
        followersCount: number;
        walletAddress: string | null;
        verificationHash: string | null;
        govtIdUrl: string | null;
    })[]>;
    count(where?: Prisma.ArtisanWhereInput): Promise<number>;
}
export declare const artisanRepository: ArtisanRepository;
//# sourceMappingURL=artisan.repository.d.ts.map