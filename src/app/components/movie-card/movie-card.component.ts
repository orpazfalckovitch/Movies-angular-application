import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonthYearPipe } from '../../pipes/month-year.pipe';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-card',
  imports: [MonthYearPipe, CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  @Input() movie: any;
  isSolid = false;

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit() {}

  toggleStar() {
    this.isSolid = !this.isSolid;
    this.moviesService.addFavoriteMovie(this.movie);
  }

  navigateToDetails() {
    // this.router.navigate(['/movie-view'], { state: { movie: this.movie } });
  }
}
