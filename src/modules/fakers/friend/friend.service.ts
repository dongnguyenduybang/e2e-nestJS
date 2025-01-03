import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getApiConfig } from '../../../common/api-config';
import { firstValueFrom } from 'rxjs';
import { FriendDTO } from '@modules/dto';

@Injectable()

export class FriendService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,

    ) { }

    async createMockFriend(data: FriendDTO, header: any) {

        const { baseUrl, mockEndpoints } = getApiConfig(this.configService);
        const mockFriendsEndpoint = mockEndpoints['friends'];
        const url = `${baseUrl}${mockFriendsEndpoint}`;

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