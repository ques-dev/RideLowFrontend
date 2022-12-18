import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerSideNavigationComponent } from './passenger-side-navigation.component';

describe('SideNavigationComponent', () => {
  let component: PassengerSideNavigationComponent;
  let fixture: ComponentFixture<PassengerSideNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerSideNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


