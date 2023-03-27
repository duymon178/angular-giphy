import { HomeComponent } from './home/home.component';
import { Route } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';

export const featureRoutes: Route[] = [
  {
    path: 'gifs',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'upload',
        component: UploadComponent,
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
      },
    ],
  },
];
