import { Module } from '@nestjs/common';

import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
// 데코레이터
// 데코레이터는 클래스에 함수기능을 추가 할수 있다.
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
// AppModule에는 모든걸 import 한다.
// 식당 api, auth api.. 등 모든게 다 들어간다.

// 그러면 언제 app.moudle을 쓰고 Controller와 Provider를 만들면 될까?
