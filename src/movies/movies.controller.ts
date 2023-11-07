import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entitiy';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// 엔트리 포인트(라우터)
// badRequest에 대한 응답, statusCode, sentDataType..(auto json Type).. 편하다 편해...
@Controller('api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // @Get('search')
  // search(@Query('year') searchingYear: string): string {
  //   return `we are searching for a movie after year ${searchingYear}`;
  // }

  @Get(':id')
  // url로 보낸 값은 전부 string이다.
  // 그래서 서비스 단계에서 id를 number로 변환해줘야 한다.
  // 하지만 validation pipe에 transform속성을 true로  설정하면 자동으로 엔티티에 맞게 변환해준다.
  getOne(@Param('id') movieId: number): Promise<Movie> {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number): Promise<boolean> {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.update(movieId, updateData);
  }

  @Get('search')
  search(@Query('title') movieTitle: string): Promise<Movie> {
    return this.moviesService.search(movieTitle);
  }
}
