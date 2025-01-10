import axios from 'axios';
import { testCases } from './validate-channel-input';
import { validateLogicData } from './validate-channel-logic'
import { getMockUser } from '../share-data'

const results = [];
describe('MockChannel Tests', () => {

    let baseUrl, baseCountryCode, headers;

    let passedTestCases = 0;
    let failedTestCases = 0;
    beforeAll(async () => {
        const { userId, token } = await getMockUser();


        baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockChannels';
        baseCountryCode = process.env.HEADER_COUNTRY_CODE;
        headers = {
            'x-user-id': userId,
            'x-country-code': baseCountryCode
        };
    });

    testCases.forEach(testGroup => {

        describe(testGroup.describe, () => {

            testGroup.cases.forEach(testCase => {

                it(testCase.name, async () => {

                    const { payload, expectedDetails } = testCase;

                    try {

                        const response = await axios.post(baseUrl, payload, { headers });

                        const isValid = validateLogicData(response.data, payload.typeChannel);

                        if (isValid.ok === true) {
                            passedTestCases++;
                            results.push({
                                name: testCase.name,
                                status: 'PASS',
                                expectedDetails,
                                actualDetails: [isValid.message]
                            });

                        } else {
                            failedTestCases++;
                            console.log('Test Logic: MockChannel')
                            console.table(isValid.error.details);
                            results.push({
                                name: testCase.name,
                                status: 'FAIL',
                                expectedDetails,
                                actualDetails: [isValid.error.details]
                            });
                        }

                    } catch (error: any) {

                        const actualErrors = error.response?.data?.error?.details || [];
                        try {
                            expect(actualErrors).toEqual(expectedDetails);
                            passedTestCases++;
                            results.push({
                                name: testCase.name,
                                status: 'PASS',
                                expectedDetails,
                                actualDetails: actualErrors,
                            });
                        } catch (error) {
                            failedTestCases++;
                            results.push({
                                name: testCase.name,
                                status: 'FAIL',
                                expectedDetails,
                                actualDetails: actualErrors,
                            });
                        }

                    }
                });
            });
        });
    });
    afterAll(() => {
        console.log('\n=== Detailed Test MockChannel Results ===');
        console.table(
            results.map(result => ({
                'Test Case': result.name,
                'Status': result.status,
                'Expected Errors': Array.isArray(result.expectedDetails)
                    ? result.expectedDetails.join(', ').substring(0, 70) + (result.expectedDetails.join(', ').length > 70 ? '...' : '')
                    : '',
                'Actual Errors': Array.isArray(result.actualDetails)
                    ? result.actualDetails.join(', ').substring(0, 70) + (result.actualDetails.join(', ').length > 70 ? '...' : '')
                    : ''
            }))
        );
    });
});


