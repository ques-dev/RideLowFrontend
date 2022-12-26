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
  public passenger : Subject<boolean> = new Subject<boolean>();
  public mapRoutingOnly : Subject<boolean> = new Subject<boolean>();
  public clearMap : Subject<boolean> = new Subject<boolean>();

  public sendLocationToMap(location : Location, which : string) : void {
    if(which == 'destination') this.destination.next(location);
    else this.departure.next(location);
  }

  public drawRoute() : void {
    this.passenger.next(true);
  }

  public removeMarkers() : void {
    this.mapRoutingOnly.next(true);
  }

  public clearMapMarkersAndRoute() : void {
    this.clearMap.next(true);
  }
}

