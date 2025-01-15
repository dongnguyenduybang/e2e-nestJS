import axios from 'axios';
import Table from 'cli-table3';
import { testCases } from './validate-input';
import { validateMockMessageDTO } from './validate-dto';


describe('MockMessage Test DTO', () => {

    let baseUrl, baseCountryCode;
    const results = [];

    beforeAll(async () => {

        baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockMessages';
        baseCountryCode = process.env.HEADER_COUNTRY_CODE;
    });

    testCases.forEach(testGroup => {

        describe(testGroup.describe, () => {

            testGroup.cases.forEach(testCase => {

                it(testCase.name, async () => {

                    const payload = await testCase.payload()


                    try {

                        const response = await axios.post(baseUrl, payload, {});

                        const data = response.data;
                        const resultvalidateDTO = await validateMockMessageDTO(data)

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




