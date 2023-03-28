import { ActivatedRoute } from '@angular/router';
import { GifsService } from '@angular-giphy/gifs/data';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailComponent } from './detail.component';
import { of } from 'rxjs';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  const serviceSpy = {
    getById: jest.fn(),
  };

  const activatedRouteSpy = {
    snapshot: { params: { id: 'H07HCwO2QrmWP8f0Ys' } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        { provide: GifsService, useValue: serviceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;

    serviceSpy.getById.mockReturnValue(of({}));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
