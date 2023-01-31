import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {catchError, Observable, of} from "rxjs";
import {UserService} from "../user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserIdEmail} from "../model/UserIdEmail";
import {UserRetrieved} from "../model/UserRetrieved";
import {DriverService} from "../../driver/driver.service";
import {NotificationService} from "../notification-service/notification.service";
import {MapService} from "../map/map.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {

  constructor(private router: Router,
              private driverService : DriverService,
              private userService : UserService,
              private notificationService : NotificationService,
              private mapService : MapService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userService.isLoggedIn()) {
      const role  = this.userService.getRole();
      const userEmail = localStorage.getItem('user_email')
      if(userEmail == null) return false;
      this.userService.getUserIdByMail(userEmail).pipe(
        catchError(error => {
          if(error.status == 0) {
            console.error("Server communication failed");
          }
          else {
            console.error("Email does not exist!")
          }
          const obj : UserRetrieved = {
            id: -1,
            name: '',
            surname: '',
            profilePicture: '',
            telephoneNumber: '',
            email: '',
            address:''
          }
          return of(obj);
        })
      ).subscribe(value => {
        if(value.id != -1) {
          localStorage.setItem('user_id',String(value.id));
          localStorage.setItem('user_full_name',value.name + " " + value.surname)
          localStorage.setItem('user_picture',value.profilePicture)
          if(role == 'ROLE_PASSENGER') this.router.navigate(['passenger-home']);
          else if(role == 'ROLE_DRIVER') {
            this.mapService.userIsDriver = true;
            this.driverService.startShift().subscribe({
              next: (value) => {
                this.driverService.shiftId = value.id;
              },
              error: (error) => {
                if (!error.error.message.includes("ongoing")) {
                  if (error.error.message.includes("limit")) {
                    this.notificationService.createNotification("Već ste radili 8 sati danas, pa ne možete pokrenuti novu smenu.", 7500);
                    this.driverService.cantStartShift = true;
                  } else {
                    console.log("Error on shift start: " + error.error.message)
                  }
                }
              },
            });
            this.router.navigate(['driver-home']);
          }
          else this.router.navigate(['admin-home']);
          return false;
        }
        return false;
      });
    }
    return true;
  }
}
