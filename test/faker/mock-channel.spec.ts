import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('E2E MockChannel', () => {
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

    const baseHeaders = {
        'x-user-id': '01JGMYQNFQG5V7ZKWND416PS3Z',
        'x-country-code': 'VN',
    };

    const testCases = [
        {
            name: 'should return prefix not be null or empty',
            payload: { quantity: 1, prefix: '', typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['Error 1: Prefix must not be null or empty'],
        },
        {
            name: 'should return prefix must be a string',
            payload: { quantity: 1, prefix: 1123, typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['Error 1: Prefix must be a string'],
        },
        {
            name: 'should return prefix must be longer than or equal to 5 characters',
            payload: { quantity: 1, prefix: 'abcd', typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['Error 1: Prefix must be longer than or equal to 5 characters'],
        },
        {
            name: 'should return quantity must not be null or empty',
            payload: { quantity: null, prefix: 'abcdefs', typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['Error 1: Quantity must not be null or empty'],
        },
        {
            name: 'should return quantity must not be less than 1',
            payload: { quantity: 0, prefix: 'abcdefg', typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['Error 1: Quantity must not be less than 1'],
        },
        {
            name: 'should return quantity must not be greater than 100',
            payload: { quantity: 101, prefix: 'abcdefg', typeChannel: 1, totalMessages: 2 },
            expectedDetails: ['Error 1: Quantity must not be greater than 100'],
        },
        {
            name: 'should return typeChannel not be null or empty',
            payload: { quantity: 1, prefix: 'abcdefg', typeChannel: null, totalMessages: 2 },
            expectedDetails: ['Error 1: TypeChannel must not be null or empty'],
        },
        {
            name: 'should return typeChannel must be a number',
            payload: { quantity: 1, prefix: 'abcdefg', typeChannel: 'aabbccdd', totalMessages: 2 },
            expectedDetails: ['Error 1: TypeChannel must be a number'],
        },
        {
            name: 'should return typeChannel must not be greater than 3',
            payload: { quantity: 1, prefix: 'abcdefg', typeChannel: 4, totalMessages: 2 },
            expectedDetails: ['Error 1: TypeChannel must not be greater than 3'],
        },
        {
            name: 'should return totalMessages not be null or empty',
            payload: { quantity: 1, prefix: 'abcdefg', typeChannel: 2, totalMessages: null },
            expectedDetails: ['Error 1: TotalMessages must not be null or empty'],
        },
        {
            name: 'should return totalMessages must be a number',
            payload: { quantity: 1, prefix: 'abcdefg', typeChannel: 2, totalMessages: 'abcdefg' },
            expectedDetails: ['Error 1: TotalMessages must be a number'],
        },
        {
            name: 'should return totalMessages must not be greater than 100',
            payload: { quantity: 1, prefix: 'abcdefg', typeChannel: 2, totalMessages: 101 },
            expectedDetails: ['Error 1: TotalMessages must not be greater than 100'],
        },
        {
            name: 'should return prefix null or empty, quantity must not be a number',
            payload: { quantity: 'abcdef', prefix: null, typeChannel: 2, totalMessages: 5 },
            expectedDetails: [
                'Error 1: Prefix must not be null or empty',
                'Error 2: Quantity must be a number',
            ],
        },
        {
            name: 'should return quantity must not be null or empty, totalMessages not be null or empty',
            payload: { quantity: null, prefix: 'abcdef', typeChannel: 2, totalMessages: null },
            expectedDetails: [
                'Error 1: Quantity must not be null or empty',
                'Error 2: TotalMessages must not be null or empty',
            ],
        },
        {
            name: 'should return typeChannel must not be greater than 3, prefix must not be null or empty',
            payload: { quantity: 1, prefix: null, typeChannel: 7, totalMessages: 1 },
            expectedDetails: [
                'Error 1: Prefix must not be null or empty',
                'Error 2: TypeChannel must not be greater than 3',
            ],
        },
    ];

    testCases.forEach(({ name, payload, expectedDetails }) => {
        it(name, async () => {
            const response = await request(app.getHttpServer())
                .post('/mock-channels')
                .send(payload)
                .set(baseHeaders);

            expect(response.status).toBe(400);
            expect(response.body.ok).toBe(false);
            expect(response.body.data).toBeNull();
            expect(response.body.error.code).toBe(400);
            expect(response.body.error.message).toBe('Validation failed');
            expect(response.body.error.details).toEqual(expectedDetails);
        });
    });

    it('should return fake data channels successfully', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-channels')
            .send({ quantity: 1, prefix: 'testfakerchannel11', typeChannel: 1, totalMessages: 1 })
            .set(baseHeaders);

        expect(response.status).toBe(201);
        expect(response.body.ok).toBe(true);
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data[0].channelId).toBeDefined();
        expect(response.body.error).toBeUndefined();
    });

});
