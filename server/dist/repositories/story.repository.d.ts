import { Prisma } from '@prisma/client';
export declare class StoryRepository {
    findById(id: string): Promise<({
        artisan: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        artisanId: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        coverImage: string;
        readTime: string | null;
        published: boolean;
    }) | null>;
    findBySlug(slug: string): Promise<({
        artisan: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        artisanId: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        coverImage: string;
        readTime: string | null;
        published: boolean;
    }) | null>;
    create(data: Prisma.StoryCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        artisanId: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        coverImage: string;
        readTime: string | null;
        published: boolean;
    }>;
    update(id: string, data: Prisma.StoryUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        artisanId: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        coverImage: string;
        readTime: string | null;
        published: boolean;
    }>;
    list(where?: Prisma.StoryWhereInput, orderBy?: Prisma.StoryOrderByWithRelationInput, skip?: number, take?: number): Promise<({
        artisan: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        artisanId: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        coverImage: string;
        readTime: string | null;
        published: boolean;
    })[]>;
    count(where?: Prisma.StoryWhereInput): Promise<number>;
}
export declare const storyRepository: StoryRepository;
//# sourceMappingURL=story.repository.d.ts.map