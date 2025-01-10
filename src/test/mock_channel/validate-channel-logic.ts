export const validateLogicData = (response: any, typeChannel: number) => {
    const errors: string[] = [];


    if (response.ok && Array.isArray(response.data) && response.data.length > 0) {
        const channelData = response.data[0];

        if (!channelData.channelId) errors.push('channelId not found');
        if (!channelData.ownerId) errors.push('channelId not found');
        if (!channelData.messageIds) errors.push('messageIds not found');
        if (typeChannel == 0) {

            if (!channelData.name) errors.push('name not found')
        }

        if (errors.length === 0) {

            return {
                ok: true,
                message: 'mockchannel successfully',
                data: channelData
            }

        } else {

            return {
                ok: false,
                data: null,
                error: {
                    code: 1000,
                    message: 'Invalid response',
                    details: errors
                }

            }
        }

    } else {
        errors.push('Invalid response format or empty data');
    }


};
