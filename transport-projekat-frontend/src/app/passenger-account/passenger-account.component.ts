import {Component, OnInit} from '@angular/core';
import {Passenger, PassengerService} from "../service/passenger.service";

@Component({
  selector: 'app-passenger-account',
  templateUrl: './passenger-account.component.html',
  styleUrls: ['./passenger-account.component.css']
})
export class PassengerAccountComponent implements OnInit {

  public passenger: Passenger = {
    "id": -1,
    "name": "Jovan",
    "surname": "Jovanović",
    "profilePicture": "",
    "telephoneNumber": "063 7924 812",
    "address": "Resavska 23",
    "email": "jovan@gmail.com"
  };

  constructor(private passengerService : PassengerService) { }
  ngOnInit() {
    this.showPassenger();
  }

  showPassenger() {
    this.passengerService.getPassenger()
      .subscribe(passenger => this.passenger = passenger);
  }
}
