// import axios from 'axios';
// import { getMockUser } from '../share-data';

// describe('MockFriend Test Response', () => {

//     let baseUrl, baseUrlTestResponse, payload, userId, baseCountryCode, token

//     beforeAll(async () => {

//         baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockFriends';
//         baseCountryCode = process.env.HEADER_COUNTRY_CODE;
//         baseUrlTestResponse = process.env.API_BASE_URL + 'UserView/GetUser';

//         const mockUser = await getMockUser();
//         userId = mockUser.userId
//         token = mockUser.token

//         payload = { "quantity": 1, "type": 1 }
//     });
//     it('Get data from GetUser by userId', async () => {

//         const response = await axios.post(baseUrl, payload, { headers: { 'x-user-id': userId, 'x-country-code': baseCountryCode } });
//         const data = response.data.data;

//         const testUserId = await axios.get(`${baseUrlTestResponse}?userId=${data}`, { headers: { 'x-session-token': token } });

//         expect(data).toBeDefined()
//         expect(data).toEqual([testUserId.data.data.userId]);

//     })
// });


