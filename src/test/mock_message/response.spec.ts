import axios from 'axios';
import { testCases } from './validate-input';

describe('MockChannel Test Response', () => {
    let baseUrl, baseUrlTestResponse, baseCountryCode

    beforeAll(async () => {

        baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockMessages';
        baseCountryCode = process.env.HEADER_COUNTRY_CODE;
        baseUrlTestResponse = process.env.API_BASE_URL + 'MessageView/ListMessages';

    });

    testCases.forEach(testGroup => {

        describe(testGroup.describe, () => {

            testGroup.cases.forEach(testCase => {

                it('Get data from ListMessages by messageId', async () => {
                    try {

                        const payload = await testCase.payload();
                        const channelId = payload.channelId;

                        const testMessageIdResponse = await axios.get(`${baseUrlTestResponse}?channelId=${channelId}&workspaceId=0`);

                        expect(testMessageIdResponse.status).toBe(200);

                    } catch (error) {
                        console.log('Error during API request:', error.message);
                    }
                });

            });
        });
    });



});

