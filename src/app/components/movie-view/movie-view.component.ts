import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MonthYearPipe } from '../../pipes/month-year.pipe';
import { IMovie } from '../../model/movie.interface';

@Component({
  selector: 'app-movie-view',
  imports: [CommonModule, MonthYearPipe],
  templateUrl: './movie-view.component.html',
  styleUrl: './movie-view.component.scss',
})
export class MovieViewComponent implements OnInit {
  movie: IMovie | undefined;
  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.lastSuccessfulNavigation;
    this.movie = navigation?.extras?.state?.['movie'];
  }
}
