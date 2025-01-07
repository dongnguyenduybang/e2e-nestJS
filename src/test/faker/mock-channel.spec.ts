import axios from 'axios';

describe('E2E MockChannels', () => {
    const baseUrl = `https://api-sb11.rpc.ziichat.dev/InternalFaker/MockChannels`;
    const headers = {
        'x-user-id': '01JGMYQNFQG5V7ZKWND416PS3Z',
        'x-country-code': 'VN',
    };
    const testCases = [
        {
            name: 'should return quantity is null',
            payload: { quantity: null, prefix: 'valid', typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['quantity should not be empty'],
        },
        {
            name: 'should return quantity is not a number',
            payload: { quantity: 'abc', prefix: 'valid', typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['quantity must be a number conforming to the specified constraints'],
        },
        {
            name: 'should return quantity is less than 1',
            payload: { quantity: 0, prefix: 'valid', typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['quantity must not be less than 1'],
        },
        {
            name: 'should return quantity is greater than 100',
            payload: { quantity: 101, prefix: 'valid', typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['quantity must not be greater than 100'],
        },
        {
            name: 'should return prefix is null',
            payload: { quantity: 1, prefix: null, typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['prefix should not be null or undefined'],
        },
        {
            name: 'should return prefix is empty',
            payload: { quantity: 1, prefix: '', typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['prefix should not be empty'],
        },
        {
            name: 'should return prefix is not a string',
            payload: { quantity: 1, prefix: 12345, typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['prefix must be a string'],
        },
        {
            name: 'should return prefix is shorter than 5 characters',
            payload: { quantity: 1, prefix: 'abcd', typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['prefix must be longer than or equal to 5 characters'],
        },
        {
            name: 'should return totalMessages is null',
            payload: { quantity: 1, prefix: 'valid', typeChannel: 1, totalMessages: null },
            expectedDetails: ['totalMessages should not be empty'],
        },
        {
            name: 'should return totalMessages is not a number',
            payload: { quantity: 1, prefix: 'valid', typeChannel: 1, totalMessages: 'abc' },
            expectedDetails: ['totalMessages must be a number conforming to the specified constraints'],
        },
        {
            name: 'should return totalMessages is less than 0',
            payload: { quantity: 1, prefix: 'valid', typeChannel: 1, totalMessages: -1 },
            expectedDetails: ['totalMessages must not be less than 0'],
        },
        {
            name: 'should return totalMessages is greater than 1000',
            payload: { quantity: 1, prefix: 'valid', typeChannel: 1, totalMessages: 1001 },
            expectedDetails: ['totalMessages must not be greater than 1000'],
        },
        {
            name: 'should return typeChannel is null',
            payload: { quantity: 1, prefix: 'valid', typeChannel: null, totalMessages: 2 },
            expectedDetails: ['typeChannel must not be null or empty'],
        },
        {
            name: 'should return typeChannel is not a number',
            payload: { quantity: 1, prefix: 'valid', typeChannel: 'abc', totalMessages: 2 },
            expectedDetails: ['typeChannel must be a number conforming to the specified constraints'],
        },
        {
            name: 'should return typeChannel is less than 0',
            payload: { quantity: 1, prefix: 'valid', typeChannel: -1, totalMessages: 2 },
            expectedDetails: ['typeChannel must not be less than 0'],
        },
        {
            name: 'should return typeChannel is greater than 3',
            payload: { quantity: 1, prefix: 'valid', typeChannel: 4, totalMessages: 2 },
            expectedDetails: ['typeChannel must not be greater than 3'],
        },
        {
            name: 'should return errors for null prefix and invalid quantity',
            payload: { quantity: 'abc', prefix: null, typeChannel: 1, totalMessages: 2 },
            expectedDetails: [
                'prefix should not be null or undefined',
                'quantity must be a number conforming to the specified constraints',
            ],
        },
        {
            name: 'should return errors for null totalMessages and typeChannel greater than 3',
            payload: { quantity: 1, prefix: 'valid', typeChannel: 4, totalMessages: null },
            expectedDetails: [
                'totalMessages should not be empty',
                'typeChannel must not be greater than 3',
            ],
        },
        {
            name: 'should return fake data channels successfully',
            payload: { quantity: 1, prefix: 'testfakerssssssssssssss', typeChannel: 1, totalMessages: 1 },
            expectedDetails: null
        }
    ];

    testCases.forEach(({ name, payload, expectedDetails }) => {
        it(name, async () => {
            try {
                const response = await axios.post(baseUrl, payload, { headers });

                if (expectedDetails == null) {

                    expect(response.status).toBe(201);
                    expect(response.data.ok).toBe(true);
                    expect(Array.isArray(response.data.data)).toBe(true);
                    expect(response.data.data.length).toBe(payload.quantity);
                } else {

                    fail('API should have returned an error but returned success');
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    const { response } = error;
                    if (expectedDetails == null) {

                        fail('API should have returned success but returned an error');
                    } else {

                        expect(response.status).toBe(400);
                        expectedDetails.forEach((expectedDetail) => {
                            expect(response.data.error.details).toContain(expectedDetail);
                        });
                    }
                } else {
                    throw error;
                }
            }
        });
    });


});
