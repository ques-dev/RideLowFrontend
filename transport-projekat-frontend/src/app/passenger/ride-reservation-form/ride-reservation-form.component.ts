import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-ride-reservation-form',
  templateUrl: './ride-reservation-form.component.html',
  styleUrls: ['./ride-reservation-form.component.css','../../app.component.css']
})
export class RideReservationFormComponent {
  errorText = '';
  closed = false;
  passengersEmails = ["prvi@mail.com","drugi@mail.com"];
  totalPrice = 840.00;
  pricePerPerson = this.totalPrice / this.passengersEmails.length;
  @Input() orderClicked = false;
  @Output() orderClosed = new EventEmitter<boolean>();
  public close() {
    this.orderClosed.emit(true);
  }

  public remove(email : string) {
    const index = this.passengersEmails.indexOf(email);
    if (index >= 0) {
      this.passengersEmails.splice(index, 1);
    }
  }
  add(email: string): void {
    this.passengersEmails.push(email);
  }
}
