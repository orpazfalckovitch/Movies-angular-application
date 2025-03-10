import { IMovie } from '../model/movie.interface';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface AppState {
  favoriteMovies: IMovie[];
}

export const initialState: AppState = {
  favoriteMovies: [],
};

export const selectMovieState = createFeatureSelector<AppState>('movies');

export const selectFavoriteMovies = createSelector(
  selectMovieState,
  (state: AppState) => state.favoriteMovies
);
