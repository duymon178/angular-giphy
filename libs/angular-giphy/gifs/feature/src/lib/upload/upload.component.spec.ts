import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  const sanitizerSpy = {
    sanitize: () => 'safeString',
    bypassSecurityTrustHtml: () => 'safeString',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadComponent],
      providers: [{ provide: DomSanitizer, useValue: sanitizerSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
