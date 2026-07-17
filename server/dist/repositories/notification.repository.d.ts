import { Prisma } from '@prisma/client';
export declare class NotificationRepository {
    create(data: Prisma.NotificationCreateInput): Promise<{
        message: string;
        type: string;
        link: string | null;
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        read: boolean;
    }>;
    findByUserId(userId: string): Promise<{
        message: string;
        type: string;
        link: string | null;
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        read: boolean;
    }[]>;
    markAsRead(id: string): Promise<{
        message: string;
        type: string;
        link: string | null;
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        read: boolean;
    }>;
    markAllAsRead(userId: string): Promise<Prisma.BatchPayload>;
}
export declare const notificationRepository: NotificationRepository;
//# sourceMappingURL=notification.repository.d.ts.map