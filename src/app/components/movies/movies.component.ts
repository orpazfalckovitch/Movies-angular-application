import { Component, OnInit, ViewChild } from '@angular/core';
import { IMovie } from '../../model/movie.interface';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HighlightDirective } from '../../directives/highlight.directive';
import { SearchComponent } from '../search/search.component';
import { Type } from '../../model/movies.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  imports: [
    CommonModule,
    MovieCardComponent,
    MatPaginatorModule,
    HighlightDirective,
    SearchComponent,
  ],
})
export class MoviesComponent implements OnInit {
  movies: IMovie[] = [];
  totalPages: number = 0;
  pageSize = 20;
  currentPage: number = 0;
  type: Type = Type.Popular;
  Type = Type;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getMoviesByPage(1).subscribe((res: any) => {
      this.movies = res;
      this.totalPages = this.moviesService.totalPages;
    });
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.moviesService
      .getMoviesByPage(this.currentPage)
      .subscribe((res: any) => {
        this.movies = res;
      });
  }

  updateMovies(movies: IMovie[]) {
    if (movies.length) {
      this.movies = movies;
    } else {
      this.moviesService.getMoviesByPage(1).subscribe((res: any) => {
        this.movies = res;
        this.totalPages = this.moviesService.totalPages;
      });
    }
  }

  getMoviesList(type: Type) {
    this.type = type;
    this.totalPages = 0;
    if (type === Type.Favorites) {
      this.movies = this.moviesService.getFavoriteMovies();
      if (this.movies.length) {
        this.totalPages = this.movies.length / this.pageSize;
        this.currentPage = 1;
      }

      return;
    }
    if (type === Type.Popular) {
      this.moviesService.getMoviesByPage(1).subscribe((res: any) => {
        this.movies = res;
        this.totalPages = this.moviesService.totalPages;
      });
      return;
    }
  }
}
