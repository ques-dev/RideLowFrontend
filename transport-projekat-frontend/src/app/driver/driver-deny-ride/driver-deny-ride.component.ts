import { Component } from '@angular/core';
import {MapService} from "../../shared/map/map.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../shared/notification-service/notification.service";
import {DriverService} from "../driver.service";

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
              private notificationService : NotificationService,
              private driverService : DriverService) {}

  public back() : void {
    this.mapService.setRideDenied(false);
  }

  public confirm() : void {
    if (this.denyRideForm.valid) {
      this.driverService.denyRide(this.denyRideForm.value.reason).subscribe({
        next: (value) => {
          this.mapService.setRideDenied(false);
          this.mapService.setRideInProgress(false);
          this.mapService.setRideReceived(false);

          this.notificationService.createNotification("Uspešno ste odbili vožnju.", 3000);
        },
        error: (error) => {
          if (error.error.message.includes('reason')) {
            this.notificationService.createNotification("Morate uneti razlog odbijanja vožnje koji ima maksimalno 500 karaktera.", 5000);
          } else {
            this.notificationService.createNotification("Došlo je do greške prilikom odbijanja vožnje.", 5000);
            console.log("Error on ride deny: " + error.error.message)
          }
        }
      });
    }
  }
}
