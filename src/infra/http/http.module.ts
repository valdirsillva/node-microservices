import { Module } from '@nestjs/common';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [
        NotificationsController
    ],
    providers: [
        SendNotification
    ],

    exports: [
        NotificationsRepository,
    ],
})

export class HttpModule { }