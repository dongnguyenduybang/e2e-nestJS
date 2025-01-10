export const validateLogicData = (response: any) => {
    const errors: { field: string; message: string }[] = [];
    let validData = null;


    if (response.ok == true) {
        const responses = response.data
        validData = response;
        // Kiểm tra các trường cơ bản
        if (!responses.userId) errors.push({ field: 'userId', message: 'userId not found' });
        if (!responses.username) errors.push({ field: 'username', message: 'username not found' });
        if (!responses.createTime) errors.push({ field: 'createTime', message: 'createTime not found' });
        if (!responses.updateTime) errors.push({ field: 'updateTime', message: 'updateTime not found' });

        // Kiểm tra cụm profile
        if (!responses.profile) {
            errors.push({ field: 'profile', message: 'profile not found' });
        } else {
            const profile = responses.profile;


            if (!profile.displayName) {
                errors.push({ field: 'profile.displayName', message: 'displayName not found' });
            }
            if (!profile.avatar) {
                errors.push({ field: 'profile.avatar', message: 'avatar not found' });
            } else if (!profile.avatar.startsWith('https://')) {
                errors.push({ field: 'profile.avatar', message: 'avatar is not a valid URL' });
            }
            if (!profile.originalAvatar || profile.originalAvatar == '') {
                errors.push({ field: 'profile.originalAvatar', message: 'originalAvatar not found' });
            }
            if (profile.userBadgeType == null || profile.userBadgeType == '') {
                errors.push({ field: 'profile.userBadgeType', message: 'userBadgeType not found' });
            }
            if (profile.avatarType == null || profile.avatarType == '') {
                errors.push({ field: 'profile.avatarType', message: 'avatarType not found' });
            }
            if (!('cover' in profile || profile.avatarType == '')) {
                errors.push({ field: 'profile.cover', message: 'cover field is missing or empty' });
            }
            if (!('decoratedAvatar' in profile) || profile.decoratedAvatar == '') {
                errors.push({ field: 'profile.decoratedAvatar', message: 'decoratedAvatar field is missing or empty' });
            }
            if (!('originalDecoratedAvatar' in profile) || profile.originalDecoratedAvatar == '') {
                errors.push({ field: 'profile.originalDecoratedAvatar', message: 'originalDecoratedAvatar field is missing or empty' });
            }
            if (!('videoAvatar' in profile) || profile.videoAvatar == '') {
                errors.push({ field: 'profile.videoAvatar', message: 'videoAvatar field is missing or empty' });
            }
        }
    } else {
        errors.push({ field: 'response', message: 'Response data is invalid' });
    }


    if (errors.length === 0) {
        return {
            ok: true,
            message: 'get user get successfully',
            data: validData
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
