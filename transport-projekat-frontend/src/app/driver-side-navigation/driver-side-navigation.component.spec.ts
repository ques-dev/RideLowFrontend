import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSideNavigationComponent } from './driver-side-navigation.component';

describe('DriverSideNavigationComponent', () => {
  let component: DriverSideNavigationComponent;
  let fixture: ComponentFixture<DriverSideNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverSideNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
