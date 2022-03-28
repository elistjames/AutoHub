import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPartComponent } from './post-part.component';

describe('PostPartComponent', () => {
  let component: PostPartComponent;
  let fixture: ComponentFixture<PostPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
