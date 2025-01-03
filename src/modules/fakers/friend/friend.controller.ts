import { Controller, UsePipes, Headers, Post, Body } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendDTO } from '../../dto/faker.dto';
import { CustomValidationPipe } from '../../../common/pipes/custom-validation.pipes';

@Controller('mock-friends')
export class FriendController {
    constructor(private readonly friendService: FriendService) { }

    @Post()

    @UsePipes(CustomValidationPipe)

    async createMockFriend(@Body() data: FriendDTO, @Headers() headers: any) {

        return this.friendService.createMockFriend(data, headers);


    }
}
