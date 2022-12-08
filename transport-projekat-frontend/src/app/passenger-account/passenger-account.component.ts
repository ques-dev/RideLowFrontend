import {Component, OnInit} from '@angular/core';
import {Passenger, PassengerService} from "../service/passenger.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-passenger-account',
  templateUrl: './passenger-account.component.html',
  styleUrls: ['./passenger-account.component.css','../app.component.css']
})
export class PassengerAccountComponent implements OnInit {

  public passenger: Passenger = {

    "name": "Jovan",
    "surname": "Jovanović",
    "profilePicture": "",
    "telephoneNumber": "063 7924 812",
    "address": "Resavska 23",
    "email": "jovan@gmail.com",
    "password":"pass",
  };

  updatePassengerForm = new FormGroup({
    name: new FormControl( '',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    telephoneNumber: new FormControl('',[Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('placeholder_pass'),
  });

  updateMode  = false;
  updateButtonText = "Izmeni podatke"
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private passengerService : PassengerService, private successMsg : MatSnackBar) { }
  ngOnInit() {
    this.updatePassengerForm.disable();
    console.log(this.updatePassengerForm.value);
    this.showPassenger();
  }

  updatePassenger(){
    this.passengerService.updatePassenger(this.updatePassengerForm.value)
      .subscribe((result : any) => console.log(result));
    this.disableForm();
  }

  showPassenger() {
    this.passengerService.getPassenger()
      .subscribe(passenger => {
        this.passenger = passenger;
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
      console.log(this.updatePassengerForm.value)
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
    this.successMsg.open('Podaci uspešno izmenjeni!', '', {
      duration: 2000,
      horizontalPosition : this.horizontalPosition,
      verticalPosition : this.verticalPosition,
      panelClass: ['center']
    });
  }
}
