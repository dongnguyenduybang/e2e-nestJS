import axios from "axios";

export const getMockUser = async (): Promise<{ userId: string, token: string }> => {
    try {
        const baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockUsers';
        const payload = { prefix: 'testgetMockUser', quantity: 1, badge: 1 }

        const response = await axios.post(baseUrl, payload);
        if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
            const getUserId = response.data.data[0];
            return {
                userId: getUserId.userId,
                token: getUserId.token,
            };
        } else {
            throw new Error("Invalid response from MockUsers API");
        }
    } catch (error) {

        console.error("Error in getMockUser:", error);


        throw new Error("Failed to get getMockUser");
    }
};


export const getMockChannelId = async (): Promise<string> => {
    try {
        const baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockChannels';
        const baseCountryCode = process.env.HEADER_COUNTRY_CODE;
        const payload = { quantity: 1, prefix: 'testchannels', typeChannel: 1, totalMessages: 1 }
        const { userId, token } = await getMockUser();
        const headers = {
            'x-user-id': userId,
            'x-country-code': baseCountryCode
        }

        const response = await axios.post(baseUrl, payload, { headers });

        if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
            const getChannelId = response.data.data[0];
            return getChannelId.channelId;
        } else {
            throw new Error("Invalid response from MockChannel API");
        }
    } catch (error) {

        console.error("Error in getMockChannelId:", error);

        throw new Error("Failed to get mock user ID");
    }
};