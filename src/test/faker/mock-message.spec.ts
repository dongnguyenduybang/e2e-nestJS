import axios from 'axios';

describe('E2E MockMessages', () => {
    const baseUrl = `https://api-sb11.rpc.ziichat.dev/InternalFaker/MockMessages`;
    const headers = {
        'x-user-id': '01JGMYQNFQG5V7ZKWND416PS3Z',
        'x-country-code': 'VN',
    };

    const testCases = [
        {
            name: 'should return quantity must not be null or empty',
            payload: { quantity: null, workspaceId: '0', channelId: '01JGX570EW00H1C9YR5N5HTA42' },
            expectedDetails: ['quantity should not be empty'],
        },
        {
            name: 'should return quantity must be a number',
            payload: { quantity: 'aaaaaaaa', workspaceId: '0', channelId: '01JGX570EW00H1C9YR5N5HTA42' },
            expectedDetails: ['quantity must be a number conforming to the specified constraints'],
        },
        {
            name: 'should return quantity must not less than 1',
            payload: { quantity: -1, workspaceId: '0', channelId: '01JGX570EW00H1C9YR5N5HTA42' },
            expectedDetails: ['quantity must not be less than 1'],
        },
        {
            name: 'should return quantity must not greater than 100',
            payload: { quantity: 101, workspaceId: '0', channelId: '01JGX570EW00H1C9YR5N5HTA42' },
            expectedDetails: ['quantity must not be greater than 100'],
        },
        {
            name: 'should return workspaceId must not be null or empty',
            payload: { quantity: 1, workspaceId: null, channelId: '01JGX570EW00H1C9YR5N5HTA42' },
            expectedDetails: ['workspaceId should not be null or undefined'],
        },
        {
            name: 'should return workspaceId must be a string',
            payload: { quantity: 1, workspaceId: 1, channelId: '01JGX570EW00H1C9YR5N5HTA42' },
            expectedDetails: ['workspaceId must be a string'],
        },
        {
            name: 'should return channelId must not be null or empty',
            payload: { quantity: 1, workspaceId: '0', channelId: null },
            expectedDetails: ['channelId should not be null or undefined'],
        },
        {
            name: 'should return channelId must be a string',
            payload: { quantity: 1, workspaceId: '0', channelId: 1234567 },
            expectedDetails: ['channelId must be a string'],
        },
        {
            name: 'should return quantity must not be less than 1, workspaceId must not be null or empty',
            payload: { quantity: -1, workspaceId: null, channelId: '01JGX570EW00H1C9YR5N5HTA42' },
            expectedDetails: [
                'quantity must not be less than 1',
                'workspaceId should not be null or undefined'
            ],
        },
        {
            name: 'should return channelId must not be null or empty, quantity must be a number',
            payload: { quantity: 'abcdsefs', workspaceId: '0', channelId: null },
            expectedDetails: [
                'quantity must be a number conforming to the specified constraints',
                'channelId should not be null or undefined',
            ],
        },
        {
            name: 'should return quantity must not be null or empty, channelId must not be null or empty',
            payload: { quantity: null, workspaceId: '0', channelId: null },
            expectedDetails: [
                'quantity should not be empty',
                'channelId should not be null or undefined',
            ],
        },
        {
            name: 'should return fake data messages successfully',
            payload: { quantity: 1, workspaceId: '0', channelId: '01JGX570EW00H1C9YR5N5HTA42' },
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