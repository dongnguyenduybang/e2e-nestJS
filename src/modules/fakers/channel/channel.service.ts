import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getApiConfig } from '../../../common/api-config';
import { firstValueFrom } from 'rxjs';
import { ChannelDTO } from '@modules/dto';

@Injectable()

export class ChannelService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,

    ) { }

    async createMockChannel(data: ChannelDTO, header: any) {
        const { baseUrl, mockEndpoints } = getApiConfig(this.configService);
        const mockChannelsEndpoint = mockEndpoints['channels'];
        const url = `${baseUrl}${mockChannelsEndpoint}`;

        const headers = {
            'x-user-id': header['x-user-id'],
            'x-country-code': header['x-country-code'],
            'Content-Type': 'application/json',
        };

        try {
            const response = await firstValueFrom(this.httpService.post(url, data, { headers }));

            return response.data
        } catch (error) {
            console.error('Error:', error.message, error.response?.data);
        }

    }
}