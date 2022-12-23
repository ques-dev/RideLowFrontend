import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideReceivedComponent } from './ride-received.component';

describe('RideReceivedComponent', () => {
  let component: RideReceivedComponent;
  let fixture: ComponentFixture<RideReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideReceivedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
