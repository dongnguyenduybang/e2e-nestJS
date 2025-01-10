import { getMockChannelId } from '../share-data'


export const testCases = [
    {
        describe: 'Test QuantityField',
        cases: [
            {
                name: 'should return quantity is null',
                payload: { quantity: null, workspaceId: '0', channelId: '01JGX570EW00H1C9YR5N5HTA42' },
                expectedDetails: ['quantity should not be empty'],
            },
            {
                name: 'should return quantity is not a number',
                payload: { quantity: 'aaaaaaaa', workspaceId: '0', channelId: '01JGX570EW00H1C9YR5N5HTA42' },
                expectedDetails: ['quantity must be a number conforming to the specified constraints'],
            },
            {
                name: 'should return quantity is less than 1',
                payload: { quantity: -1, workspaceId: '0', channelId: '01JGX570EW00H1C9YR5N5HTA42' },
                expectedDetails: ['quantity must not be less than 1'],
            },
            {
                name: 'should return quantity is greater than 100',
                payload: { quantity: 101, workspaceId: '0', channelId: '01JGX570EW00H1C9YR5N5HTA42' },
                expectedDetails: ['quantity must not be greater than 100'],
            },
        ],
    },
    {
        describe: 'Test WorkspaceIdField',
        cases: [
            {
                name: 'should return workspaceId is null',
                payload: { quantity: 1, workspaceId: null, channelId: '01JGX570EW00H1C9YR5N5HTA42' },
                expectedDetails: ['workspaceId should not be null or undefined'],
            },
            {
                name: 'should return workspaceId is not a string',
                payload: { quantity: 1, workspaceId: 1, channelId: '01JGX570EW00H1C9YR5N5HTA42' },
                expectedDetails: ['workspaceId must be a string'],
            },
        ],
    },
    {
        describe: 'Test ChannelIdField',
        cases: [
            {
                name: 'should return channelId is null',
                payload: { quantity: 1, workspaceId: '0', channelId: null },
                expectedDetails: ['channelId should not be null or undefined'],
            },
            {
                name: 'should return channelId is not a string',
                payload: { quantity: 1, workspaceId: '0', channelId: 1234567 },
                expectedDetails: ['channelId must be a string'],
            },
        ],
    },
    {
        describe: 'Test Combined Cases',
        cases: [
            {
                name: 'should return errors for null quantity and channelId',
                payload: { quantity: null, workspaceId: '0', channelId: null },
                expectedDetails: [
                    'quantity should not be empty',
                    'channelId should not be null or undefined',
                ],
            },
            {
                name: 'should return errors for invalid quantity and null workspaceId',
                payload: { quantity: -1, workspaceId: null, channelId: '01JGX570EW00H1C9YR5N5HTA42' },
                expectedDetails: [
                    'quantity must not be less than 1',
                    'workspaceId should not be null or undefined',
                ],
            },
            {
                name: 'should return errors for invalid quantity and null channelId',
                payload: { quantity: 'abcdsefs', workspaceId: '0', channelId: null },
                expectedDetails: [
                    'quantity must be a number conforming to the specified constraints',
                    'channelId should not be null or undefined',
                ],
            },
            {
                name: 'should return fake data messages successfully',
                payload: { quantity: 1, workspaceId: '0', channelId: 'gfdvcbcvbcv' },
                expectedDetails: ['mockmessage successfully'],
            },
        ],
    },

];
