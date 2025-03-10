import { state } from '@angular/animations';
import { IMovie } from '../../model/movie.interface';
import { addFavoriteMovie, removeFavoriteMovie } from '../actions/actions';
import { AppState, initialState } from '../app.state';
import { createReducer, on } from '@ngrx/store';

// export const MoviesReducer = (
//   state = initialState,
//   action: MoviesActions
// ): AppState => {
//   switch (action.type) {
//     case MoviesActionTypes.ADD_MOVIE:
//       return {
//         ...state,
//         favoritesMovies: [...state.favoritesMovies, action.payload],
//       };
//     case MoviesActionTypes.REMOVE_MOVIE:
//       return {
//         ...state,
//         favoritesMovies: state.favoritesMovies.filter(
//           (movie: IMovie) => movie.id !== action.payload.id
//         ),
//       };
//     case MoviesActionTypes.ADD_FAVORITE_MOVIE:
//       return {
//         ...state,
//         favoritesMovies: [...state.favoritesMovies, action.payload],
//       };
//     case MoviesActionTypes.REMOVE_FAVORITE_MOVIE:
//       return {
//         ...state,
//         favoritesMovies: state.favoritesMovies.filter(
//           (movie: IMovie) => movie.id !== action.payload.id
//         ),
//       };
//     default:
//       return state;
//   }
// };

export const movieReducer = createReducer(
  initialState,
  on(addFavoriteMovie, (state, { movie }) => ({
    ...state,
    favoriteMovies: [...state.favoriteMovies, movie],
  })),
  on(removeFavoriteMovie, (state, { movieId }) => ({
    ...state,
    favoriteMovies: state.favoriteMovies.filter(
      (movie) => movie.id !== Number(movieId)
    ),
  }))
);
