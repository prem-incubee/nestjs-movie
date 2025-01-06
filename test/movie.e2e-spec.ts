import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import { mock } from 'pactum';

describe('movie aggregator', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await mock.start(3001);
  });
  beforeEach(async () => {
    mock.addInteraction({
      request: { method: 'GET', path: '/movies/batman' },
      response: {
        status: 200,
        body: {
          data: {
            meta: {
              releasedOn: '1999-10-12T10:15:46.752Z',
            },
          },
        },
      },
    });
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await mock.stop();
  });

  it.only('given a movie name, gives oldness of the movie', async () => {
    const movieName = 'batman';
    const reseponse = await request(app.getHttpServer()).get(
      `/movies/${movieName}/oldness`,
    );
    expect(reseponse.status).toBe(200);
    expect(reseponse.body).toBeDefined();
    expect(reseponse.body.oldness).toBe('90s');
  });
});

describe('movie aggregator for profitability', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await mock.start(3001);
  });
  beforeEach(async () => {
    mock.addInteraction({
      request: { method: 'GET', path: '/movies/batman' },
      response: {
        status: 200,
        body: {
          data: {
            money: { made: 10, budget: 9 },
          },
        },
      },
    });
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await mock.stop();
  });

  it('given a movie name, gives result about movie profitability', async () => {
    const movieName = 'batman';
    const reseponse = await request(app.getHttpServer()).get(
      `/movies/${movieName}/profitable`,
    );
    expect(reseponse.status).toBe(200);
    expect(reseponse.body).toBeDefined();
    expect(reseponse.body.profitable).toBe('PROFITABLE');
  });
});

describe('movie aggregator for rating', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await mock.start(3001);
  });
  beforeEach(async () => {
    mock.addInteraction({
      request: { method: 'GET', path: '/movies/batman' },
      response: {
        status: 200,
        body: {
          data: {
            rating: 8,
          },
        },
      },
    });
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await mock.stop();
  });

  it('given a movie name, get the rating of the movie', async () => {
    const movieName = 'batman';
    const reseponse = await request(app.getHttpServer()).get(
      `/movies/${movieName}/rating`,
    );
    expect(reseponse.status).toBe(200);
    expect(reseponse.body).toBeDefined();
    expect(reseponse.body.rating).toBe(4);
  });
});
