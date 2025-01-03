import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
    imports: [HttpModule],
    controllers: [MessageController],
    providers: [MessageService],
})
export class MessagesModule { }
