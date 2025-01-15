import axios from 'axios';

import { getMockUser } from '../share-data';
import { testCases } from './validate-input';

describe('GetUser Test Response', () => {

    let baseUrl, baseUrlTestResponse, baseCountryCode
    const results = [];

    beforeAll(async () => {

        baseUrl = process.env.API_BASE_URL + 'UserView/GetUser';
        baseCountryCode = process.env.HEADER_COUNTRY_CODE;
        baseUrlTestResponse = process.env.API_BASE_URL + 'InternalFaker/MockFriends';

    });

    testCases.forEach(testGroup => {

        describe(testGroup.describe, () => {

            testGroup.cases.forEach(testCase => {
                it('Get data from MockFriends by userId', async () => {
                    try {
                        const { token, userId } = await testCase.payload()

                        const response = await axios.get(`${baseUrl}?userId=${userId}`, { headers: { 'x-session-token': token } });
                        const data = response.data.data;

                        const testUserId = await axios.post(baseUrlTestResponse, { "quantity": 1, "type": 1 }, { headers: { 'x-user-id': data.userId, 'x-country-code': baseCountryCode } });

                        expect(testUserId.data).toBeDefined()
                        expect(testUserId.data.ok).toBe(true)
                        expect(testUserId.data.data).toBeDefined()

                    } catch (error: any) {
                        console.log('Error during API request:', error.message);
                    }

                })

            });
        });
    });

});




