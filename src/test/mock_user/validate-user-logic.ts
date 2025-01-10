export const validateLogicData = (response: any) => {
    const errors: string[] = [];


    if (response.ok && Array.isArray(response.data) && response.data.length > 0) {
        const userData = response.data[0];

        if (!userData.userId) errors.push('userId not found');
        if (!userData.username) errors.push('username not found');
        if (!userData.token) errors.push('token not found');
        if (!userData.securityKey) errors.push('securityKey not found');
        if (!userData.recoverKey) errors.push('recoverKey not found');

        if (typeof userData.badge !== 'number') errors.push('badge must be a number');

        if (errors.length === 0) {

            return {
                ok: true,
                message: 'mockuser successfully',
                data: userData
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
