// import axios from 'axios';
// import { getMockUser } from '../share-data';

// describe('List Block User Test Response', () => {

//     let baseUrl, baseUrlTestResponse, baseCountryCode, token, userId, baseUrlBLock

//     beforeAll(async () => {

//         baseUrl = process.env.API_BASE_URL + 'UserView/ListBlockedUsers';
//         baseCountryCode = process.env.HEADER_COUNTRY_CODE;
//         baseUrlBLock = process.env.API_BASE_URL + 'UserSetting/BlockUser'
//         baseUrlTestResponse = process.env.API_BASE_URL + 'UserView/GetUser';

//         const mockUserToken = await getMockUser();
//         token = mockUserToken.token;

//         const mockUserId = await getMockUser();
//         userId = mockUserId.userId

//     });

//     it('Test Response List Block Users', async () => {

//         //check blocked
//         const blockUser = await axios.post(baseUrlBLock, { targetUserId: userId },
//             { headers: { 'x-session-token': token } })

//         const checkBlocked = blockUser.data
//         //check listblock
//         const listBlock = await axios.get(baseUrl, { headers: { 'x-session-token': token } })

//         const getListBlock = listBlock.data.data[0]
//         //check get api 
//         const testResponse = await axios.get(`${baseUrlTestResponse}?userId=${getListBlock.userId}`, {
//             headers: {
//                 'x-session-token': token
//             }
//         })
//         const getTestResponse = testResponse.data.data;

//         expect(getTestResponse.blocked).toEqual(true)

//     });
// });