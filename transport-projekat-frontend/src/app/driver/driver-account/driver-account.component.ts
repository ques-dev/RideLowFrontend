import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../shared/notification-service/notification.service";
import {DriverService} from "../driver.service";

@Component({
  selector: 'app-driver-account',
  templateUrl: './driver-account.component.html',
  styleUrls: ['../../passenger/passenger-account/passenger-account.component.css', './driver-account.component.css', '../../app.component.css']
})
export class DriverAccountComponent implements OnInit {
  updateDriverForm : FormGroup = new FormGroup({
    name: new FormControl( '',{nonNullable:true, validators: [Validators.required]}),
    surname: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    telephoneNumber: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    address: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    password: new FormControl('placeholder_pass'),
  });

  updateMode  = false;
  updateButtonText = "Izmeni podatke"

  constructor(private driverService : DriverService,
              private notificationService : NotificationService) { }
  ngOnInit() {
    this.updateDriverForm.disable();
    this.showDriver();
  }

  showDriver() {
    this.driverService.getDriver()
      .subscribe(driver => {
        this.updateDriverForm.patchValue(
          {
            name : driver.name,
            surname: driver.surname,
            telephoneNumber: driver.telephoneNumber,
            address: driver.address,
            email: driver.email,
          }
        )});
  }

  toggleUpdateMode()
  {
    if(this.updateMode) {
      if(this.updateDriverForm.valid) {
        this.disableForm();
        this.showSuccessMessage()
      }
    }
    else this.enableForm();
  }

  enableForm() {
    this.updateButtonText = "Potvrdi izmene";
    this.updateMode = true;
    this.updateDriverForm.enable();
  }

  disableForm() {
    this.updateButtonText = "Izmeni podatke";
    this.updateMode = false;
    this.updateDriverForm.disable();
  }

  showSuccessMessage() {
    this.notificationService.createNotification("Izmene uspešno poslate administratoru na pregled i odobravanje.",5000);
  }
}
