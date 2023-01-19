import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";

@Component({
  selector: 'app-ride-reservation-form',
  templateUrl: './ride-reservation-form.component.html',
  styleUrls: ['./ride-reservation-form.component.css','../../app.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    }]
})
export class RideReservationFormComponent {
  fieldsRequiredErrorText = 'Unesite obavezna polja!';
  emailFormatErrorText = "Email loše formatiran!";
  passengersEmails: string[] = [];
  isReservation = false;
  rideBasicInfoForm : FormGroup = new FormGroup({
    vehicleType: new FormControl( '',{nonNullable:true, validators: [Validators.required]}),
    petTransport: new FormControl(false,{nonNullable:true, validators: [Validators.required]}),
    babyTransport: new FormControl(false,{nonNullable:true, validators: [Validators.required]}),
    scheduleTime: new FormControl(null),
  });

  passengersEmailsForm : FormGroup = new FormGroup({
    email : new FormControl('',{nonNullable:false, validators : [Validators.email]}),
  });

  timepickerTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#303841',
      buttonColor: '#fff',

    },
    dial: {
      dialBackgroundColor: '#00ADB5',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#00ADB5',
      clockFaceTimeInactiveColor: '#fff'
    }
  };
  totalPrice = 0.00;
  pricePerPerson = this.totalPrice / this.passengersEmails.length;
  @Input() orderOpened = false;
  @Output() orderClosed = new EventEmitter<boolean>();
  openSuccessPopup = false;
  openFailPopup = false;
  public close() {
    this.orderClosed.emit(true);
    //this.openSuccessPopup = true;
    this.openFailPopup = true;
  }

  public removePassenger(email : string) {
    const index = this.passengersEmails.indexOf(email);
    if (index >= 0) {
      this.passengersEmails.splice(index, 1);
    }
  }
  addPassenger(): void {
    const email = this.passengersEmailsForm.controls["email"].value;
    this.passengersEmails.push(email);
  }

  reserve() {
    this.close();
  }

  closePopup(){
   //this.openSuccessPopup = false;
    this.openFailPopup = false;
  }

  toggleDatepicker(event: MatCheckboxChange) {
    if(event.checked) {
      this.isReservation = false;
      return;
    }
    this.isReservation = true;
  }
}
