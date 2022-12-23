import { Component } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Location} from "../../shared/model/Location";

@Component({
  selector: 'app-unregistered-user-main',
  templateUrl: './unregistered-user-main.component.html',
  styleUrls: ['./unregistered-user-main.component.css','../../app.component.css']
})
export class UnregisteredUserMainComponent {
  public departure : BehaviorSubject<Location> = new BehaviorSubject<Location>(Location.getEmptyLocation());
  public destination : BehaviorSubject<Location> = new BehaviorSubject<Location>(Location.getEmptyLocation());
  public passenger : Subject<boolean> = new Subject<boolean>();

  public sendLocationToMap(location : Location, which : string) : void {
    if(which == 'destination') this.destination.next(location);
    else this.departure.next(location);
  }

  public drawRoute() : void {
    this.passenger.next(true);
  }
}
