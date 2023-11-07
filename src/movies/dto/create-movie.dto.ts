import { IsString, IsNumber, IsOptional } from 'class-validator';

// DTO단계에서 input 유효성 검사가 가능해졌다.
export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
