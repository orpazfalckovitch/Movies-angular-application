import { Component, OnInit, ViewChild } from '@angular/core';
import { IMovie } from '../../model/movie.interface';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../movie-card/movie-card/movie-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  imports: [
    CommonModule,
    MovieCardComponent,
    MatPaginatorModule,
    HighlightDirective,
  ],
})
export class MoviesComponent implements OnInit {
  movies: IMovie[] = [];
  totalPages: number = 0;
  pageSize = 20;
  currentPage: number = 0;

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
}
