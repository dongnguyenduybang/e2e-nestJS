import { getMockUser } from '../share-data';

export const testCases: any = [
    {
        describe: 'Test Get Me',
        cases: [
            {
                name: 'should return error if session token is null or undefined',
                header: async () => {
                    const { token } = await getMockUser();
                    return { token: null };
                },
                payload: {},
                expectedDetails:
                    ["Token should not be null or undefined"],

            },
            {
                name: 'should return error if session token is empty',
                header: async () => {
                    const { token } = await getMockUser();
                    return { token: '' };
                },
                payload: {},
                expectedDetails:
                    ["Token should not be empty"],

            },
            {
                name: 'should return get me successfully',
                header: async () => {
                    const { token } = await getMockUser();
                    return { token: token };
                },
                payload: {},
                expectedDetails: ['GetMe get data successfully'],
            },
        ],
    },
];
