import { GifsDataModule } from '@angular-giphy/gifs/data';
import { GifsUiModule } from '@angular-giphy/gifs/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { featureRoutes } from './lib.routes';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(featureRoutes),
    GifsUiModule,
    GifsDataModule,
  ],
  declarations: [
    HomeComponent,
    SearchComponent,
    UploadComponent,
    FavoritesComponent,
    DetailComponent,
  ],
})
export class GifsModule {}
