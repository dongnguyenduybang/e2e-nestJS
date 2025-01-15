import axios from 'axios';
import Table from 'cli-table3';
import { testCases } from './validate-input';
import { validateGetMeDTO } from './validate-dto';

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

                        const resultvalidateDTO = await validateGetMeDTO(data)

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
        const table = new Table({
            head: ["Test Case", "Status", "Validate DTO"],
            colWidths: [30, 10, 50],
            wordWrap: true,
        });

        results.forEach((result) => {
            table.push([
                result.name,
                result.status,
                result.responseDTO
            ]);
        });

        console.log(table.toString());
    });
});


