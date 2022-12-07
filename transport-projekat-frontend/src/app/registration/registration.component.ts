import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.css']
})
export class RegistrationComponent{


  registerPassengerForm = new FormGroup({
    name: new FormControl( '',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    telephoneNumber: new FormControl('',[Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('placeholder_pass'),
  });
}
