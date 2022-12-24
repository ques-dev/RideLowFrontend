import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDenyRideComponent } from './driver-deny-ride.component';

describe('DriverDenyRideComponent', () => {
  let component: DriverDenyRideComponent;
  let fixture: ComponentFixture<DriverDenyRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverDenyRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverDenyRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
