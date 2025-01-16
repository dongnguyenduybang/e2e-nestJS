// import axios from 'axios';
// import { getMockUser } from '../share-data';

// describe('MockFriend Logic Validation', () => {

//     let payload, baseCountryCode, baseUrl, userId
//     let errors: { field: string, expected: string, actual: string }[] = [];

//     beforeAll(async () => {

//         baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockFriends';
//         baseCountryCode = process.env.HEADER_COUNTRY_CODE;

//         const mockUser = await getMockUser();
//         userId = mockUser.userId

//         payload = { "quantity": 1, "type": 1 }
//         errors = [];
//     });

//     it('Test Logic Mock Friend', async () => {

//         const response = await axios.post(baseUrl, payload, { headers: { 'x-user-id': userId, 'x-country-code': baseCountryCode } });

//         const assertDefined = (value: any, name: string, expectedType: string) => {
//             if (value === undefined || value === null) {
//                 errors.push({ field: name, expected: expectedType, actual: 'undefined/null' });
//             }
//         };
//         const assertString = (value: any, name: string) => {
//             if (typeof value !== 'number') {
//                 errors.push({ field: name, expected: 'number', actual: typeof value });
//             }
//         };

//         const assertArray = (value: any, name: string) => {
//             if (!Array.isArray(value)) {
//                 errors.push({ field: name, expected: 'array', actual: typeof value });
//             }
//         };

//         const { ok, data } = response.data;

//         if (!ok) errors.push({ field: 'ok', expected: 'true', actual: String(ok) });

//         assertDefined(data, 'data', 'array');
//         assertArray(data, 'data');

//         if (errors.length > 0) {
//             console.table(errors.map(error => ({
//                 Field: error.field,
//                 ExpectedType: error.expected,
//                 ActualValue: error.actual
//             })));
//         }

//         expect(errors).toEqual([]);

//     });
// });
