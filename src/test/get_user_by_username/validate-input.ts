import { getMockUser } from "../share-data";

const mockData = async () => {
    const { userName, token } = await getMockUser();
    return { userName, token }
};
export const testCases = [
    {
        describe: 'Test Get By Username',
        cases: [
            {
                name: 'should return error if username is null or undefined',
                header: async () => ({
                    token: (await mockData()).token
                }),
                payload: async () => ({
                    username: null
                }),
                expectedDetails: [
                    "username should not be null or undefined",
                ],
            },
            {
                name: 'should return error if name is empty',
                header: async () => ({
                    token: (await mockData()).token
                }),
                payload: async () => ({
                    username: ''
                }),
                expectedDetails: [
                    "username should not be empty",

                ],
            },
            {
                name: 'should return get data fail',
                header: async () => ({
                    token: (await mockData()).token
                }),
                payload: async () => ({
                    username: 'test1111101JH79MFDBWN6TW3ADAGEXDQXN'
                }),
                expectedDetails: ['get data fail'],
            },
            {
                name: 'should return get data successfully',
                header: async () => ({
                    token: (await mockData()).token
                }),
                payload: async () => ({
                    username: (await mockData()).userName
                }),
                expectedDetails: ['get data successfully'],
            },

        ],
    },

];
