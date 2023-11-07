import { IsString, IsNumber, IsOptional } from 'class-validator';

// class-validator를 사용하면, DTO단계에서 input 유효성 검사가 가능해진다.
//💡 decorator는 항상 class 위에 있어야 한다.
export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
