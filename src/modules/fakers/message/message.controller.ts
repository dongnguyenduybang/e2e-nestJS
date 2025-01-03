import { Controller, UsePipes, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDTO } from '../../dto/faker.dto';
import { CustomValidationPipe } from '../../../common/pipes/custom-validation.pipes';

@Controller('mock-messages')
export class MessageController {

    constructor(private readonly messageService: MessageService) { }

    @Post()

    @UsePipes(CustomValidationPipe)

    async createMockMessage(@Body() data: MessageDTO) {

        return this.messageService.createMockMessage(data);
    }
}
