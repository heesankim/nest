import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entitiy';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// 서비스는 비즈니스 로직을 관리하는 곳
@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  /**
   * 모든 영화 목록을 반환합니다.
   * @returns {Movie[]} 모든 영화 목록
   */
  getAll(): Movie[] {
    const movies = this.movies;
    // if (movies.length === 0) {
    //   throw new NotFoundException('모든 예매 표가 소진되었습니다.');
    // }
    return movies;
  }

  // DB 조회 시 async await 사용 (비동기 처리 )
  // try-catch 문 무지성으로 사용 x -> 적절하게 사용해서 에러를 던져야 한다.
  /**
   * 주어진 ID에 해당하는 영화를 조회합니다.
   * @param {number} id 조회할 영화의 ID
   * @returns {Promise<Movie>} 조회된 영화
   * @throws {NotFoundException} ID에 해당하는 영화가 없을 경우 예외 발생
   */
  async getOne(id: number): Promise<Movie> {
    const movie = await this.movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${id} not found. `);
    }

    return movie;
  }

  /**
   * 주어진 ID에 해당하는 영화를 삭제합니다.
   * @param {number} id 삭제할 영화의 ID
   * @returns {Promise<boolean>} 삭제 성공 여부
   * @throws {NotFoundException} ID에 해당하는 영화가 없을 경우 예외 발생
   */
  async deleteOne(id: number): Promise<boolean> {
    const movieToDelete = await this.getOne(id);
    if (!movieToDelete) {
      return false;
    }

    this.movies = this.movies.filter((movie) => movie.id !== id);

    return true;
  }

  /**
   * 새로운 영화를 생성합니다.
   * @param {CreateMovieDto} movieData 생성할 영화의 데이터
   * @returns {Movie} 생성된 영화
   */
  create(movieData: CreateMovieDto): Movie {
    const newMovie: Movie = {
      id: this.movies.length + 1,
      ...movieData,
    };

    this.movies.push(newMovie);
    return newMovie;
  }

  /**
   * 주어진 ID에 해당하는 영화를 업데이트합니다.
   * @param {number} id 업데이트할 영화의 ID
   * @param {UpdateMovieDto} updateData 업데이트할 데이터
   * @returns {Promise<Movie | null>} 업데이트된 영화
   */
  async update(id: number, updateData: UpdateMovieDto) {
    const movie = await this.getOne(id);

    if (!movie) {
      return null;
    }

    this.deleteOne(id);

    const updatedMovie = { ...movie, ...updateData };
    this.movies.push(updatedMovie);

    return updatedMovie;
  }
  /**
   * 주어진 제목으로 영화를 검색합니다.
   * @param {string} title 검색할 영화의 제목
   * @returns {Promise<Movie>} 검색된 영화
   * @throws {NotFoundException} 제목에 해당하는 영화가 없을 경우 예외 발생
   */
  async search(title: string): Promise<Movie> {
    const movie = await this.movies.find((movie) => movie.title === title);

    if (!movie) {
      throw new NotFoundException(`Movie with title: ${title} not found. `);
    }

    return movie;
  }
}
