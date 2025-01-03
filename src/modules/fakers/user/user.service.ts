import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getApiConfig } from '../../../common/api-config';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from '@modules/dto/faker.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,

    ) { }

    async createMockUser(data: UserDTO) {

        const { baseUrl, mockUsersEndpoint } = getApiConfig(this.configService);
        const url = `${baseUrl}${mockUsersEndpoint}`;

        try {
            const response = await firstValueFrom(
                this.httpService.post(url, data),
            );

            return response.data

        } catch (error) {
            console.error('Error fetching mock users:', error);
            throw new Error('Error fetching data from API');
        }
    }
}
