import { Gif, LIMIT, RATING } from '@angular-giphy/gifs/model';
import { Injectable } from '@angular/core';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { defer, map, Observable } from 'rxjs';

const API_KEY = 'TK772MSfA6ps3mAaqtVB81RU3da3LOiD';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  readonly gf!: GiphyFetch;

  constructor() {
    this.gf = new GiphyFetch(API_KEY);
  }

  getTrending(offset: number): Observable<Gif[]> {
    return defer(() =>
      this.gf.trending({ limit: LIMIT, rating: RATING, offset })
    ).pipe(map((res) => res.data));
  }
}
