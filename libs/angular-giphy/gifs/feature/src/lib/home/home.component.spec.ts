import { GifsService } from '@angular-giphy/gifs/data';
import { Gif } from '@angular-giphy/gifs/model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TestScheduler } from 'rxjs/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const routerSpy = {
    navigateByUrl: jest.fn(),
  };

  const serviceSpy = {
    getTrending: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: GifsService, useValue: serviceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  describe('Actions', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('#handleSearch should call router navigate to navigate to search route with param', () => {
      fixture.detectChanges();
      const term = 'term';
      component.handleSearch(term);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(
        `/gifs/search?q=${term}`
      );
    });

    it(`#handleIntersection should trigger loading, and trigger intersection event
      when intersecting happens`, () => {
      jest.spyOn(component.loading$, 'next').mockReturnValue();
      jest.spyOn(component.intersection$, 'next').mockReturnValue();
      const entries: IntersectionObserverEntry[] = [
        {
          isIntersecting: true,
        } as IntersectionObserverEntry,
      ];

      component.handleIntersection(entries);
      expect(component.loading$.next).toHaveBeenCalled();
      expect(component.intersection$.next).toHaveBeenCalled();
    });
  });

  describe('Streams', () => {
    let scheduler: TestScheduler;

    beforeEach(() => {
      scheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
    });

    it(`#trending$ should emit list of gifs by calling trending api
      after being triggered by intersection$ and the result should 
      include previous and incoming data`, () => {
      scheduler.run(({ cold, hot, expectObservable }) => {
        const apiRes: Gif[] = [
          {
            title: 'new gif 1',
          } as Gif,
          {
            title: 'new gif 2',
          } as Gif,
        ];
        serviceSpy.getTrending.mockReturnValue(cold('--d', { d: apiRes }));

        const prevData = {
          p: [],
          d: [
            {
              title: 'prev gif 1',
            },
          ],
        };

        const intersection$ = hot('a----b', { a: 0 });
        const previousData$ = hot('-p---d', prevData);
        const expectedMarble = '   --a----b';

        const expectedValues = {
          a: [
            {
              title: 'new gif 1',
            },
            {
              title: 'new gif 2',
            },
          ],
          b: [
            {
              title: 'prev gif 1',
            },
            {
              title: 'new gif 1',
            },
            {
              title: 'new gif 2',
            },
          ],
        };

        component.trendingClone$ = previousData$ as any;
        component.intersection$ = intersection$ as any;
        component.declareTrendingStream();

        expectObservable(component.trending$).toBe(
          expectedMarble,
          expectedValues
        );
      });
    });
  });
});
