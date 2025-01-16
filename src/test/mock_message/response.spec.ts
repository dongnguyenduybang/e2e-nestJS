// import axios from 'axios';
// import { getMockChannel } from '../share-data';

// describe('MockChannel Test Response', () => {
//     let baseUrl, baseUrlTestResponse, baseCountryCode, channelId

//     beforeAll(async () => {

//         baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockMessages';
//         baseCountryCode = process.env.HEADER_COUNTRY_CODE;
//         baseUrlTestResponse = process.env.API_BASE_URL + 'MessageView/ListMessages';

//         const dataMockChannel = await getMockChannel()
//         channelId = dataMockChannel.channelId
//     });

//     it('Get data from ListMessages by messageId', async () => {
//         try {

//             const testMessageIdResponse = await axios.get(`${baseUrlTestResponse}?channelId=${channelId}&workspaceId=0`);

//             expect(testMessageIdResponse.status).toBe(200);
//         }
//         catch { }

//     });

// })
