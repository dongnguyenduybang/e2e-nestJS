import axios from 'axios';
import { getMockUser } from '../share-data';
import { testCases } from './validate-input';

describe('GetMe Logic Validation', () => {
    let baseUrl;
    let token;
    let errors: string[] = [];
    beforeAll(async () => {

        baseUrl = process.env.API_BASE_URL + 'UserView/GetMe';
        const mockUser = await getMockUser();
        token = mockUser.token;
        errors = [];
    });

    testCases.forEach(testGroup => {

        describe(testGroup.describe, () => {

            testGroup.cases.forEach(testCase => {

                it('Test Logic GetMe', async () => {

                    const { token } = await testCase.header()

                    const response = await axios.get(baseUrl, { headers: { 'x-session-token': token } });


                    const errors: { field: string, expected: string, actual: string }[] = [];

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
                    assertDefined(user.username, 'username', 'string');
                    assertDefined(user.createTime, 'createTime', 'string');
                    assertDefined(user.updateTime, 'updateTime', 'string');

                    const createTime = new Date(user.createTime).getTime();
                    const updateTime = new Date(user.updateTime).getTime();
                    if (createTime > updateTime) {
                        errors.push({ field: 'createTime', expected: '<= updateTime', actual: createTime + ' > ' + updateTime });
                    }

                    const { profile } = user;
                    assertDefined(profile, 'profile', 'object');
                    assertDefined(profile.displayName, 'profile.displayName', 'string');
                    assertString(profile.displayName, 'profile.displayName');
                    assertString(profile.avatar, 'profile.avatar');
                    assertString(profile.originalAvatar, 'profile.originalAvatar');
                    assertNumber(profile.userBadgeType, 'profile.userBadgeType');

                    if (user.statusData !== null) errors.push({ field: 'statusData', expected: 'null', actual: String(user.statusData) });
                    if (user.globalNotificationStatus !== true) errors.push({ field: 'globalNotificationStatus', expected: 'true', actual: String(user.globalNotificationStatus) });
                    assertDefined(user.userConnectLink, 'userConnectLink', 'string');
                    assertUrl(user.userConnectLink, 'userConnectLink');

                    const { setting } = user;
                    assertDefined(setting, 'setting', 'object');
                    assertDefined(setting.security, 'setting.security', 'object');
                    assertDefined(setting.privacy, 'setting.privacy', 'object');

                    const { security } = setting;
                    assertDefined(security.recoveryCode, 'security.recoveryCode', 'object');
                    assertDefined(security.smartOTP, 'security.smartOTP', 'object');
                    assertBoolean(security.recoveryCode.enable, 'security.recoveryCode.enable');
                    assertBoolean(security.smartOTP.enable, 'security.smartOTP.enable');

                    const { privacy } = setting;
                    assertDefined(privacy.mediaPermission, 'privacy.mediaPermission', 'object');
                    assertNumber(privacy.mediaPermission.value, 'privacy.mediaPermission.value');


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
        });
    });



});

