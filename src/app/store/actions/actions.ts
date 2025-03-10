import { Action, createAction, props } from '@ngrx/store';
import { IMovie } from '../../model/movie.interface';

// export interface MoviesActions extends Action {
//   payload: any;
// }

// export const MoviesActionTypes = {
//   ADD_MOVIE: '[Movies] Add Movie',
//   REMOVE_MOVIE: '[Movies] Remove Movie',
//   ADD_FAVORITE_MOVIE: '[Movies] Add Favorite Movie',
//   REMOVE_FAVORITE_MOVIE: '[Movies] Remove Favorite Movie',
// };

// export class AddMovie implements Action {
//   readonly type = MoviesActionTypes.ADD_MOVIE;
//   constructor(public payload: IMovie) {}
// }

// export class RemoveMovie implements Action {
//   readonly type = MoviesActionTypes.REMOVE_MOVIE;
//   constructor(public payload: IMovie) {}
// }

// export class AddFavoriteMovie implements Action {
//   readonly type = MoviesActionTypes.ADD_FAVORITE_MOVIE;
//   constructor(public payload: IMovie) {}
// }

// export class RemoveFavoriteMovie implements Action {
//   readonly type = MoviesActionTypes.REMOVE_FAVORITE_MOVIE;
//   constructor(public payload: IMovie) {}
// }

// export const addFavoriteMovie = createAction(
//   '[Movies] Add Favorite Movie',
//   (favoriteMovie: IMovie) => ({ favoriteMovie })
// );

// export const removeFavoriteMovie = createAction(
//   '[Movies] Remove Favorite Movie',
//   (favoriteMovie: IMovie) => ({ favoriteMovie })
// );

export const addFavoriteMovie = createAction(
  '[Movie] Add Favorite',
  props<{ movie: IMovie }>()
);

export const removeFavoriteMovie = createAction(
  '[Movie] Remove Favorite',
  props<{ movieId: string }>()
);
