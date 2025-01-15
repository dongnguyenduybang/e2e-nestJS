import axios from 'axios';
import { getMockUser } from '../share-data';

describe('MockUser Test Response', () => {

    let baseUrlTestResponse, baseCountryCode, token, userId

    beforeAll(async () => {
        const mockUser = await getMockUser();
        token = mockUser.token
        userId = mockUser.userId
        baseCountryCode = process.env.HEADER_COUNTRY_CODE;
        baseUrlTestResponse = process.env.API_BASE_URL + 'UserView/GetMe';

    });

    it('Get data from GetMe by token', async () => {
        try {
            console.log('getme', token, userId)

            const testUserId = await axios.get(baseUrlTestResponse, { headers: { 'x-session-token': token } });

            const data = testUserId.data

            expect(data).toBeDefined()
            expect(userId).toEqual(data.data.userId);

        } catch (error: any) {

            console.log('Error during API request:', error.message);
        }

    })
});


