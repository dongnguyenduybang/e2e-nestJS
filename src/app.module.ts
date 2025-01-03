import { Module } from '@nestjs/common';
import { UserModule } from './modules/fakers/user/user.module';
import { ChannelModule } from './modules/fakers/channel/channel.module';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './modules/fakers/message/message.module';
import { FriendModule } from './modules/fakers/friend/friend.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        UserModule,
        ChannelModule,
        MessagesModule,
        FriendModule

    ],
})
export class AppModule { }
