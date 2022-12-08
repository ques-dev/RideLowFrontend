import {Component} from "@angular/core";
import {Passenger, PassengerService} from "../service/passenger.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.css','../app.component.css']
})
export class RegistrationComponent{

  constructor(private passengerService : PassengerService, private router:Router) { }

  registerPassengerForm = new FormGroup({
    name: new FormControl( '',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    telephoneNumber: new FormControl('',[Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  registerPassenger() {
      this.passengerService.registerPassenger(this.registerPassengerForm.value)
        .subscribe((result : any) => console.log(result));
  }

  check(){
    if(this.registerPassengerForm.valid) {
      this.registerPassenger();
      this.router.navigate(['account']);
    }
  }
}
