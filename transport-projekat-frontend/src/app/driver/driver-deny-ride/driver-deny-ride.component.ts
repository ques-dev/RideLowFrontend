import { Component } from '@angular/core';
import {MapService} from "../../shared/map/map.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../shared/notification-service/notification.service";

@Component({
  selector: 'app-driver-deny-ride',
  templateUrl: './driver-deny-ride.component.html',
  styleUrls: ['./driver-deny-ride.component.css', '../../app.component.css']
})
export class DriverDenyRideComponent {
  denyRideForm : FormGroup = new FormGroup({
    reason: new FormControl( '',{nonNullable:true, validators: [Validators.required]}),
  });

  constructor(private mapService : MapService,
              private notificationService : NotificationService) {}
  public back() : void {
    this.mapService.setRideDenied(false);
  }

  public confirm() : void {
    if (this.denyRideForm.valid) {
      this.mapService.setRideDenied(false);
      this.mapService.setRideInProgress(false);
      this.notificationService.createNotification("Uspešno ste odbili vožnju.", 500);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }
}
