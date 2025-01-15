import axios from 'axios';
import { testCases } from './validate-input';

describe('GetMe Test Response', () => {

    let baseUrl, baseUrlTestResponse;
    const results = [];

    beforeAll(async () => {

        baseUrl = process.env.API_BASE_URL + 'UserView/GetMe';
        baseUrlTestResponse = process.env.API_BASE_URL + 'UserView/GetUser';

    });

    testCases.forEach(testGroup => {

        describe(testGroup.describe, () => {

            testGroup.cases.forEach(testCase => {

                it('Get data from GetUser by userId', async () => {

                    const { token } = await testCase.header()
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
        });
    });

});




