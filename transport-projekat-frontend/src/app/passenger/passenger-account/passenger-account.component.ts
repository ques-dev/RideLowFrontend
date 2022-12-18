import {Component, OnInit} from '@angular/core';
import {PassengerService} from "../passenger.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/model/User";
import {NotificationService} from "../../shared/notification-service/notification.service";

@Component({
  selector: 'app-passenger-account',
  templateUrl: './passenger-account.component.html',
  styleUrls: ['./passenger-account.component.css','../../app.component.css']
})
export class PassengerAccountComponent implements OnInit {

  updatePassengerForm : FormGroup = new FormGroup({
    name: new FormControl( '',{nonNullable:true, validators: [Validators.required]}),
    surname: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    telephoneNumber: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    address: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    password: new FormControl('placeholder_pass'),
  });

  updateMode  = false;
  updateButtonText = "Izmeni podatke"

  constructor(private passengerService : PassengerService,
              private notificationService : NotificationService) { }
  ngOnInit() {
    this.updatePassengerForm.disable();
    this.showPassenger();
  }

  updatePassenger(){
    const passenger : User = {
      name : this.updatePassengerForm.value.name,
      surname : this.updatePassengerForm.value.surname,
      telephoneNumber : this.updatePassengerForm.value.telephoneNumber,
      profilePicture : '',
      address : this.updatePassengerForm.value.address,
      email : this.updatePassengerForm.value.email,
      password : this.updatePassengerForm.value.password
    }
    this.passengerService.updatePassenger(passenger).subscribe();
    this.disableForm();
  }

  showPassenger() {
    this.passengerService.getPassenger()
      .subscribe(passenger => {
      this.updatePassengerForm.patchValue(
        {
          name : passenger.name,
          surname: passenger.surname,
          telephoneNumber: passenger.telephoneNumber,
          address: passenger.address,
          email: passenger.email,
        }
      )});
  }

  toggleUpdateMode()
  {
    if(this.updateMode) {
      if(this.updatePassengerForm.valid) {
        this.updatePassenger();
        this.disableForm();
        this.showSuccessMessage()
      }
    }
    else this.enableForm();
  }
  enableForm() {
    this.updateButtonText = "Potvrdi izmene";
    this.updateMode = true;
    this.updatePassengerForm.enable();
  }

  disableForm() {
    this.updateButtonText = "Izmeni podatke";
    this.updateMode = false;
    this.updatePassengerForm.disable();
  }

  showSuccessMessage() {
      this.notificationService.createNotification("Podaci uspešno izmenjeni!",2000);
  }
}
