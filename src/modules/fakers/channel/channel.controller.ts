import { Controller, UsePipes, Headers, Post, Body } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelDTO } from '../../dto/faker.dto';
import { CustomValidationPipe } from '../../../common/pipes/custom-validation.pipes';

@Controller('mock-channels')
export class ChannelController {
    constructor(private readonly channelService: ChannelService) { }

    @Post()

    @UsePipes(CustomValidationPipe)

    async createMockChannel(@Body() data: ChannelDTO, @Headers() headers: any) {

        return this.channelService.createMockChannel(data, headers);
    }
}
