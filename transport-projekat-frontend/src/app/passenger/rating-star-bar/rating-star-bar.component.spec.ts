import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingStarBarComponent } from './rating-star-bar.component';

describe('RatingStarBarComponent', () => {
  let component: RatingStarBarComponent;
  let fixture: ComponentFixture<RatingStarBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingStarBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingStarBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
