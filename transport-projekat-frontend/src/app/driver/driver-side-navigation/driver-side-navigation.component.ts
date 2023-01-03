import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MapService} from "../../shared/map/map.service";
import {DriverService} from "../driver.service";
import {NotificationService} from "../../shared/notification-service/notification.service";

@Component({
  selector: 'app-driver-side-navigation',
  templateUrl: './driver-side-navigation.component.html',
  styleUrls: ['../../passenger/passenger-side-navigation/passenger-side-navigation.component.css', './driver-side-navigation.component.css', '../../app.component.css']
})
export class DriverSideNavigationComponent {
  constructor(private router : Router,
              private mapService : MapService,
              public driverService : DriverService,
              private notificationService : NotificationService) { }

  logout() {
    this.mapService.setRideDenied(false);
    this.mapService.setRideInProgress(false);
    if (this.driverService.shiftId != -1) {
      this.driverService.endShift().subscribe({
        next: (value) => {
          this.driverService.shiftId = -1;
        },
        error: (error) => {
          console.log("Error on shift end: " + error.error)
        }
      });
    }
    this.router.navigate(['entrance']);
  }

  changeState() : void {
    if (this.driverService.shiftId == -1) {
      this.driverService.startShift().subscribe({
        next: (value) => {
          this.driverService.shiftId = value.id;
        },
        error: (error) => {
          if (!error.error.includes("ongoing")) {
            if (error.error.includes("limit")) {
              this.notificationService.createNotification("Već ste radili 8 sati danas, pa ne možete pokrenuti novu smenu.", 7500);
              this.driverService.cantStartShift = true;
            } else {
              console.log("Error on shift start: " + error.error)
            }
          }
        },
      });
    } else {
      this.driverService.endShift().subscribe({
        next: (value) => {
          this.driverService.shiftId = -1;
        },
        error: (error) => {
          console.log("Error on shift end: " + error.error)
        }
      });
    }
  }
}
