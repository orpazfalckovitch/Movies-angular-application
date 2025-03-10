import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from './movies.service';
import { initialState } from '../store/app.state';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IMovie } from '../model/movie.interface';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService, provideMockStore({ initialState })],
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a total page', () => {
    const totalPages = service.totalPages;
    expect(totalPages).toEqual(0);
  });

  it('should return movies for page 1', () => {
    const mockResponse = {
      total_pages: 10,
      results: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
      ],
    };

    service.getMoviesByPage(1).subscribe((res: any) => {
      expect(res).toEqual(mockResponse.results);
      expect(service.totalPages).toEqual(mockResponse.total_pages);
    });
    const req = httpMock.expectOne(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return search results', () => {
    const mockResponse = {
      results: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
      ],
    };

    service.searchMovies('Movie').subscribe((res: any) => {
      expect(res).toEqual(mockResponse.results);
    });
    const req = httpMock.expectOne(
      'https://api.themoviedb.org/3/search/movie?language=en-US&query=Movie'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should add a movie to favorites', () => {
    const movie: IMovie = {
      id: 1,
      title: 'Movie 1',
      overview: 'Overview',
      poster_path: 'path',
      release_date: '2021-01-01',
      vote_average: 5,
      vote_count: 100,
      popularity: 100,
      original_language: 'en',
    };
    const spy = spyOn(store, 'dispatch');
    service.addFavoriteMovie(movie);
    expect(spy).toHaveBeenCalled();
  });
});
