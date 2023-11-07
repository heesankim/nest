import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

// update는 일부만 할 수 있어야 하기 때문에 optional로 한다.
// export class UpdateMovieDto {
//   @IsString()
//   readonly title?: string;

//   @IsNumber()
//   readonly year?: number;

//   @IsString({ each: true })
//   readonly genres?: string[];
// }

// mapped-types 패키지를 사용해서 코드를 줄일 수 있다
//💡PartialType은 CreateMovieDto를 물려받음 ( npm i @nestjs/mapped-types )
//💡PartialType은 부모 DTO의 모든 속성들을 물려받지만 전부 Optional로 바꿔준다.
// 그리고 CreateMovieDto의 required를 optional로 바꿔준다.
// 그래서 UpdateMovieDto에서는 required를 사용하지 않아도 된다.
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

// #readonly 속성은 인스턴스가 생성될 때 값을 할당할 수 있지만, 이후에는 값을 바꿀 수 없다.
