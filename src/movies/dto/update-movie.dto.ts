import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

// update는 일부만 할 수 있어야 하기 때문에 optional로 한다.
// export class UpdateMovieDto {
//   @IsString()
//   readonly title?: string;

//   @IsNumber()
//   readonly year?: number;

//   @IsString({ each: true })
//   readonly genres?: string[];
// }

// 💡 PartialType은 CreateMovieDto를 물려받는다. ( npm i @nestjs/mapped-types )
// 그리고 CreateMovieDto의 required를 optional로 바꿔준다.

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
