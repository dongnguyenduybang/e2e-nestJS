import axios from 'axios';
import { testCases } from './validate-user-input';
import { validateLogicData } from './validate-user-logic';
import { validateResponseData } from './validate-user-response';



describe('MockUser Tests', () => {
    let totalTestCases = 0;
    let passedTestCases = 0;
    let failedTestCases = 0;
    let baseUrl
    const results = [];

    beforeAll(() => {
        baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockUsers';
    });

    testCases.forEach(testGroup => {

        describe(testGroup.describe, () => {

            testGroup.cases.forEach(testCase => {

                it(testCase.name, async () => {

                    const { payload, expectedDetails } = testCase;

                    try {

                        // Gửi request và lấy response
                        const response = await axios.post(baseUrl, payload);

                        // Kiểm tra logic response
                        const isValid = await validateLogicData(response.data);

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

                        const isValidResponse = await validateResponseData(isValid.data);

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
        console.log('\n=== Detailed Test MockUser Results ===');
        console.table(
            results.map(result => ({
                'Test Case': result.name,
                'Status': result.status,
                'Expected Errors': Array.isArray(result.expectedDetails)
                    ? result.expectedDetails.join(', ').substring(0, 70) + (result.expectedDetails.join(', ').length > 100 ? '...' : '')
                    : '',
                'Actual Errors': Array.isArray(result.actualDetails)
                    ? result.actualDetails.join(', ').substring(0, 70) + (result.actualDetails.join(', ').length > 100 ? '...' : '')
                    : ''
            }))
        );


    });

});
