import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/Notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { PrismasNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {

    constructor(
        private prismaService: PrismaService
    ) { }


    async create(notification: Notification): Promise<void> {
        const raw = PrismasNotificationMapper.toPrisma(notification);

        await this.prismaService.notification.create({
            data: raw,
        });
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prismaService.notification.count({
            where: {
                recipientId,
            },
        })

        return count;
    }

    async findById(notificationId: string): Promise<Notification> {
        const notification = await this.prismaService.notification.findUnique({
            where: {
                id: notificationId,
            }
        })

        if (!notification) {
            return null;
        }

        return PrismasNotificationMapper.toDomain(notification);
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = await this.prismaService.notification.findMany({
            where: {
                recipientId,
            },
        })

        return notifications.map(PrismasNotificationMapper.toDomain)
    }


    async save(notification: Notification): Promise<void> {
        const raw = PrismasNotificationMapper.toPrisma(notification);

        await this.prismaService.notification.update({
            where: {
                id: raw.id,
            },
            data: raw,
        })
    }
}