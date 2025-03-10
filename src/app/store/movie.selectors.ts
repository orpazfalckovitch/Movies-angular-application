import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectedMovieState = createFeatureSelector<AppState>('movie');

export const selectedFavoriteMovies = createSelector(
  selectedMovieState,
  (state: AppState) => state.favoriteMovies
);

// export const selectFavoriteMoviesCount = createSelector(
//   selectedFavoriteMovies,
//   (favoriteMovies) => favoriteMovies.length
// );
