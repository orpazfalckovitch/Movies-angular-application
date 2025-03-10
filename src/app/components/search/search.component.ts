import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  DoCheck,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  searchText: string = '';
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 1000;
  @Output() searchResults: EventEmitter<any> = new EventEmitter<any>();

  constructor(private moviesService: MoviesService) {}

  searchChange(): void {
    this.searchSubject.next(this.searchText);
  }

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue);
      });
  }

  // search() {
  //   console.log('searching...');
  //   this.searchSubject.next(this.searchText);
  // }

  performSearch(searchValue: string) {
    if (searchValue === '') {
      this.searchResults.emit([]);
    } else {
      this.moviesService.searchMovies(searchValue).subscribe((res: any) => {
        this.searchResults.emit(res);
      });
    }
  }
}
