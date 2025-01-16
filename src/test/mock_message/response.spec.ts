import axios from 'axios';
import { getMockUserDev } from '../share-data';

describe('MockChannel Test Response', () => {
    let baseUrl, baseUrlTestResponse, baseCountryCode, token, baseUrlDev

    beforeAll(async () => {

        baseUrl = process.env.API_BASE_URL_DEV + 'InternalFaker/MockMessages';
        baseCountryCode = process.env.HEADER_COUNTRY_CODE;

        baseUrlDev = process.env.API_BASE_URL_DEV + 'Channel/CreateChannel'
        baseUrlTestResponse = process.env.API_BASE_URL_DEV + 'MessageView/GetMessage';

        const mockUserToken = await getMockUserDev()
        token = mockUserToken.token
    });

    it('Get data from ListMessages by messageId', async () => {
        try {
            //create channel
            const createChannel = await axios.post(baseUrlDev, { workspaceId: '0', name: 'TestMessage', userIds: [] },
                { headers: { 'x-session-token': token } })

            const getChannelId = createChannel.data.data.channel.channelId
            const getChannelWorkspaceId = createChannel.data.data.channel.workspaceId

            //mock message

            const mockMessage = await axios.post(baseUrl, { workspaceId: getChannelWorkspaceId, channelId: getChannelId, quantity: 1 })

            const messageId = mockMessage.data.data[0]

            //get message 

            const getMessage = await axios.get(`${baseUrlTestResponse}?workspaceId=${getChannelWorkspaceId}&channelId=${getChannelId}&messageId=${messageId}`, {
                headers: {
                    'x-session-token': token
                }
            })

            const dataGetMessage = getMessage.data

            expect(dataGetMessage.ok).toBe(true)

            expect(dataGetMessage.data).toBeDefined()

            expect(getChannelId).toEqual(dataGetMessage.data.message.channelId)

            expect(messageId).toEqual(dataGetMessage.data.message.messageId)

        }
        catch (error) {
            console.log(error)
        }

    });

})
