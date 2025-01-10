
import { getMockUser } from '../share-data'

export const testCases = [
    {
        describe: 'Test Get User',
        cases: [
            {
                name: 'should return error if userId is null',
                userId: null,
                expectedDetails: [
                    "userId should not be null or undefined",
                ],
            },
            {
                name: 'should return error if userId is undefined',
                userId: undefined,
                expectedDetails: [
                    "userId should not be null or undefined",

                ],
            },
            {
                name: 'should return error if userId is empty string',
                userId: "",
                expectedDetails: [

                    "userId should not be empty",

                ],
            },
            {
                name: 'should return error if userId is not a string',
                userId: 12345,
                expectedDetails: [
                    "userId must be a string",
                ],
            },
            {
                name: 'should return error if user is not exists',
                userId: '01JH753FMTR6QRPGVYT7PFDCK5',
                expectedDetails: [
                    "User is not exists",
                ],
            },
            {
                name: 'should return get successfully',
                userId: '01JH753FMTR6QRPGVYT7PFDC5J',
                expectedDetails: ['get user get successfully'],
            },
        ],
    },

];
