import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';


describe('E2E MockMessage', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    const testCases = [
        {
            name: 'should return quantity must not be null or empty',
            payload: { quantity: null, workspaceId: '0', channelId: '01JGN846HNAA5AJQP637P0ATY0' },
            expectedDetails: ['Error 1: Quantity must not be null or empty'],
        },
        {
            name: 'should return quantity must be a number',
            payload: { quantity: 'aaaaaaaa', workspaceId: '0', channelId: '01JGN846HNAA5AJQP637P0ATY0' },
            expectedDetails: ['Error 1: Quantity must be a number'],
        },
        {
            name: 'should return quantity must not less than 1',
            payload: { quantity: 0, workspaceId: '0', channelId: '01JGN846HNAA5AJQP637P0ATY0' },
            expectedDetails: ['Error 1: Quantity must not be less than 1'],
        },
        {
            name: 'should return quantity must not greater than 100',
            payload: { quantity: 101, workspaceId: '0', channelId: '01JGN846HNAA5AJQP637P0ATY0' },
            expectedDetails: ['Error 1: Quantity must not be greater than 100'],
        },
        {
            name: 'should return workspaceId must not be null or empty',
            payload: { quantity: 1, workspaceId: null, channelId: '01JGN846HNAA5AJQP637P0ATY0' },
            expectedDetails: ['Error 1: WorkspaceId must not be null or empty'],
        },
        {
            name: 'should return workspaceId must be a string',
            payload: { quantity: 1, workspaceId: 1, channelId: '01JGN846HNAA5AJQP637P0ATY0' },
            expectedDetails: ['Error 1: WorkspaceId must be a string'],
        },
        {
            name: 'should return channelId must not be null or empty',
            payload: { quantity: 1, workspaceId: '0', channelId: null },
            expectedDetails: ['Error 1: ChannelId must not be null or empty'],
        },
        {
            name: 'should return channelId must be a string',
            payload: { quantity: 1, workspaceId: '0', channelId: 1234567 },
            expectedDetails: ['Error 1: ChannelId must be a string'],
        },
        {
            name: 'should return quantity must not less than 1, workspaceId must not be null or empty',
            payload: { quantity: 0, workspaceId: null, channelId: '01JGN846HNAA5AJQP637P0ATY0' },
            expectedDetails: [
                'Error 1: Quantity must not be less than 1',
                'Error 2: WorkspaceId must not be null or empty'
            ],
        },
        {
            name: 'should return channelId must not be null or empty, quantity must be a number',
            payload: { quantity: 'abcdsefs', workspaceId: '0', channelId: null },
            expectedDetails: [
                'Error 1: Quantity must be a number',
                'Error 2: ChannelId must not be null or empty',
            ],
        },
        {
            name: 'should return quantity must not be a null or empty, channelId must not be null or empty',
            payload: { quantity: null, workspaceId: '0', channelId: null },
            expectedDetails: [
                'Error 1: Quantity must not be null or empty',
                'Error 2: ChannelId must not be null or empty',
            ],
        },
    ];

    testCases.forEach(({ name, payload, expectedDetails }) => {
        it(name, async () => {
            const response = await request(app.getHttpServer())
                .post('/mock-messages')
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.ok).toBe(false);
            expect(response.body.data).toBeNull();
            expect(response.body.error.code).toBe(400);
            expect(response.body.error.message).toBe('Validation failed');
            expect(response.body.error.details).toEqual(expectedDetails);
        });
    });

    it('should return fake data messages successfully', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-messages')
            .send({ quantity: 1, workspaceId: '0', channelId: '01JGN846HNAA5AJQP637P0ATY0' });

        expect(response.status).toBe(201);
        expect(response.body.ok).toBe(true);
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data[0]).toBeDefined();
        expect(response.body.error).toBeUndefined();
    });
});