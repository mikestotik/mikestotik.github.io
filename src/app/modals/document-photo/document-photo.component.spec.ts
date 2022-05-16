import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPhotoComponent } from './document-photo.component';

describe('DocumentPhotoComponent', () => {
  let component: DocumentPhotoComponent;
  let fixture: ComponentFixture<DocumentPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
