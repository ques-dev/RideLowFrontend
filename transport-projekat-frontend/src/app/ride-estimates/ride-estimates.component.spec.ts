import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideEstimatesComponent } from './ride-estimates.component';

describe('RideEstimatesComponent', () => {
  let component: RideEstimatesComponent;
  let fixture: ComponentFixture<RideEstimatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideEstimatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideEstimatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
