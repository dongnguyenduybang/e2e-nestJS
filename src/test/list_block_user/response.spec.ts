import axios from 'axios';
import { getMockUser } from '../share-data';

describe('List Block User Test Response', () => {

    let baseUrl, baseUrlTestResponse, baseCountryCode, token

    beforeAll(async () => {

        baseUrl = process.env.API_BASE_URL + 'UserView/ListBlockedUsers';
        baseCountryCode = process.env.HEADER_COUNTRY_CODE;

        baseUrlTestResponse = process.env.API_BASE_URL + 'InternalFaker/MockFriends';

        const mockUser = await getMockUser();
        token = mockUser.token;

    });

    it('Test Response List Block Users', async () => {

        const response = await axios.get(baseUrl, {
            headers: { 'x-session-token': token }
        });

        const data = response.data.data;


    });
});