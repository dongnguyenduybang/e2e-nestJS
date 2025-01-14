import { getMockUser } from "../share-data";

const userId = async () => {
    const { userId } = await getMockUser();
    return { userId };
};

export const testCases = [
    {
        describe: 'Test Quantity Field',
        cases: [
            {
                name: 'should return quantity is null',
                header: userId,
                payload: { quantity: null, type: 1 },
                expectedDetails: ['quantity should not be empty'],
            },
            {
                name: 'should return quantity is not a number',
                header: userId,
                payload: { quantity: 'abcdef', type: 1 },
                expectedDetails: ['quantity must be a number conforming to the specified constraints'],
            },
            {
                name: 'should return quantity is less than 1',
                header: userId,
                payload: { quantity: 0, type: 1 },
                expectedDetails: ['quantity must not be less than 1'],
            },
            {
                name: 'should return quantity is greater than 200',
                header: userId,
                payload: { quantity: 201, type: 1 },
                expectedDetails: ['quantity must not be greater than 200'],
            },
        ],
    },
    {
        describe: 'Test Type Field',
        cases: [
            {
                name: 'should return type is null',
                header: userId,
                payload: { quantity: 1, type: null },
                expectedDetails: ['type must not be null or empty'],
            },
            {
                name: 'should return type is not a number',
                header: userId,
                payload: { quantity: 1, type: 'abcdef' },
                expectedDetails: ['type must be a number conforming to the specified constraints'],
            },
            {
                name: 'should return type is less than 0',
                header: userId,
                payload: { quantity: 1, type: -1 },
                expectedDetails: ['type must not be less than 0'],
            },
            {
                name: 'should return type is greater than 2',
                header: userId,
                payload: { quantity: 1, type: 3 },
                expectedDetails: ['type must not be greater than 2'],
            },
        ],
    },
    {
        describe: 'Test Combined Cases',
        cases: [
            {
                name: 'should return error for quantity null and type not a number',
                header: userId,
                payload: { quantity: null, type: 'abcdef' },
                expectedDetails: [
                    'quantity should not be empty',
                    'type must be a number conforming to the specified constraints',
                ],
            },
            {
                name: 'should return error for quantity greater than 200 and type null',
                header: userId,
                payload: { quantity: 201, type: null },
                expectedDetails: [
                    'quantity must not be greater than 200',
                    'type must not be null or empty',
                ],
            },
            {
                name: 'should return error for quantity less than 1 and type greater than 2',
                header: userId,
                payload: { quantity: 0, type: 3 },
                expectedDetails: [
                    'quantity must not be less than 1',
                    'type must not be greater than 2',
                ],
            },
            {
                name: 'should return fake data friends successfully',
                header: userId,
                payload: { quantity: 1, type: 1 },
                expectedDetails: ['mockfriend successfully'],
            },
        ],
    },
];
