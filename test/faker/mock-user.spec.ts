import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('E2E MockUser', () => {
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
            name: 'should return prefix not be null or empty',
            payload: { prefix: null, quantity: 3, badge: 1 },
            expectedDetails: ['Error 1: Prefix must not be null or empty'],
        },
        {
            name: 'should return prefix must be a string',
            payload: { prefix: 12122212, quantity: 1, badge: 1 },
            expectedDetails: ['Error 1: Prefix must be a string'],
        },
        {
            name: 'should return prefix must be longer than or equal to 5 characters',
            payload: { prefix: 'test', quantity: 1, badge: 1 },
            expectedDetails: ['Error 1: Prefix must be longer than or equal to 5 characters'],
        },
        {
            name: 'should return quantity must not be null or empty',
            payload: { prefix: 'testfaker', quantity: null, badge: 1 },
            expectedDetails: ['Error 1: Quantity must not be null or empty'],
        },
        {
            name: 'should return quantity must be a number',
            payload: { prefix: 'testfaker', quantity: 'testfaker', badge: 1 },
            expectedDetails: ['Error 1: Quantity must be a number'],
        },
        {
            name: 'should return quantity must not less than 1',
            payload: { prefix: 'testfaker', quantity: -1, badge: 1 },
            expectedDetails: ['Error 1: Quantity must not be less than 0'],
        },
        {
            name: 'should return quantity must not greater than 100',
            payload: { prefix: 'testfaker', quantity: 101, badge: 1 },
            expectedDetails: ['Error 1: Quantity must not be greater than 100'],
        },
        {
            name: 'should return badge must be a number',
            payload: { prefix: 'testfaker', quantity: 1, badge: 'abc' },
            expectedDetails: ['Error 1: Badge must be a number'],
        },
        {
            name: 'should return badge must not be greater than 3',
            payload: { prefix: 'testfaker', quantity: 1, badge: 5 },
            expectedDetails: ['Error 1: Badge must not be greater than 3'],
        },
        {
            name: 'should return prefix must be a string, quantity must be a number',
            payload: { prefix: 12345678, quantity: 'abcde', badge: 1 },
            expectedDetails: [
                'Error 1: Prefix must be a string',
                'Error 2: Quantity must be a number',
            ],
        },
        {
            name: 'should return quantity must not less than 1, badge must be a number',
            payload: { prefix: 'testfaker', quantity: -1, badge: 'abcdef' },
            expectedDetails: [
                'Error 1: Quantity must not be less than 0',
                'Error 2: Badge must be a number',
            ],
        },
        {
            name: 'should return badge not be null, prefix must not be empty',
            payload: { prefix: '', quantity: 1, badge: null },
            expectedDetails: [
                'Error 1: Prefix must not be null or empty',
                'Error 2: Badge must not be null',
            ],
        },
    ];

    testCases.forEach(({ name, payload, expectedDetails }) => {
        it(name, async () => {
            const response = await request(app.getHttpServer())
                .post('/mock-users')
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.ok).toBe(false);
            expect(response.body.data).toBeNull();
            expect(response.body.error.code).toBe(400);
            expect(response.body.error.message).toBe('Validation failed');
            expect(response.body.error.details).toEqual(expectedDetails);
        });
    });

    it('should return fake data user successfully', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-users')
            .send({ prefix: 'testfakers', quantity: 1, badge: 1 });

        expect(response.status).toBe(201);
        expect(response.body.ok).toBe(true);
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data[0].userId).toBeDefined();
        expect(response.body.data[0].username).toBeDefined();
        expect(response.body.data[0].badge).toBe(1);
        expect(response.body.error).toBeUndefined();
    });
});
