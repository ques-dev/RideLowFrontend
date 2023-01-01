import { Component } from '@angular/core';
import {DriverService} from "../../driver/driver.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../notification-service/notification.service";
import {ChangePassword} from "../model/ChangePassword";
import {UserService} from "../user.service";


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css', '../../app.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm : FormGroup = new FormGroup({
    oldPassword: new FormControl( '',{nonNullable:true, validators: [Validators.required]}),
    newPassword: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    repeatNewPassword: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
  });
  constructor(private driverService : DriverService,
              private notificationService : NotificationService,
              private userService : UserService) { }

  closeDriverChangingPassword() : void {
    this.driverService.setChangingPassword(false);
  }

  changePassword() : void {
    if (this.changePasswordForm.valid) {
      if (this.changePasswordForm.value.oldPassword === this.changePasswordForm.value.newPassword) {
        this.notificationService.createNotification("Nova lozinka mora biti različita od stare.", 3000);
        return;
      }
      if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.repeatNewPassword) {
        this.notificationService.createNotification("Nove lozinke se ne poklapaju.", 3000);
        return;
      }

      this.sendRequest();
    } else {
      this.notificationService.createNotification("Niste uneli sva polja.", 3000);
      return;
    }
  }

  sendRequest() : void {
    const request : ChangePassword = {
      old_password: this.changePasswordForm.value.oldPassword,
      new_password: this.changePasswordForm.value.newPassword
    }
    this.userService.changePassword(2, request).subscribe({
      next: () => {
        this.notificationService.createNotification('Uspešno ste promenili lozinku.', 5000);
        this.closeDriverChangingPassword();
      },
      error: (error) => {
        if (error.error.includes("matching")) {
          this.notificationService.createNotification('Stara lozinka nije tačna.', 5000);
        } else if (error.error.includes("valid")) {
          if (error.error.includes("old")) {
            this.notificationService.createNotification('Stara lozinka nije tačna.', 5000);
          } else {
            this.notificationService.createNotification('Nova lozinka nije dovoljno sigurna. ' +
              'Mora biti između 8 i 15 karaktera dužine, sa bar jednim velikim slovom i cifrom. ' +
              'Ne sme imati nevalidne znakove.', 5000);
          }
        } else {
          this.notificationService.createNotification('Neuspešna promena lozinke. Greške: ' + error.error, 5000);
        }
      }
    });
  }
}
