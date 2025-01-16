// import axios from 'axios';
// import { getMockUser } from '../share-data';

// describe('List Block User Logic Validation', () => {

//     let baseUrl, token
//     let errors: { field: string, expected: string, actual: string }[] = [];

//     beforeAll(async () => {

//         baseUrl = process.env.API_BASE_URL + 'UserView/ListBlockedUsers';

//         const mockUserToken = await getMockUser();
//         token = mockUserToken.token;
//         errors = [];
//     });

//     it('Test Logic List Block User', async () => {

//         try {
//             const response = await axios.get(baseUrl, {
//                 headers: {
//                     'x-session-token': token
//                 }
//             });

//             const assertDefined = (value: any, name: string, expectedType: string) => {
//                 if (value === undefined || value === null) {
//                     errors.push({ field: name, expected: expectedType, actual: 'undefined/null' });
//                 }
//             };
//             const assertString = (value: any, name: string) => {
//                 if (typeof value !== 'string') {
//                     errors.push({ field: name, expected: 'string', actual: typeof value });
//                 }
//             };
//             const assertNumber = (value: any, name: string) => {
//                 if (typeof value !== 'number') {
//                     errors.push({ field: name, expected: 'number', actual: typeof value });
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
//             const assertObject = (value: any, name: string) => {
//                 if (typeof value !== 'object' || Array.isArray(value)) {
//                     errors.push({ field: name, expected: 'object', actual: typeof value });
//                 }
//             };

//             const { ok, data, paging, includes } = response.data;

//             if (!ok) errors.push({ field: 'ok', expected: 'true', actual: String(ok) });
//             assertDefined(ok, 'ok', 'boolean');
//             assertBoolean(ok, 'ok');

//             assertDefined(data, 'data', 'array');
//             assertArray(data, 'data');

//             assertDefined(paging, 'paging', 'object');
//             assertObject(paging, 'paging');
//             assertDefined(paging.hasPrev, 'paging.hasPrev', 'boolean');
//             assertBoolean(paging.hasPrev, 'paging.hasPrev');
//             assertDefined(paging.hasNext, 'paging.hasNext', 'boolean');
//             assertBoolean(paging.hasNext, 'paging.hasNext');

//             assertDefined(includes, 'includes', 'object');
//             assertObject(includes, 'includes');
//             assertDefined(includes.users, 'includes.users', 'array');
//             assertArray(includes.users, 'includes.users');
//             assertDefined(includes.channels, 'includes.channels', 'array');
//             assertArray(includes.channels, 'includes.channels');
//             assertDefined(includes.members, 'includes.members', 'array');
//             assertArray(includes.members, 'includes.members');
//             assertDefined(includes.messages, 'includes.messages', 'array');
//             assertArray(includes.messages, 'includes.messages');
//             assertDefined(includes.channelMetadata, 'includes.channelMetadata', 'array');
//             assertArray(includes.channelMetadata, 'includes.channelMetadata');

//             if (errors.length > 0) {
//                 console.table(errors.map(error => ({
//                     Field: error.field,
//                     ExpectedType: error.expected,
//                     ActualValue: error.actual
//                 })));
//             }
//             expect(errors).toEqual([]);
//         } catch (error) {
//             console.error('Error during API request:', error.message);
//         }


//     });
// });
