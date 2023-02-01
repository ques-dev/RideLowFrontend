import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RideHistoryDialogComponent} from "./ride-history-dialog.component";

describe('RideHistoryDialogComponent', () => {
  let component: RideHistoryDialogComponent;
  let fixture: ComponentFixture<RideHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideHistoryDialogComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RideHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
