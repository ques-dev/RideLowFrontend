import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideReservedPopupComponent } from './ride-reserved-popup.component';

describe('RideReservedPopupComponent', () => {
  let component: RideReservedPopupComponent;
  let fixture: ComponentFixture<RideReservedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideReservedPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideReservedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
