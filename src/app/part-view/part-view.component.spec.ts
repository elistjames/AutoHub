import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartViewComponent } from './part-view.component';

describe('PartViewComponent', () => {
  let component: PartViewComponent;
  let fixture: ComponentFixture<PartViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
