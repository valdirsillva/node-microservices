import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/Notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
    it('should be able to count a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotifications = new CountRecipientNotifications(
            notificationsRepository
        )

        await notificationsRepository.create(
            new Notification({
                category: 'social',
                content: new Content('Nova solicitação de amizade.'),
                recipientId: 'recipient-1',
            })
        );

        await notificationsRepository.create(
            new Notification({
                category: 'social',
                content: new Content('Nova solicitação de amizade.'),
                recipientId: 'recipient-1',
            })
        );

        await notificationsRepository.create(
            new Notification({
                category: 'social',
                content: new Content('Nova solicitação de amizade.'),
                recipientId: 'recipient-2',
            })
        );

        const { count } = await countRecipientNotifications.execute({
            recipientId: 'recipient-1'
        });

        expect(count).toEqual(2)
    });
});