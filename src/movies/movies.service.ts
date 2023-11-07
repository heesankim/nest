import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entitiy';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// 서비스는 비즈니스 로직을 관리하는 곳
@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    const movies = this.movies;
    // if (movies.length === 0) {
    //   throw new NotFoundException('모든 예매 표가 소진되었습니다.');
    // }
    return movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${id} not found. `);
    }

    return movie;
  }

  deleteOne(id: number): boolean {
    const movieToDelete = this.getOne(id);
    if (!movieToDelete) {
      return false;
    }

    this.movies = this.movies.filter((movie) => movie.id !== id);

    return true;
  }

  create(movieData: CreateMovieDto): Movie {
    const newMovie: Movie = {
      id: this.movies.length + 1,
      ...movieData,
    };

    this.movies.push(newMovie);
    return newMovie;
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);

    if (!movie) {
      return null;
    }

    this.deleteOne(id);

    const updatedMovie = { ...movie, ...updateData };
    this.movies.push(updatedMovie);

    return updatedMovie;
  }
}
