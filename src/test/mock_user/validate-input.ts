export const testCases = [

    {
        describe: 'Test PrefixField',
        cases: [
            {
                name: 'should return prefix not be null or empty',
                payload: { prefix: null, quantity: 3, badge: 1 },
                expectedDetails: ['prefix should not be empty'],
            },
            {
                name: 'should return prefix must be longer than or equal to 5 characters',
                payload: { prefix: 'test', quantity: 1, badge: 1 },
                expectedDetails: ['prefix must be longer than or equal to 5 characters'],
            },
            {
                name: 'should return prefix must be a string',
                payload: { prefix: 12345678, quantity: 1, badge: 1 },
                expectedDetails: ['prefix must be a string'],
            },
        ],
    },
    {
        describe: 'Test QuantityField',
        cases: [
            {
                name: 'should return quantity must not be null or empty',
                payload: { prefix: 'testfaker', quantity: null, badge: 1 },
                expectedDetails: [
                    "quantity must not be greater than 100",
                    "quantity must not be less than 1",
                    "quantity should not be empty",
                    "quantity must be a number conforming to the specified constraints",
                ],
            },
            {
                name: 'should return quantity must be a number',
                payload: { prefix: 'testfaker', quantity: 'testfaker', badge: 1 },
                expectedDetails: ['quantity must be a number conforming to the specified constraints'],
            },
            {
                name: 'should return quantity must not less than 1',
                payload: { prefix: 'testfaker', quantity: -1, badge: 1 },
                expectedDetails: ['quantity must not be less than 1'],
            },
            {
                name: 'should return quantity must not greater than 100',
                payload: { prefix: 'testfaker', quantity: 101, badge: 1 },
                expectedDetails: ['quantity must not be greater than 100'],
            },
        ],
    },
    {
        describe: 'Test BadgeField',
        cases: [
            {
                name: 'should return badge must be a number',
                payload: { prefix: 'testfaker', quantity: 1, badge: 'abc' },
                expectedDetails: ['badge must be a number conforming to the specified constraints'],
            },
            {
                name: 'should return badge must not be greater than 3',
                payload: { prefix: 'testfaker', quantity: 1, badge: 5 },
                expectedDetails: ["badge must be one of the following values: 0, 1, 2, 3"],
            },
            {
                name: 'should return badge not be null',
                payload: { prefix: '', quantity: 1, badge: null },
                expectedDetails: [
                    "badge should not be empty",
                    "badge must be one of the following values: 0, 1, 2, 3",
                    "badge must be a number conforming to the specified constraints",
                ],
            },
        ],
    },
    {
        describe: 'Test Combined Cases',
        cases: [
            {
                name: 'should return prefix must be a string, quantity must be a number',
                payload: { prefix: 12345678, quantity: 'abcde', badge: 1 },
                expectedDetails: [
                    'prefix must be a string',
                    'quantity must be a number conforming to the specified constraints',
                ],
            },
            {
                name: 'should return quantity must not less than 1, badge must be a number',
                payload: { prefix: 'testfaker', quantity: -1, badge: 'abcdef' },
                expectedDetails: [
                    'quantity must not be less than 1',
                    'badge must be a number conforming to the specified constraints',
                    'badge must be one of the following values: 0, 1, 2, 3',
                ],
            },
            {
                name: 'should return badge not be null, prefix must not be empty',
                payload: { prefix: '', quantity: 1, badge: null },
                expectedDetails: [
                    "prefix must be longer than or equal to 5 characters",
                    "prefix should not be empty",
                    "badge should not be empty",
                    "badge must be one of the following values: 0, 1, 2, 3",
                    "badge must be a number conforming to the specified constraints",
                ],
            },
            {
                name: 'should return fake data users successfully',
                payload: { prefix: 'test11111', quantity: 1, badge: 1 },
                expectedDetails: ['mockuser successfully'],
            },
        ],
    },

];
