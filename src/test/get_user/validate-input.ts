
import { getMockUser } from '../share-data'

export const testCases = [
    {
        describe: 'Test Get User',
        cases: [
            {
                name: 'should return error if userId is null',
                payload: async () => {
                    const { userId, token } = await getMockUser();
                    return { userId: null, token: token };
                },
                expectedDetails: [
                    "userId should not be null or undefined",
                ],
            },
            {
                name: 'should return error if userId is undefined',
                payload: async () => {
                    const { userId, token } = await getMockUser();
                    return { userId: undefined, token: token };
                },
                expectedDetails: [
                    "userId should not be null or undefined",

                ],
            },
            {
                name: 'should return error if userId is empty string',
                payload: async () => {
                    const { userId, token } = await getMockUser();
                    return { userId: '', token: token };
                },
                expectedDetails: [

                    "userId should not be empty",

                ],
            },
            {
                name: 'should return error if userId is not a string',
                payload: async () => {
                    const { userId, token } = await getMockUser();
                    return { userId: 123456, token: token };
                },
                expectedDetails: [
                    "userId must be a string",
                ],
            },
            {
                name: 'should return error if user is not exists',
                payload: async () => {
                    const { userId, token } = await getMockUser();
                    return { userId: 'AAVB56FG5H442563', token: token };
                },
                expectedDetails: [
                    "User is not exists",
                ],
            },
            {
                name: 'should return get successfully',
                payload: async () => {
                    const { userId, token } = await getMockUser();
                    return { userId: userId, token: token };
                },
                expectedDetails: ['get user get successfully'],
            },
        ],
    },

];
