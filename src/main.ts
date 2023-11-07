import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // 앱 모듈 호출

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터가 없는 속성은 거른다.
      forbidNonWhitelisted: true, // 데코레이터가 없는 속성은 요청 자체를 막는다.
      transform: true, // url에서 받아온 데이터의 타입을 우리가 원하는 타입으로 변환해준다.
      // 보통 url에서 받아온 데이터는 string이다. 숫자값들은 number로 변환해준다.
    }),
  );
  await app.listen(3000);
}
bootstrap();
