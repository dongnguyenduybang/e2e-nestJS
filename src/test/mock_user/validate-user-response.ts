import axios from 'axios';

const checkMockChannel = async (userId: string, baseCountryCode: string) => {
    const errors: { field: string; message: string }[] = [];
    const mockChannelBaseUrl = process.env.API_BASE_URL + 'InternalFaker/MockChannels';
    const payload = { quantity: 1, prefix: "aaaaaaa", typeChannel: 0, totalMessages: 1 };
    const headers = {
        'x-user-id': userId,
        'x-country-code': baseCountryCode,
    };

    let mockChannelData = null;

    try {
        const response = await axios.post(mockChannelBaseUrl, payload, { headers });

        if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
            const dataChannel = response.data.data[0];
            mockChannelData = dataChannel;

            if (!dataChannel.channelId) errors.push({ field: 'channelId', message: 'channelId not found' });
            if (!dataChannel.name) errors.push({ field: 'name', message: 'name not found' });
            if (!dataChannel.ownerId) errors.push({ field: 'ownerId', message: 'ownerId not found' });
        } else {
            errors.push({ field: 'userId', message: 'userId invalid' });
        }
    } catch (error) {
        errors.push({ field: 'MockChannel', message: 'Failed to call MockChannel API' });
    }

    return { errors, data: mockChannelData };
};


const checkToken = async (token: string) => {
    const errors: { field: string; message: string }[] = [];
    const mockTokenBaseUrl = process.env.API_BASE_URL + 'UserView/GetMe';

    let tokenData = null;

    try {
        const response = await axios.get(mockTokenBaseUrl, {
            headers: {
                'x-session-token': token
            }
        });

        if (response.data?.data) {
            const dataGetMe = response.data.data;
            tokenData = dataGetMe;

            if (!dataGetMe.userId) errors.push({ field: 'userId', message: 'userId not found' });
            if (!dataGetMe.username) errors.push({ field: 'username', message: 'username not found' });
            if (!dataGetMe.createTime) errors.push({ field: 'createTime', message: 'createTime not found' });
            if (!dataGetMe.updateTime) errors.push({ field: 'updateTime', message: 'updateTime not found' });
            if (!dataGetMe.profile?.displayName) errors.push({ field: 'displayName', message: 'displayName not found' });
            if (!dataGetMe.profile?.userBadgeType) errors.push({ field: 'userBadgeType', message: 'userBadgeType not found' });
            if (!dataGetMe.profile?.avatar) errors.push({ field: 'avatar', message: 'avatar not found' });
        } else {
            errors.push({ field: 'token', message: 'token invalid' });
        }
    } catch (error) {
        errors.push({ field: 'GetMe', message: 'Failed to call GetMe API' });
    }

    return { errors, data: tokenData };
};

export const validateResponseData = async (response: any) => {
    const errors: { check: string; message: string; details: { field: string; message: string }[] }[] = [];
    const baseCountryCode = process.env.HEADER_COUNTRY_CODE;

    const { errors: mockChannelErrors, data: mockChannelData } = await checkMockChannel(response.userId, baseCountryCode);
    const { errors: tokenErrors, data: tokenData } = await checkToken(response.token);

    if (mockChannelErrors.length > 0) {
        errors.push({ check: 'MockChannel', message: 'Errors in MockChannel:', details: mockChannelErrors });
    }

    if (tokenErrors.length > 0) {
        errors.push({ check: 'GetMe', message: 'Errors in Token:', details: tokenErrors });
    }

    if (errors.length > 0) {
        return {
            ok: false,
            errors: errors
        };
    }

    return {
        ok: true,
        data: {
            mockChannelData,
            tokenData
        }
    };
};


