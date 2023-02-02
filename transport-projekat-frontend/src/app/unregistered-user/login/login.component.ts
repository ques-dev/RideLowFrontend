import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DriverService} from "../../driver/driver.service";
import {NotificationService} from "../../shared/notification-service/notification.service";
import {MapService} from "../../shared/map/map.service";
import {UserService} from "../../shared/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../app.component.css']
})
export class LoginComponent {

  constructor(private router:Router,
              private driverService : DriverService,
              private userService : UserService,
              private notificationService : NotificationService,
              private mapService : MapService) { }

  loginForm = new FormGroup({
    email: new FormControl( '',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  login(): void {
    const loginVal = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    if (this.loginForm.valid) {
      this.userService.login(loginVal).subscribe({
        next: (result) => {
          console.log(result)
          sessionStorage.setItem('user_email',<string>this.loginForm.value.email);
          sessionStorage.setItem('user', JSON.stringify(result));
          this.userService.setUser();
          this.router.navigate(['login']);
        },
        error: (error) => {
         {
            console.log(error);
          }
        },
      });
    }
  }

}
