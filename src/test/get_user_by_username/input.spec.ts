// import axios from 'axios';
// import Table from 'cli-table3';
// import { testCases } from './validate-input';

// describe('Get User By Username Test Input', () => {
//     let baseUrl;
//     const results = [];

//     beforeAll(async () => {

//         baseUrl = process.env.API_BASE_URL + 'UserView/GetUserByUsername';
//     });

//     testCases.forEach(testGroup => {

//         describe(testGroup.describe, () => {

//             testGroup.cases.forEach(testCase => {

//                 it(testCase.name, async () => {

//                     const expectedDetails = testCase.expectedDetails;

//                     const token = await testCase.header()
//                     const getPayload = await testCase.payload()
//                     const { username } = getPayload;

//                     try {

//                         const response = await axios.get(`${baseUrl}?username=${username}`, {
//                             headers: {
//                                 'x-session-token': token.token
//                             }
//                         });
//                         const dataGetMe = response.data;
//                         expect(dataGetMe.data).toBeDefined()
//                         expect(dataGetMe.ok).toBe(true)

//                     } catch (error: any) {

//                         const recivied = error.response?.data?.error?.details || error.response?.data || [];
//                         const expected = expectedDetails

//                         let reciviedArray;

//                         if (typeof recivied === "string") {
//                             reciviedArray = [recivied];
//                         } else if (Array.isArray(recivied)) {
//                             reciviedArray = recivied;
//                         } else {
//                             reciviedArray = [];
//                         }

//                         const missingInRecivied = expected.filter(detail => !recivied.includes(detail));
//                         const extraInRecivied = reciviedArray.filter(detail => !expected.includes(detail));

//                         const differences = [...missingInRecivied, ...extraInRecivied];

//                         results.push({
//                             name: testCase.name,
//                             status: differences.length > 0 ? 'FAIL' : 'PASS',
//                             expected: expected,
//                             recivied: reciviedArray,
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
