import { ConfigService } from '@nestjs/config';

export const getApiConfig = (configService: ConfigService) => {
    const baseUrl = configService.get<string>('API_BASE_URL');
    const mockUsersEndpoint = configService.get<string>('MOCK_USERS_ENDPOINT');

    return { baseUrl, mockUsersEndpoint };
};
