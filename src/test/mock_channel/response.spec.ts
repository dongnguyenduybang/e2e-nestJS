// import axios from 'axios';
// import { getMockUser } from '../share-data';

// describe('MockChannel Test Response', () => {

//     let baseUrl, baseUrlTestResponse, baseCountryCode, token, userId, payload

//     beforeAll(async () => {

//         baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockChannels';
//         baseCountryCode = process.env.HEADER_COUNTRY_CODE;
//         baseUrlTestResponse = process.env.API_BASE_URL + 'InternalFaker/MockMessages';

//         const mockUser = await getMockUser();
//         userId = mockUser.userId
//         payload = { "quantity": 1, "prefix": "aaaaaaa", "typeChannel": 0, "totalMessages": 1 }

//     });
//     it('Get data from MockMessages by channelId', async () => {

//         const response = await axios.post(baseUrl, payload, { headers: { 'x-user-id': userId, 'x-country-code': baseCountryCode } });
//         const data = response.data.data[0];

//         const testChannelId = await axios.post(baseUrlTestResponse,
//             { "quantity": 1, "workspaceId": "0", "channelId": data.channelId }, {
//             headers: {}
//         });

//         expect(testChannelId.data).toBeDefined()
//         expect(testChannelId.data.ok).toBe(true)
//         expect(testChannelId.data.data).toBeDefined()

//     })
// });


