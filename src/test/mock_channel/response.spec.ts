import axios from 'axios';

import { getMockUser } from '../share-data';

describe('MockChannel Test Response', () => {

    let baseUrl, baseUrlTestResponse, baseCountryCode, token, userId, payload
    const results = [];

    beforeAll(async () => {

        baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockChannels';
        const mockUser = await getMockUser();
        token = mockUser.token;
        userId = mockUser.userId
        baseCountryCode = process.env.HEADER_COUNTRY_CODE;
        baseUrlTestResponse = process.env.API_BASE_URL + 'InternalFaker/MockMessages';
        payload = { "quantity": 1, "prefix": "aaaaaaa", "typeChannel": 0, "totalMessages": 1 }

    });
    it('Get data from MockMessages by channelId', async () => {
        try {


            const response = await axios.post(baseUrl, payload, { headers: { 'x-user-id': userId, 'x-country-code': baseCountryCode } });
            const data = response.data.data[0];

            const testChannelId = await axios.post(baseUrlTestResponse,
                { "quantity": 1, "workspaceId": "0", "channelId": data.channelId }, {
                headers: {}
            });

            expect(testChannelId.data).toBeDefined()
            expect(testChannelId.data.ok).toBe(true)
            expect(testChannelId.data.data).toBeDefined()


        } catch (error: any) {

            console.log('Error during API request:', error.message);
        }

    })
});


