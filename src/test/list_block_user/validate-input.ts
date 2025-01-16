
import { getMockUser } from '../share-data'

export const testCases = [
    {
        describe: 'Test Get List Block User',
        cases: [
            {
                name: 'should return error if token is null or undefined',
                header: async () => {
                    const { token } = await getMockUser();
                    return { token: null };
                },
                expectedDetails: [
                    "token should not be null or undefined",
                ],
            },
            {
                name: 'should return get data successfully',
                header: async () => {
                    const { token } = await getMockUser();
                    return { token: token };
                },
                expectedDetails: [
                    "get data successfully",

                ],
            },
        ],
    },

];
