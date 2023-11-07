import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // 생성한 데이터를 테스팅하는동안 기억하기 위해서는 beforeAll을 사용한다.
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // 테스팅 환경도 실제 환경과 같이 만들어줘야 한다.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 데코레이터가 없는 속성은 거른다.
        forbidNonWhitelisted: true, // 데코레이터가 없는 속성은 요청 자체를 막는다.
        transform: true, // url에서 받아온 데이터의 타입을 우리가 원하는 타입으로 변환해준다.
      }),
    );
    await app.init();
  });

  describe('movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/api/movies')
        .expect(200)
        .expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/api/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/api/movies').expect(404);
    });
  });

  describe('movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/api/movies/1').expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer()).get('/api/movies/999').expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/api/movies/1')
        .send({
          title: 'Updated Test',
        })
        .expect(200);
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/api/movies/1').expect(200);
    });
  });
});
