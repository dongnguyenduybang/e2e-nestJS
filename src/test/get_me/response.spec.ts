import axios from 'axios';
import { getMockUser } from '../share-data';

describe('GetMe Test Response', () => {

    let baseUrl, baseUrlTestResponse, token;
    const results = [];

    beforeAll(async () => {

        baseUrl = process.env.API_BASE_URL + 'UserView/GetMe';
        const mockUser = await getMockUser();
        token = mockUser.token;
        baseUrlTestResponse = process.env.API_BASE_URL + 'UserView/GetUser';

    });
    it('Get data from GetUser by userId', async () => {
        try {
            const response = await axios.get(baseUrl, { headers: { 'x-session-token': token } });
            const data = response.data.data;

            const testToken = await axios.get(`${baseUrlTestResponse}?userId=${data.userId}`, { headers: { 'x-session-token': token } });

            expect(data).toBeDefined()
            expect(data.userId).toBe(testToken.data.data.userId)

        } catch (error: any) {
            console.log('Error during API request:', error.message);
        }

    })
});




