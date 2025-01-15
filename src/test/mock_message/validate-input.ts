import { getMockChannel } from "../share-data";

const createHeader = async () => {
    const { channelId } = await getMockChannel();
    return channelId;
};

export const testCases = [
    {
        describe: 'Test QuantityField',
        cases: [
            {
                name: 'should return quantity is null',
                payload: async () => ({
                    quantity: null,
                    workspaceId: '0',
                    channelId: await createHeader(),
                }),
                expectedDetails: ['quantity should not be empty'],
            },
            {
                name: 'should return quantity is not a number',
                payload: async () => ({
                    quantity: 'abc',
                    workspaceId: '0',
                    channelId: await createHeader(),
                }),
                expectedDetails: ['quantity must be a number conforming to the specified constraints'],
            },
            {
                name: 'should return quantity is less than 1',
                payload: async () => ({
                    quantity: -1,
                    workspaceId: '0',
                    channelId: await createHeader(),
                }),
                expectedDetails: ['quantity must not be less than 1'],
            },
            {
                name: 'should return quantity is greater than 100',
                payload: async () => ({
                    quantity: 101,
                    workspaceId: '0',
                    channelId: await createHeader(),
                }),
                expectedDetails: ['quantity must not be greater than 100'],
            },
        ],
    },
    {
        describe: 'Test WorkspaceIdField',
        cases: [
            {
                name: 'should return workspaceId is null',
                payload: async () => ({
                    quantity: 1,
                    workspaceId: null,
                    channelId: await createHeader(),
                }),
                expectedDetails: ['workspaceId should not be null or undefined'],
            },
            {
                name: 'should return workspaceId is not a string',
                payload: async () => ({
                    quantity: 1,
                    workspaceId: 12311313,
                    channelId: await createHeader(),
                }),
                expectedDetails: ['workspaceId must be a string'],
            },
        ],
    },
    {
        describe: 'Test ChannelIdField',
        cases: [
            {
                name: 'should return channelId is null',
                payload: async () => ({
                    quantity: 1,
                    workspaceId: '0',
                    channelId: null,
                }),
                expectedDetails: ['channelId should not be null or undefined'],
            },
            {
                name: 'should return channelId is not a string',
                payload: async () => ({
                    quantity: 1,
                    workspaceId: '0',
                    channelId: 123456,
                }),
                expectedDetails: ['channelId must be a string'],
            },
        ],
    },
    {
        describe: 'Test Combined Cases',
        cases: [
            {
                name: 'should return errors for null quantity and channelId',
                payload: async () => ({
                    quantity: null,
                    workspaceId: '0',
                    channelId: null,
                }),
                expectedDetails: [
                    'quantity should not be empty',
                    'channelId should not be null or undefined',
                ],
            },
            {
                name: 'should return errors for invalid quantity and null workspaceId',
                payload: async () => ({
                    quantity: -1,
                    workspaceId: null,
                    channelId: await createHeader(),
                }),
                expectedDetails: [
                    'quantity must not be less than 1',
                    'workspaceId should not be null or undefined',
                ],
            },
            {
                name: 'should return errors for invalid quantity and null channelId',
                payload: async () => ({
                    quantity: 'abc',
                    workspaceId: '0',
                    channelId: null,
                }),
                expectedDetails: [
                    'quantity must be a number conforming to the specified constraints',
                    'channelId should not be null or undefined',
                ],
            },
            {
                name: 'should return fake data messages successfully',
                payload: async () => ({
                    quantity: 1,
                    workspaceId: '0',
                    channelId: await createHeader(),
                }),
                expectedDetails: ['mockmessage successfully'],
            },
        ],
    },
    {
        describe: 'Test ChannelId Null Cases',
        cases: [
            {
                name: 'should handle null channelId with valid quantity and workspaceId',
                payload: async () => ({
                    quantity: 10,
                    workspaceId: 'workspace_1',
                    channelId: null,
                }),
                expectedDetails: ['channelId should not be null or undefined'],
            },
            {
                name: 'should handle null channelId with invalid quantity',
                payload: async () => ({
                    quantity: -5,
                    workspaceId: 'workspace_1',
                    channelId: null,
                }),
                expectedDetails: [
                    'quantity must not be less than 1',
                    'channelId should not be null or undefined',
                ],
            },
            {
                name: 'should handle null channelId with null workspaceId',
                payload: async () => ({
                    quantity: 5,
                    workspaceId: null,
                    channelId: null,
                }),
                expectedDetails: [
                    'workspaceId should not be null or undefined',
                    'channelId should not be null or undefined',
                ],
            },
        ],
    },
];
