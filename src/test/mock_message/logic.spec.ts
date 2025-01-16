// import axios from 'axios';
// import Table from 'cli-table3';
// import { getMockChannel } from '../share-data';

// describe('MockMessage Logic Validation', () => {
//     let payload, baseUrl, channelId
//     let errors: { field: string, expected: string, actual: string }[] = [];

//     beforeAll(async () => {

//         baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockMessages';

//         const dataMockChannel = await getMockChannel()
//         channelId = dataMockChannel.channelId

//         payload = { "quantity": 1, "workspaceId": "0", "channelId": channelId }
//         errors = [];
//     });

//     it('Test Logic MockMessage', async () => {
//         try {
//             const response = await axios.post(baseUrl, payload, {});

//             const assertDefined = (value: any, name: string, expectedType: string) => {
//                 if (value === undefined || value === null) {
//                     errors.push({ field: name, expected: expectedType, actual: 'undefined/null' });
//                 }
//             };

//             const assertBoolean = (value: any, name: string) => {
//                 if (typeof value !== 'boolean') {
//                     errors.push({ field: name, expected: 'boolean', actual: typeof value });
//                 }
//             };

//             const assertArray = (value: any, name: string) => {
//                 if (!Array.isArray(value)) {
//                     errors.push({ field: name, expected: 'array', actual: typeof value });
//                 }
//             };

//             const assertString = (value: any, name: string) => {
//                 if (typeof value !== 'string') {
//                     errors.push({ field: name, expected: 'string', actual: typeof value });
//                 }
//             };

//             const { ok, data } = response.data;

//             assertDefined(ok, 'ok', 'boolean');
//             assertBoolean(ok, 'ok');

//             assertDefined(data, 'data', 'array');
//             assertArray(data, 'data');

//             data.forEach((item, index) => {
//                 assertDefined(item, `data[${index}]`, 'string');
//                 assertString(item, `data[${index}]`);
//             });

//             const table = new Table({
//                 head: ['Field', 'Expected Type', 'Actual Value'],
//                 colWidths: [30, 30, 40],
//                 wordWrap: true,
//             });

//             if (errors.length > 0) {
//                 errors.forEach((error) => {
//                     table.push([error.field, error.expected, error.actual]);
//                 });
//                 console.log(table.toString());
//             }

//             expect(errors).toEqual([]);
//         } catch {

//         }


//     });
// });




