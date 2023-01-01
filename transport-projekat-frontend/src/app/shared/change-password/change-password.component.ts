import { Component } from '@angular/core';
import {DriverService} from "../../driver/driver.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css', '../../app.component.css']
})
export class ChangePasswordComponent {
  constructor(private driverService : DriverService) { }
  closeDriverChangingPassword() : void {
    this.driverService.setChangingPassword(false);
  }
}
