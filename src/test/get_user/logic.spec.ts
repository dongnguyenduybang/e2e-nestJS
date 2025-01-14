import axios from 'axios';
import { getMockUser } from '../share-data';

describe('GetUser Logic Validation', () => {
    let baseUrl: string;
    let token: string;
    let userId: string
    let errors: { field: string, expected: string, actual: string }[] = [];

    beforeAll(async () => {
        baseUrl = process.env.API_BASE_URL + 'UserView/GetUser';

        const mockUser = await getMockUser();
        token = mockUser.token;
        userId = mockUser.userId
        errors = [];
    });

    it('should return valid data when session token is valid', async () => {
        const response = await axios.get(`${baseUrl}?userId=${userId}`, { headers: { 'x-session-token': token } });

        const assertDefined = (value: any, name: string, expectedType: string) => {
            if (value === undefined || value === null) {
                errors.push({ field: name, expected: expectedType, actual: 'undefined/null' });
            }
        };
        const assertString = (value: any, name: string) => {
            if (typeof value !== 'string') {
                errors.push({ field: name, expected: 'string', actual: typeof value });
            }
        };
        const assertNumber = (value: any, name: string) => {
            if (typeof value !== 'number') {
                errors.push({ field: name, expected: 'number', actual: typeof value });
            }
        };
        const assertBoolean = (value: any, name: string) => {
            if (typeof value !== 'boolean') {
                errors.push({ field: name, expected: 'boolean', actual: typeof value });
            }
        };
        const assertUrl = (url: string, name: string) => {
            const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
            if (!urlRegex.test(url)) {
                errors.push({ field: name, expected: 'valid URL', actual: url });
            }
        };

        const { ok, data } = response.data;

        if (!ok) errors.push({ field: 'ok', expected: 'true', actual: String(ok) });

        assertDefined(data, 'data', 'object');

        const user = data;
        assertDefined(user.userId, 'userId', 'string');
        assertString(user.userId, 'userId');
        assertDefined(user.username, 'username', 'string');
        assertString(user.username, 'username');
        assertDefined(user.createTime, 'createTime', 'string');
        assertDefined(user.updateTime, 'updateTime', 'string');

        const createTime = new Date(user.createTime).getTime();
        const updateTime = new Date(user.updateTime).getTime();
        if (createTime > updateTime) {
            errors.push({ field: 'createTime', expected: '<= updateTime', actual: `${createTime} > ${updateTime}` });
        }

        assertNumber(user.userType, 'userType');

        const { profile } = user;
        assertDefined(profile, 'profile', 'object');
        assertDefined(profile.displayName, 'profile.displayName', 'string');
        assertString(profile.displayName, 'profile.displayName');
        assertDefined(profile.avatar, 'profile.avatar', 'string');
        assertUrl(profile.avatar, 'profile.avatar');
        assertDefined(profile.originalAvatar, 'profile.originalAvatar', 'string');
        assertUrl(profile.originalAvatar, 'profile.originalAvatar');
        assertNumber(profile.userBadgeType, 'profile.userBadgeType');
        assertNumber(profile.avatarType, 'profile.avatarType');
        assertDefined(profile.cover, 'profile.cover', 'string');
        assertDefined(profile.decoratedAvatar, 'profile.decoratedAvatar', 'string');
        assertDefined(profile.originalDecoratedAvatar, 'profile.originalDecoratedAvatar', 'string');
        assertDefined(profile.videoAvatar, 'profile.videoAvatar', 'string');

        const { presenceData } = user;
        assertDefined(presenceData, 'presenceData', 'object');
        assertNumber(presenceData.presenceState, 'presenceData.presenceState');
        assertNumber(presenceData.lastUpdateInSeconds, 'presenceData.lastUpdateInSeconds');
        assertDefined(presenceData.lastUpdateTime, 'presenceData.lastUpdateTime', 'string');

        if (user.statusData !== null) {
            errors.push({ field: 'statusData', expected: 'null', actual: String(user.statusData) });
        }

        const { friendData } = user;
        assertDefined(friendData, 'friendData', 'object');
        assertNumber(friendData.status, 'friendData.status');
        assertDefined(friendData.acceptTime, 'friendData.acceptTime', 'string');
        assertDefined(friendData.deleteTime, 'friendData.deleteTime', 'string');

        assertNumber(user.mediaPermissionSetting, 'mediaPermissionSetting');

        assertBoolean(user.blocked, 'blocked');

        if (errors.length > 0) {
            console.table(errors.map(error => ({
                Field: error.field,
                ExpectedType: error.expected,
                ActualValue: error.actual
            })));
        }
        expect(errors).toEqual([]);

    });
});
