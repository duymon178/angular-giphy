import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SearchBoxComponent } from './search-box/search-box.component';
import { HeadingComponent } from './heading/heading.component';
import { GifItemComponent } from './gif-item/gif-item.component';
import { GifGridComponent } from './gif-grid/gif-grid.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatIconModule, ReactiveFormsModule],
  declarations: [
    SearchBoxComponent,
    HeadingComponent,
    GifItemComponent,
    GifGridComponent,
    LoadingComponent,
    UserInfoComponent,
  ],
  exports: [
    SearchBoxComponent,
    HeadingComponent,
    GifGridComponent,
    LoadingComponent,
    GifItemComponent,
    UserInfoComponent,
  ],
})
export class GifsUiModule {}
