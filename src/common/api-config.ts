import { ConfigService } from '@nestjs/config';

export const getApiConfig = (configService: ConfigService) => {
    const baseUrl = configService.get<string>('API_BASE_URL');
    const mockEndpoints = {
        users: configService.get<string>('MOCK_USERS_ENDPOINT'),
        channels: configService.get<string>('MOCK_CHANNELS_ENDPOINT'),
        messages: configService.get<string>('MOCK_MESSAGES_ENDPOINT'),
        friends: configService.get<string>('MOCK_FRIENDS_ENDPOINT'),
    };

    return { baseUrl, mockEndpoints };
};
