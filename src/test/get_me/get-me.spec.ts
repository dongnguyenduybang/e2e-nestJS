import axios from 'axios';
import { testCases } from './validate-get-me-input';
import { validateLogicData } from './validate-get-me-logic'

describe('GetMe Tests', () => {

    let passedTestCases = 0;
    let failedTestCases = 0;
    let baseUrl;

    const results = [];
    beforeAll(() => {
        baseUrl = process.env.API_BASE_URL + 'UserView/GetMe';
    });

    testCases.forEach(testGroup => {

        describe(testGroup.describe, () => {

            testGroup.cases.forEach(testCase => {

                it(testCase.name, async () => {

                    const { token, expectedDetails } = testCase;

                    try {

                        const response = await axios.get(baseUrl, { headers: { 'x-session-token': token } });

                        const isValid = validateLogicData(response.data);

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
        console.log('\n=== Detailed Test GetMe Results ===');
        console.table(
            results.map(result => ({
                'Test Case': result.name,
                'Status': result.status,
                'Expected Errors': Array.isArray(result.expectedDetails)
                    ? result.expectedDetails.join(', ').substring(0, 100) + (result.expectedDetails.join(', ').length > 70 ? '...' : '')
                    : '',
                'Actual Errors': Array.isArray(result.actualDetails)
                    ? result.actualDetails.join(', ').substring(0, 100) + (result.actualDetails.join(', ').length > 70 ? '...' : '')
                    : ''
            }))
        );
    });
});


