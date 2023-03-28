import { ActivatedRoute } from '@angular/router';
import { GifsService } from '@angular-giphy/gifs/data';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { Gif, LIMIT } from '@angular-giphy/gifs/model';

@Component({
  selector: 'pi-exchange-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, AfterViewInit {
  term = '';
  offset = -LIMIT;

  // Stream of trending gifs.
  search$!: Observable<Gif[]>;
  trendingClone$ = new BehaviorSubject<Gif[]>([]);

  loading$ = new BehaviorSubject<boolean>(true);

  /*
   * Stream of intersection events.
   * Emits current offset in order to load new gifs.
   */
  intersection$ = new ReplaySubject<number>(1);
  observer!: IntersectionObserver;

  @ViewChild('intersectEl', { static: true }) intersectEl!: ElementRef;

  constructor(private service: GifsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.term = this.route.snapshot.queryParams['q'];

    this.declareSearchStream();

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this), // Pass the reference to this object
      {
        rootMargin: '100px',
        threshold: 1,
      }
    );
  }

  declareSearchStream() {
    this.search$ = this.intersection$.pipe(
      switchMap((offset: number) =>
        this.service.search(this.term, offset).pipe(
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
}
