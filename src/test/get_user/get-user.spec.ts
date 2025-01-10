import axios from 'axios';
import { testCases } from './validate-get-user-param';
import { validateLogicData } from './validate-get-user-logic'
import { getMockUser } from '../share-data';
// import { validateResponseData } from './validate-gat-user-reponse';

describe('GetUser Tests', () => {

    let baseUrl, headers;
    let passedTestCases = 0;
    let failedTestCases = 0;

    const results = [];
    beforeAll(async () => {

        const { token } = await getMockUser();
        baseUrl = process.env.API_BASE_URL + 'UserView/GetUser';

        headers = {
            'x-session-token': token
        }
    });

    testCases.forEach(testGroup => {

        describe(testGroup.describe, () => {

            testGroup.cases.forEach(testCase => {

                it(testCase.name, async () => {

                    const { userId, expectedDetails } = testCase;

                    try {
                        const response = await axios.get(`${baseUrl}?userId=${userId}`, { headers });

                        const isValid = await validateLogicData(response.data);
                        console.table(isValid.error.details);

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
        console.log('\n=== Detailed Test GetUser Results ===');
        console.table(
            results.map(result => ({
                'Test Case': result.name,
                'Status': result.status,
                'Expected Errors': Array.isArray(result.expectedDetails)
                    ? result.expectedDetails.join(', ').substring(0, 100) + (result.expectedDetails.join(', ').length > 100 ? '...' : '')
                    : '',
                'Actual Errors': Array.isArray(result.actualDetails)
                    ? result.actualDetails.join(', ').substring(0, 100) + (result.actualDetails.join(', ').length > 100 ? '...' : '')
                    : ''
            }))
        );
    });
});


