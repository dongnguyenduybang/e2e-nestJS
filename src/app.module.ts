import { Module } from '@nestjs/common';
import { UserModule } from './modules/fakers/user/user.module';
import { ChannelModule } from './modules/fakers/channel/channel.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        UserModule,
        ChannelModule

    ],
})
export class AppModule { }
