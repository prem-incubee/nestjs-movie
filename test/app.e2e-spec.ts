import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { mock } from 'pactum';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await mock.start(3002);
  });
  beforeEach(async () => {
    mock.addInteraction({
      request: { method: 'GET', path: '/one' },
      response: { status: 200, body: { value: 'one' } },
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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/GETs one', async () => {
    const response = await request(app.getHttpServer()).get('/one');
    expect(response.body.data).toBe('one');
  });
});
