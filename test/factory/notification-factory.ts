import { Content } from "@application/entities/content";
import { Notification, NotificationProps } from "@application/entities/Notification";

type Override = Partial<NotificationProps>

export function makeNotification(overrride: Override = {}) {
    return new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade.'),
        recipientId: 'recipient-2',
        ...overrride,
    });
}