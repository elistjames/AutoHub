import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsLoadingPageComponent } from './parts-loading-page.component';

describe('PartsLoadingPageComponent', () => {
  let component: PartsLoadingPageComponent;
  let fixture: ComponentFixture<PartsLoadingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsLoadingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsLoadingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
