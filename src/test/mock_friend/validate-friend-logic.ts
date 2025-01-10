export const validateLogicData = (response: any) => {
    const errors: string[] = [];

    if (response.ok && Array.isArray(response.data) && response.data.length > 0) {
        const friendData = response.data

        if (friendData.length === 0) {
            errors.push('data not found');
        }

        if (errors.length === 0) {
            return {
                ok: true,
                message: 'mockfriend successfully',
                data: friendData
            };
        } else {
            return {
                ok: false,
                data: null,
                error: {
                    code: 1000,
                    message: 'Invalid response',
                    details: errors,
                },
            };
        }
    } else {

        errors.push('Invalid response format or empty data');

        return {
            ok: false,
            data: null,
            error: {
                code: 1001,
                message: 'Invalid response format',
                details: errors,
            },
        };
    }
};
