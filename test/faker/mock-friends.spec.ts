import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('E2E MockFriend', () => {
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
            name: 'should return quantity not be null or empty',
            payload: { quantity: null, type: 1 },
            expectedDetails: ['Error 1: Quantity must not be null or empty'],
        },
        {
            name: 'should return quantity must be a number',
            payload: { quantity: 'abcdefff', type: 1 },
            expectedDetails: ['Error 1: Quantity must be a number'],
        },
        {
            name: 'should return quantity must not less than 1',
            payload: { quantity: 0, type: 1 },
            expectedDetails: ['Error 1: Quantity must not be less than 1'],
        },
        {
            name: 'should return quantity must not greater than 100',
            payload: { quantity: 101, type: 1 },
            expectedDetails: ['Error 1: Quantity must not be greater than 100'],
        },
        {
            name: 'should return type must be a number',
            payload: { quantity: 1, type: 'abcdef' },
            expectedDetails: ['Error 1: Type must be a number'],
        },
        {
            name: 'should return type must not be null or empty',
            payload: { quantity: 1, type: null },
            expectedDetails: ['Error 1: Type must not be null or empty'],
        },
        {
            name: 'should return type must not be geater than 2',
            payload: { quantity: 1, type: 4 },
            expectedDetails: ['Error 1: Type must not be geater than 2'],
        },
        {
            name: 'should return type must not be less than 0',
            payload: { quantity: 1, type: -1 },
            expectedDetails: ['Error 1: Type must not be less than 0'],
        },
        {
            name: 'should return quantity must not be null or empty, type must be a number',
            payload: { quantity: null, type: 'abcdeff' },
            expectedDetails: [
                'Error 1: Quantity must not be null or empty',
                'Error 2: Type must be a number'
            ],
        },
        {
            name: 'should return type must not be geater than 2, quantity must be a number',
            payload: { quantity: 'abcdef', type: 3 },
            expectedDetails: [
                'Error 1: Quantity must be a number',
                'Error 2: Type must not be geater than 2'
            ],
        },
        {
            name: 'should return type must not be null, quantity must not greater than 100',
            payload: { quantity: 101, type: null },
            expectedDetails: [
                'Error 1: Quantity must not be greater than 100',
                'Error 2: Type must not be null or empty'
            ],
        },
    ];

    testCases.forEach(({ name, payload, expectedDetails }) => {
        it(name, async () => {
            const response = await request(app.getHttpServer())
                .post('/mock-friends')
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
            .post('/mock-friends')
            .send({ quantity: 1, type: 1 })
            .set(baseHeaders);

        expect(response.status).toBe(201);
        expect(response.body.ok).toBe(true);
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data[0]).toBeDefined();
        expect(response.body.error).toBeUndefined();
    });

});
