import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideInconsistencyComponent } from './ride-inconsistency.component';

describe('RideInconsistencyComponent', () => {
  let component: RideInconsistencyComponent;
  let fixture: ComponentFixture<RideInconsistencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideInconsistencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideInconsistencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
