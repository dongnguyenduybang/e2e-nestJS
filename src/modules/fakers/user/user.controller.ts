import { Controller, ValidationPipe, UsePipes, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from '../../dto/faker.dto';
import { CustomValidationPipe } from '../../../common/pipes/custom-validation.pipes';

@Controller('mock-users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()

    @UsePipes(CustomValidationPipe)

    async createMockUser(@Body() data: UserDTO) {

        return this.userService.createMockUser(data);
    }
}
