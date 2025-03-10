import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  addFavoriteMovie,
  removeFavoriteMovie,
} from '../store/actions/actions';
import { IMovie } from '../model/movie.interface';
import { selectFavoriteMovies } from '../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  totalPages: number = 0;

  constructor(private http: HttpClient, private store: Store) {}

  getMoviesHeader() {
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzhkZmFhNjJhMTU1MmM2OWY5MGVkMWZjYjdiY2E3OSIsIm5iZiI6MTczNzI2OTU3Ny44NjQsInN1YiI6IjY3OGNhMTQ5NjhlMGQ4NzM2MzZkZjBkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AjmACrhlZmtlrWraxjiamm2QlxO3ngGSDaYsYkIaCrM',
    });
  }

  getMoviesByPage(page: number): Observable<any> {
    const headers = this.getMoviesHeader();
    const url =
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=' + page;
    return this.http.get(url, { headers }).pipe(
      map((res: any) => {
        if (res) {
          this.totalPages = res['total_pages'];
          if (res && res['results']) {
            return res['results'];
          }
        }
      })
    );
  }

  searchMovies(query: string): Observable<any> {
    const headers = this.getMoviesHeader();
    const url =
      'https://api.themoviedb.org/3/search/movie?language=en-US&query=' + query;
    return this.http.get(url, { headers }).pipe(
      map((res: any) => {
        if (res && res['results']) {
          return res['results'];
        }
      })
    );
  }

  addFavoriteMovie(movie: IMovie) {
    this.store.dispatch(addFavoriteMovie({ movie }));
  }

  removeMovie(movieId: string) {
    this.store.dispatch(removeFavoriteMovie({ movieId }));
  }

  getFavoriteMovies(): IMovie[] {
    let favoriteMovies: IMovie[] = [];
    this.store.select(selectFavoriteMovies).subscribe((res) => {
      if (res) {
        favoriteMovies = res;
      }
    });
    return favoriteMovies;
  }
}
