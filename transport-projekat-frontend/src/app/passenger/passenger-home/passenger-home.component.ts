import {Component} from '@angular/core';
import {Location} from "../../shared/model/Location";
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css','../../app.component.css']
})
export class PassengerHomeComponent {

  public departure : BehaviorSubject<Location> = new BehaviorSubject<Location>(Location.getEmptyLocation());
  public destination : BehaviorSubject<Location> = new BehaviorSubject<Location>(Location.getEmptyLocation());
  public toDrawRoute : Subject<boolean> = new Subject<boolean>();
  public rideOrderClicked = false;

  public sendLocationToMap(location : Location, which : string) : void {
    if(which == 'destination') this.destination.next(location);
    else this.departure.next(location);
  }

  public drawRoute() : void {
    this.toDrawRoute.next(true);
  }

  public openRideOrderForm(){
    this.rideOrderClicked = true;
  }
}

