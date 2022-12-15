import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/Notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

interface SendNotificationRequest {
    recipientId: string;
    content: string;
    category: string;
}

interface SendNotificationReponse {
    notification: Notification;
}

@Injectable()
export class SendNotification {
    constructor(private notificationRepository: NotificationsRepository) { }

    async execute(request: SendNotificationRequest): Promise<SendNotificationReponse> {
        const { recipientId, content, category } = request;

        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category,
        });

        await this.notificationRepository.create(notification);

        return {
            notification
        };
    }
}