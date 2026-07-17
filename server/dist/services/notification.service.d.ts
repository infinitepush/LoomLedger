export declare class NotificationService {
    getNotifications(userId: string): Promise<{
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
    markAllAsRead(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
export declare const notificationService: NotificationService;
//# sourceMappingURL=notification.service.d.ts.map