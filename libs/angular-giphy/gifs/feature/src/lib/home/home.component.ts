import { GifsService } from '@angular-giphy/gifs/data';
import { Gif, LIMIT } from '@angular-giphy/gifs/model';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  ReplaySubject,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';

@Component({
  selector: 'pi-exchange-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit {
  offset = -LIMIT;

  // Stream of trending gifs.
  trending$!: Observable<Gif[]>;
  trendingClone$ = new BehaviorSubject<Gif[]>([]);

  loading$ = new BehaviorSubject<boolean>(true);

  /*
   * Stream of intersection events.
   * Emits current offset in order to load new gifs.
   */
  intersection$ = new ReplaySubject<number>(1);
  observer!: IntersectionObserver;

  @ViewChild('intersectEl', { static: true }) intersectEl!: ElementRef;

  constructor(private router: Router, private service: GifsService) {}

  ngOnInit(): void {
    this.declareTrendingStream();

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this), // Pass the reference to this object
      {
        rootMargin: '100px',
        threshold: 1,
      }
    );
  }

  declareTrendingStream() {
    this.trending$ = this.intersection$.pipe(
      switchMap((offset: number) =>
        this.service.getTrending(offset).pipe(
          catchError((err) => {
            // Handle API error here.
            console.log(err);
            return EMPTY;
          }),
          withLatestFrom(this.trendingClone$.pipe(take(1))),
          map(([newGifs, currentGifs]) => {
            return [...currentGifs, ...newGifs];
          })
        )
      ),
      tap((gifs) => {
        this.loading$.next(false);
        this.trendingClone$.next(gifs);
      })
    );
  }

  ngAfterViewInit(): void {
    this.observer.observe(this.intersectEl.nativeElement);
  }

  handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.loading$.next(true);
        this.offset = this.offset + LIMIT;
        this.intersection$.next(this.offset);
      }
    });
  }

  handleSearch(term: string): void {
    this.router.navigateByUrl(`search?q=${term}`);
  }
}
