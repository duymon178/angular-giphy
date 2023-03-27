import { GifsModule } from '@angular-giphy/gifs/feature';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: '/gifs',
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    GifsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
