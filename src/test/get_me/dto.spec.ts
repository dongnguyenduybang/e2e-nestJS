import axios from 'axios';
import { testCases } from './validate-input';
import { validateDTO } from './validate-dto';

describe('GetMe Test DTO', () => {

    let baseUrl;
    const results = [];

    beforeAll(async () => {

        baseUrl = process.env.API_BASE_URL + 'UserView/GetMe';
    });

    testCases.forEach(testGroup => {

        describe(testGroup.describe, () => {

            testGroup.cases.forEach(testCase => {

                it(testCase.name, async () => {

                    const headers = await testCase.header();
                    const token = headers.token;
                    try {

                        const response = await axios.get(baseUrl, { headers: { 'x-session-token': token } });

                        const data = response.data;

                        const resultvalidateDTO = await validateDTO(data)

                        if (resultvalidateDTO.status == 'PASS') {
                            results.push({
                                name: testCase.name,
                                status: resultvalidateDTO.status,
                                responseDTO: resultvalidateDTO.responseDTO
                            })
                        } else {
                            results.push({
                                name: testCase.name,
                                status: resultvalidateDTO.status,
                                responseDTO: resultvalidateDTO.responseDTO
                            })
                        }

                    } catch (error: any) {

                    }
                });
            });
        });
    });
    afterAll(() => {
        console.log('\n=== Detailed Test DTO GetMe Results ===');
        console.table(
            results.map(result => ({
                'Test Case': result.name,
                'Status': result.status,
                'Validate DTO': result.responseDTO
            }))
        );
    });
});


