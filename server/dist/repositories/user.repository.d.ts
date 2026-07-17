import { Prisma } from '@prisma/client';
export declare class UserRepository {
    findById(id: string): Promise<({
        artisan: {
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
        } | null;
    } & {
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
    }) | null>;
    findByEmail(email: string): Promise<({
        artisan: {
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
        } | null;
    } & {
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
    }) | null>;
    create(data: Prisma.UserCreateInput): Promise<{
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
    }>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<{
        artisan: {
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
        } | null;
    } & {
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
    }>;
    delete(id: string): Promise<{
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
    }>;
    list(where?: Prisma.UserWhereInput, orderBy?: Prisma.UserOrderByWithRelationInput, skip?: number, take?: number): Promise<({
        artisan: {
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
        } | null;
    } & {
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
    })[]>;
    count(where?: Prisma.UserWhereInput): Promise<number>;
}
export declare const userRepository: UserRepository;
//# sourceMappingURL=user.repository.d.ts.map