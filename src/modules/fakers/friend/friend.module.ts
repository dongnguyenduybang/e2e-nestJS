import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';

@Module({
    imports: [HttpModule],
    controllers: [FriendController],
    providers: [FriendService],
})
export class FriendModule { }
