// import axios from 'axios';
// import Table from 'cli-table3';
// import { testCases } from './validate-input';
// import { validateMockFriendDTO } from './validate-dto'

// describe('MockChannel Test DTO', () => {

//     let baseUrl, baseCountryCode;
//     const results = [];

//     beforeAll(async () => {
//         baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockFriends';
//         baseCountryCode = process.env.HEADER_COUNTRY_CODE;
//     });

//     testCases.forEach(testGroup => {

//         describe(testGroup.describe, () => {

//             testGroup.cases.forEach(testCase => {

//                 it(testCase.name, async () => {

//                     const payload = testCase.payload
//                     const getHeader = await testCase.header()

//                     const userId = getHeader.userId

//                     try {

//                         const response = await axios.post(baseUrl, payload, {
//                             headers: {
//                                 'x-user-id': userId,
//                                 'x-country-code': baseCountryCode
//                             }
//                         });

//                         const data = response.data;

//                         const resultvalidateDTO = await validateMockFriendDTO(data)

//                         if (resultvalidateDTO.status == 'PASS') {
//                             results.push({
//                                 name: testCase.name,
//                                 status: resultvalidateDTO.status,
//                                 responseDTO: resultvalidateDTO.responseDTO
//                             })
//                         } else {
//                             results.push({
//                                 name: testCase.name,
//                                 status: resultvalidateDTO.status,
//                                 responseDTO: resultvalidateDTO.responseDTO
//                             })
//                         }

//                     } catch (error: any) {

//                     }
//                 });
//             });
//         });
//     });
//     afterAll(() => {
//         const table = new Table({
//             head: ["Test Case", "Status", "Validate DTO"],
//             colWidths: [30, 10, 50],
//             wordWrap: true,
//         });

//         results.forEach((result) => {
//             table.push([
//                 result.name,
//                 result.status,
//                 result.responseDTO
//             ]);
//         });

//         console.log(table.toString());
//     });
// });


