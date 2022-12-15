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

    async findById(notificationId: string): Promise<Notification> {
        throw new Error("Method not implemented.");
    }

    async save(notification: Notification): Promise<void> {
        throw new Error("Method not implemented.");
    }
}