import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DriverService} from "../../driver/driver.service";
import {NotificationService} from "../../shared/notification-service/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../app.component.css']
})
export class LoginComponent {

  constructor(private router:Router,
              private driverService : DriverService,
              private notificationService : NotificationService) { }

  loginForm = new FormGroup({
    email: new FormControl( '',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  routeToHome() {
    if (this.loginForm.controls.email.value == "driver") {
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
      this.router.navigate(['driver-home']).then();
    } else {
      this.router.navigate(['passenger-home']).then();
    }
  }
}
