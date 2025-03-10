import { Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';

export const routes: Routes = [
  {
    path: 'movie-view',
    loadComponent: () =>
      import('../app/components/movie-view/movie-view.component').then(
        (m) => m.MovieViewComponent
      ),
  },
  {
    path: 'movies',
    component: MoviesComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full',
  },
];
