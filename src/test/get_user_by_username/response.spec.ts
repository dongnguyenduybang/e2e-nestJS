// import axios from 'axios';
// import { getMockUser } from '../share-data';

// describe('GetUser Test Response', () => {

//     let baseUrl, baseUrlTestResponse, baseCountryCode, token, username

//     beforeAll(async () => {

//         baseUrl = process.env.API_BASE_URL + 'UserView/GetUserByUsername';
//         baseCountryCode = process.env.HEADER_COUNTRY_CODE;
//         baseUrlTestResponse = process.env.API_BASE_URL + 'InternalFaker/MockFriends';

//         const mockUser = await getMockUser();
//         token = mockUser.token;
//         username = mockUser.userName

//     });

//     it('Test Response Get User By Username', async () => {

//         const response = await axios.get(`${baseUrl}?username=${username}`, {
//             headers: { 'x-session-token': token }
//         });
//         const data = response.data.data;

//         const testUserId = await axios.post(baseUrlTestResponse, { "quantity": 1, "type": 1 }, {
//             headers: { 'x-user-id': data.userId, 'x-country-code': baseCountryCode }
//         });

//         expect(testUserId.data).toBeDefined()
//         expect(testUserId.data.ok).toBe(true)
//         expect(testUserId.data.data).toBeDefined()
//     });
// });