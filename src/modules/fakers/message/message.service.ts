import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getApiConfig } from '../../../common/api-config';
import { firstValueFrom } from 'rxjs';
import { MessageDTO } from '@modules/dto';

@Injectable()

export class MessageService {

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,

    ) { }

    async createMockMessage(data: MessageDTO) {

        const { baseUrl, mockEndpoints } = getApiConfig(this.configService);
        const mockMessagesEndpoint = mockEndpoints['messages'];
        const url = `${baseUrl}${mockMessagesEndpoint}`;

        try {

            const response = await firstValueFrom(this.httpService.post(url, data));

            return response.data

        } catch (error) {

            console.error('Error:', error.message, error.response?.data);
        }

    }
}