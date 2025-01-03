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

    it('should return prefix not be null or empty', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-user')
            .send({ prefix: null, quantity: 3, badge: 1 });

        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.data).toBeNull();
        expect(response.body.error.code).toBe(400);
        expect(response.body.error.message).toBe('Validation failed');
        expect(response.body.error.details).toContain('Error 1: Prefix must not be null or empty');

    });

    it('shold return prefix not be string', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-user')
            .send({ prefix: 12122212, quantity: 1, badge: 1 });

        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.data).toBeNull();
        expect(response.body.error.code).toBe(400);
        expect(response.body.error.message).toBe('Validation failed');
        expect(response.body.error.details).toContain('Error 1: Prefix must be a string')
    })

    it('should return prefix must be longer than or equal to 5 characters', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-user')
            .send({ prefix: "test", quantity: 1, badge: 1 })

        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.data).toBeNull();
        expect(response.body.error.code).toBe(400);
        expect(response.body.error.message).toBe('Validation failed');
        expect(response.body.error.details).toContain('Error 1: Prefix must be longer than or equal to 5 characters')

    })

    it('should return quantity must not be null or empty', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-user')
            .send({ prefix: 'testfaker', quantity: null, badge: 1 })

        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.data).toBeNull();
        expect(response.body.error.code).toBe(400);
        expect(response.body.error.message).toBe('Validation failed');
        expect(response.body.error.details).toContain('Error 1: Quantity must not be null or empty')
    })

    it('should return quantity must be a number', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-user')
            .send({ prefix: 'testfaker', quantity: 'testfaker', badge: 1 })

        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.data).toBeNull();
        expect(response.body.error.code).toBe(400);
        expect(response.body.error.message).toBe('Validation failed');
        expect(response.body.error.details).toContain('Error 1: Quantity must be a number')
    })

    it('should return quantity must not less than 1', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-user')
            .send({ prefix: 'testfaker', quantity: 0, badge: 1 })

        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.data).toBeNull();
        expect(response.body.error.code).toBe(400);
        expect(response.body.error.message).toBe('Validation failed');
        expect(response.body.error.details).toContain('Error 1: Quantity must not be less than 1')
    })

    it('should return quantity must not greater than 100', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-user')
            .send({ prefix: 'testfaker', quantity: 101, badge: 1 })

        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.data).toBeNull();
        expect(response.body.error.code).toBe(400);
        expect(response.body.error.message).toBe('Validation failed');
        expect(response.body.error.details).toContain('Error 1: Quantity must not be greater than 100')
    })

    it('should return badge must be a number', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-user')
            .send({ prefix: 'testfaker', quantity: 1, badge: 'abc' })

        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.data).toBeNull();
        expect(response.body.error.code).toBe(400);
        expect(response.body.error.message).toBe('Validation failed');
        expect(response.body.error.details).toContain('Error 1: Badge must be a number')
    })

    it('should return badge must not be greater than 3', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-user')
            .send({ prefix: 'testfaker', quantity: 1, badge: 5 })

        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.data).toBeNull();
        expect(response.body.error.code).toBe(400);
        expect(response.body.error.message).toBe('Validation failed');
        expect(response.body.error.details).toContain('Error 1: Badge must not be greater than 3')
    })

    it('should return prefix must be a string, quantity must be a number', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-user')
            .send({ prefix: 12345678, quantity: 'abcde', badge: 1 })

        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.data).toBeNull();
        expect(response.body.error.code).toBe(400);
        expect(response.body.error.message).toBe('Validation failed');
        expect(response.body.error.details).toEqual([
            'Error 1: Prefix must be a string',
            'Error 2: Quantity must be a number',
        ]);
    })

    it('should return quanity must not less than 1, badge must be a number', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-user')
            .send({ prefix: 'testfaker', quantity: 0, badge: 'abcdef' })

        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.data).toBeNull();
        expect(response.body.error.code).toBe(400);
        expect(response.body.error.message).toBe('Validation failed');
        expect(response.body.error.details).toEqual([
            'Error 1: Quantity must not be less than 1',
            'Error 2: Badge must be a number',
        ]);
    })

    it('should return badge not be null, prefix must not be empty', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-user')
            .send({ prefix: '', quantity: 1, badge: null })

        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.data).toBeNull();
        expect(response.body.error.code).toBe(400);
        expect(response.body.error.message).toBe('Validation failed');
        expect(response.body.error.details).toEqual([
            'Error 1: Prefix must not be null or empty',
            'Error 2: Badge must not be null',
        ]);
    })

    it('should return fake data user successfully', async () => {
        const response = await request(app.getHttpServer())
            .post('/mock-user')
            .send({ prefix: 'testfaker', quantity: 1, badge: 1 });

        expect(response.status).toBe(201);
        expect(response.body.ok).toBe(true);
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data[0].userId).toBeDefined();
        expect(response.body.data[0].username).toBeDefined();
        expect(response.body.data[0].badge).toBe(1);
        expect(response.body.error).toBeUndefined();
    });

});


