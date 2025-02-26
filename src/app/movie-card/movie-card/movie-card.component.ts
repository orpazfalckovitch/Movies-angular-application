import { Component, Input, OnInit } from '@angular/core';
import { MonthYearPipe } from '../../pipes/month-year.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  imports: [MonthYearPipe, CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  @Input() movie: any;
  isSolid = false;

  constructor() {}

  ngOnInit() {}

  toggleStar() {
    this.isSolid = !this.isSolid;
  }
}
