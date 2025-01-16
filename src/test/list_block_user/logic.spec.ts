// import axios from 'axios';
// import { getMockUser } from '../share-data';

// describe('List Block User Logic Validation', () => {

//     let baseUrl, token, baseUrlBLock, userId
//     let errors: { field: string, expected: string, actual: string }[] = [];

//     beforeAll(async () => {

//         baseUrl = process.env.API_BASE_URL + 'UserView/ListBlockedUsers';
//         baseUrlBLock = process.env.API_BASE_URL + 'UserSetting/BlockUser'

//         const mockUserToken = await getMockUser();
//         token = mockUserToken.token;

//         const mockUserId = await getMockUser();
//         userId = mockUserId.userId;

//         errors = [];
//     });

//     it('Test Logic List Block User', async () => {

//         try {

//             const blockUser = await axios.post(baseUrlBLock, { targetUserId: userId },
//                 { headers: { 'x-session-token': token } })

//             const checkBlocked = blockUser.data

//             if (checkBlocked.ok == true) {

//                 const response = await axios.get(baseUrl, {
//                     headers: {
//                         'x-session-token': token
//                     }
//                 });

//                 const assertDefined = (value: any, name: string, expectedType: string) => {
//                     if (value === undefined || value === null) {
//                         errors.push({ field: name, expected: expectedType, actual: 'undefined/null' });
//                     }
//                 };
//                 const assertString = (value: any, name: string) => {
//                     if (typeof value !== 'string') {
//                         errors.push({ field: name, expected: 'string', actual: typeof value });
//                     }
//                 };
//                 const assertNumber = (value: any, name: string) => {
//                     if (typeof value !== 'number') {
//                         errors.push({ field: name, expected: 'number', actual: typeof value });
//                     }
//                 };
//                 const assertBoolean = (value: any, name: string) => {
//                     if (typeof value !== 'boolean') {
//                         errors.push({ field: name, expected: 'boolean', actual: typeof value });
//                     }
//                 };
//                 const assertArray = (value: any, name: string) => {
//                     if (!Array.isArray(value)) {
//                         errors.push({ field: name, expected: 'array', actual: typeof value });
//                     }
//                 };
//                 const assertObject = (value: any, name: string) => {
//                     if (typeof value !== 'object' || Array.isArray(value)) {
//                         errors.push({ field: name, expected: 'object', actual: typeof value });
//                     }
//                 };

//                 const errors: any[] = [];
//                 const { ok, data, paging, includes, total } = response.data;

//                 assertDefined(ok, 'ok', 'boolean');
//                 assertBoolean(ok, 'ok');

//                 assertDefined(data, 'data', 'array');
//                 assertArray(data, 'data');

//                 data.forEach((user: any, index: number) => {
//                     const basePath = `data[${index}]`;

//                     assertDefined(user.userId, `${basePath}.userId`, 'string');
//                     assertString(user.userId, `${basePath}.userId`);

//                     assertDefined(user.username, `${basePath}.username`, 'string');
//                     assertString(user.username, `${basePath}.username`);

//                     assertDefined(user.profile, `${basePath}.profile`, 'object');
//                     assertObject(user.profile, `${basePath}.profile`);

//                     const profile = user.profile;
//                     assertDefined(profile.displayName, `${basePath}.profile.displayName`, 'string');
//                     assertString(profile.displayName, `${basePath}.profile.displayName`);
//                     assertDefined(profile.avatar, `${basePath}.profile.avatar`, 'string');
//                     assertString(profile.avatar, `${basePath}.profile.avatar`);
//                     assertDefined(profile.originalAvatar, `${basePath}.profile.originalAvatar`, 'string');
//                     assertString(profile.originalAvatar, `${basePath}.profile.originalAvatar`);
//                     assertDefined(profile.userBadgeType, `${basePath}.profile.userBadgeType`, 'number');
//                     assertNumber(profile.userBadgeType, `${basePath}.profile.userBadgeType`);
//                     assertDefined(profile.avatarType, `${basePath}.profile.avatarType`, 'number');
//                     assertNumber(profile.avatarType, `${basePath}.profile.avatarType`);

//                     if (profile.cover !== undefined) assertString(profile.cover, `${basePath}.profile.cover`);
//                     if (profile.decoratedAvatar !== undefined) assertString(profile.decoratedAvatar, `${basePath}.profile.decoratedAvatar`);
//                     if (profile.originalDecoratedAvatar !== undefined) assertString(profile.originalDecoratedAvatar, `${basePath}.profile.originalDecoratedAvatar`);
//                     if (profile.videoAvatar !== undefined) assertString(profile.videoAvatar, `${basePath}.profile.videoAvatar`);

//                     assertDefined(user.createTime, `${basePath}.createTime`, 'string');
//                     assertString(user.createTime, `${basePath}.createTime`);
//                     assertDefined(user.updateTime, `${basePath}.updateTime`, 'string');
//                     assertString(user.updateTime, `${basePath}.updateTime`);

//                     assertDefined(user.userType, `${basePath}.userType`, 'number');
//                     assertNumber(user.userType, `${basePath}.userType`);

//                     assertDefined(user.presenceData, `${basePath}.presenceData`, 'object');
//                     assertObject(user.presenceData, `${basePath}.presenceData`);

//                     const presenceData = user.presenceData;
//                     assertDefined(presenceData.presenceState, `${basePath}.presenceData.presenceState`, 'number');
//                     assertNumber(presenceData.presenceState, `${basePath}.presenceData.presenceState`);
//                     assertDefined(presenceData.lastUpdateInSeconds, `${basePath}.presenceData.lastUpdateInSeconds`, 'number');
//                     assertNumber(presenceData.lastUpdateInSeconds, `${basePath}.presenceData.lastUpdateInSeconds`);
//                     assertDefined(presenceData.lastUpdateTime, `${basePath}.presenceData.lastUpdateTime`, 'string');
//                     assertString(presenceData.lastUpdateTime, `${basePath}.presenceData.lastUpdateTime`);
//                 });

//                 assertDefined(paging, 'paging', 'object');
//                 assertObject(paging, 'paging');
//                 assertDefined(paging.hasPrev, 'paging.hasPrev', 'boolean');
//                 assertBoolean(paging.hasPrev, 'paging.hasPrev');
//                 assertDefined(paging.hasNext, 'paging.hasNext', 'boolean');
//                 assertBoolean(paging.hasNext, 'paging.hasNext');

//                 assertDefined(includes, 'includes', 'object');
//                 assertObject(includes, 'includes');
//                 assertDefined(includes.users, 'includes.users', 'array');
//                 assertArray(includes.users, 'includes.users');
//                 assertDefined(includes.channels, 'includes.channels', 'array');
//                 assertArray(includes.channels, 'includes.channels');
//                 assertDefined(includes.members, 'includes.members', 'array');
//                 assertArray(includes.members, 'includes.members');
//                 assertDefined(includes.messages, 'includes.messages', 'array');
//                 assertArray(includes.messages, 'includes.messages');
//                 assertDefined(includes.channelMetadata, 'includes.channelMetadata', 'array');
//                 assertArray(includes.channelMetadata, 'includes.channelMetadata');

//                 assertDefined(total, 'total', 'number');
//                 assertNumber(total, 'total');

//                 if (errors.length > 0) {
//                     console.table(errors.map(error => ({
//                         Field: error.field,
//                         ExpectedType: error.expected,
//                         ActualValue: error.actual
//                     })));
//                 }
//                 expect(errors).toEqual([]);
//             }

//         } catch (error) {
//             console.error('Error during API request:', error.message);
//         }


//     });
// });
