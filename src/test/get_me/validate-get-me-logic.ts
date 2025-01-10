export const validateLogicData = (response: any) => {
    const errors: string[] = [];

    const getmeData = response.data;

    if (!getmeData.userId) errors.push('userId not found');
    if (!getmeData.username) errors.push('username not found');
    if (!getmeData.createTime) errors.push('createTime not found');
    if (!getmeData.updateTime) errors.push('updateTime not found');
    if (!getmeData.profile?.displayName) errors.push('displayName not found');
    if (!getmeData.profile?.avatar) errors.push('avatar not found');
    if (!getmeData.profile?.originalAvatar) errors.push('originalAvatar not found');

    if (errors.length === 0) {
        return {
            ok: true,
            message: 'get me get successfully',
            data: getmeData.data
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
        };
    }
};
