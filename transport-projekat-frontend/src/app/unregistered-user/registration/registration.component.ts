import {Component} from "@angular/core";
import {PassengerService} from "../../passenger/passenger.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../shared/model/User";

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.css','../../app.component.css']
})
export class RegistrationComponent {

  constructor(private passengerService : PassengerService, private router:Router) { }

  registerPassengerForm: FormGroup = new FormGroup({
    name: new FormControl( '',{nonNullable:true, validators: [Validators.required]}),
    surname: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    telephoneNumber: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    address: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    password: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    passwordRepeat : new FormControl('',{nonNullable:true, validators: [Validators.required]}),
  });

  firstPartVisible = true;

  registerPassenger() {
      const passenger : User = {
        name : this.registerPassengerForm.value.name,
        surname : this.registerPassengerForm.value.surname,
        telephoneNumber : this.registerPassengerForm.value.telephoneNumber,
        profilePicture : '',
        address : this.registerPassengerForm.value.address,
        email : this.registerPassengerForm.value.email,
        password : this.registerPassengerForm.value.password
      }
      this.passengerService.registerPassenger(passenger).subscribe();
  }

  check(){
    if(this.registerPassengerForm.valid) {
      this.registerPassenger();
      this.router.navigate(['passenger-account']).then();
    }
  }

  activateSecondPart() {
    this.firstPartVisible = false;
  }

  activateFirstPart() {
    this.firstPartVisible = true;
  }
}
