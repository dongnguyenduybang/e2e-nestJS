// import axios from 'axios';
// import Table from 'cli-table3';
// import { testCases } from './validate-input';


// describe('MockMessage Test Input', () => {
//     let baseUrl, baseCountryCode;
//     const results = [];

//     beforeAll(async () => {
//         baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockMessages';
//         baseCountryCode = process.env.HEADER_COUNTRY_CODE;
//     });

//     testCases.forEach(testGroup => {

//         describe(testGroup.describe, () => {

//             testGroup.cases.forEach(testCase => {

//                 it(testCase.name, async () => {

//                     const payload = await testCase.payload()
//                     const expectedDetails = testCase.expectedDetails;

//                     try {

//                         const response = await axios.post(baseUrl, payload, {});

//                         const dataMockMessage = response.data;

//                         expect(dataMockMessage.data).toBeDefined()
//                         expect(dataMockMessage.ok).toBe(true)

//                     } catch (error: any) {

//                         const recivied = error.response?.data?.error?.details || [];
//                         const expected = expectedDetails

//                         const missingInRecivied = expected.filter(detail => !recivied.includes(detail));
//                         const extraInRecivied = recivied.filter(detail => !expected.includes(detail));

//                         const differences = [...missingInRecivied, ...extraInRecivied];

//                         results.push({
//                             name: testCase.name,
//                             status: differences.length > 0 ? 'FAIL' : 'PASS',
//                             expected: expected,
//                             recivied: recivied,
//                             differences: differences,
//                         });

//                         expect(differences).toHaveLength(0);
//                     }
//                 });
//             });
//         });
//     });
//     afterAll(() => {
//         const table = new Table({
//             head: ["Test Case", "Status", "Expected", "Received", "Differences"],
//             colWidths: [30, 10, 40, 50, 40],
//             wordWrap: true,
//         });

//         results.forEach((result) => {
//             table.push([
//                 result.name,
//                 result.status,
//                 result.expected.join(",\n"),
//                 result.recivied.join(",\n"),
//                 result.differences.join(",\n"),
//             ]);
//         });

//         console.log(table.toString());
//     });

// });




