import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideNotReservedPopupComponent } from './ride-not-reserved-popup.component';

describe('RideNotReservedPopupComponent', () => {
  let component: RideNotReservedPopupComponent;
  let fixture: ComponentFixture<RideNotReservedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideNotReservedPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideNotReservedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
