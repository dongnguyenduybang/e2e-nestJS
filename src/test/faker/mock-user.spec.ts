import axios from 'axios';

describe('E2E MockUsers', () => {
    const baseUrl = `https://api-sb11.rpc.ziichat.dev/InternalFaker/MockUsers`;
    const headers = {
        'x-user-id': '01JGMYQNFQG5V7ZKWND416PS3Z',
        'x-country-code': 'VN',
    };

    const testCases = [
        {
            name: 'should return prefix not be null or empty',
            payload: { prefix: null, quantity: 3, badge: 1 },
            expectedDetails: ['prefix should not be null or undefined'],
        },
        {
            name: 'should return prefix not be null or empty',
            payload: { prefix: null, quantity: 3, badge: 1 },
            expectedDetails: ['prefix should not be null or undefined'],
        },
        {
            name: 'should return prefix must be longer than or equal to 5 characters',
            payload: { prefix: 'test', quantity: 1, badge: 1 },
            expectedDetails: ['prefix must be longer than or equal to 5 characters'],
        },
        {
            name: 'should return quantity must not be null or empty',
            payload: { prefix: 'testfaker', quantity: null, badge: 1 },
            expectedDetails: ['quantity should not be null or empty'],
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
        {
            name: 'should return badge must be a number',
            payload: { prefix: 'testfaker', quantity: 1, badge: 'abc' },
            expectedDetails: ['badge must be a number conforming to the specified constraints'],
        },
        {
            name: 'should return badge must not be greater than 3',
            payload: { prefix: 'testfaker', quantity: 1, badge: 5 },
            expectedDetails: ['badge must not be greater than 3'],
        },
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
            ],
        },
        {
            name: 'should return badge not be null, prefix must not be empty',
            payload: { prefix: '', quantity: 1, badge: null },
            expectedDetails: [
                'prefix should not be empty',
                'badge should not be null or empty',
            ],
        },
        {
            name: 'should return fake data users successfully',
            payload: { prefix: 'testfakersssssssssssss', quantity: 1, badge: 1 },
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
