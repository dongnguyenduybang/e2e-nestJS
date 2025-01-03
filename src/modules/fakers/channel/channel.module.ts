import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

@Module({
    imports: [HttpModule],
    controllers: [ChannelController],
    providers: [ChannelService],
})
export class ChannelModule { }
