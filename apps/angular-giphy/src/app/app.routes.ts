import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((mod) => mod.HomeComponent),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./search/search.component').then((mod) => mod.SearchComponent),
  },
  {
    path: 'gifs/:id',
    loadComponent: () =>
      import('./gif/gif.component').then((mod) => mod.GifComponent),
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./upload/upload.component').then((mod) => mod.UploadComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.component').then(
        (mod) => mod.FavoritesComponent
      ),
  },
];
