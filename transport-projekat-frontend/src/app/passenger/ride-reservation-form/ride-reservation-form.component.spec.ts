import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideReservationFormComponent } from './ride-reservation-form.component';

describe('RideReservationFormComponent', () => {
  let component: RideReservationFormComponent;
  let fixture: ComponentFixture<RideReservationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideReservationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
