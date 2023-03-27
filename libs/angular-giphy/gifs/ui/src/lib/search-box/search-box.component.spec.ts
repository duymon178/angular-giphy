import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onSubmit should call search.emit to emit out current form value', () => {
    const term = 'search text';
    component.form.controls['term'].setValue(term);
    jest.spyOn(component.search, 'emit').mockReturnValue();

    component.onSubmit();
    expect(component.search.emit).toHaveBeenCalledWith(term);
  });

  it('#onSubmit should not call search.emit if current form value is an empty string', () => {
    component.form.controls['term'].setValue('');
    jest.spyOn(component.search, 'emit').mockReturnValue();

    component.onSubmit();
    expect(component.search.emit).not.toHaveBeenCalled();
  });
});
