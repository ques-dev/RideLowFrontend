import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-passenger-account',
  templateUrl: './passenger-account.component.html',
  styleUrls: ['./passenger-account.component.css']
})
export class PassengerAccountComponent implements OnInit {
  disabled = true;
  firstNameControl = new FormControl();
  lastNameControl = new FormControl();
  phoneNumberControl = new FormControl();
  addressControl = new FormControl();
  emailControl = new FormControl();

  ngOnInit() {
    this.firstNameControl = new FormControl({value: 'Jovan', disabled: this.disabled});
    this.lastNameControl = new FormControl({value: 'Jovanović', disabled: this.disabled});
    this.phoneNumberControl = new FormControl({value: '063 7924 812', disabled: this.disabled});
    this.addressControl = new FormControl({value: 'Resavska 23', disabled: this.disabled})
    this.emailControl = new FormControl({value: 'jovan@gmail.com', disabled: this.disabled});
  }
}
