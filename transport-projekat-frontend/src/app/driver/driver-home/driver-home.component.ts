import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Location} from "../../shared/model/Location";
import {NotificationService} from "../../shared/notification-service/notification.service";
import {MapService} from "../../shared/map/map.service";

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css', '../../app.component.css']
})
export class DriverHomeComponent implements OnInit{
  public departure : BehaviorSubject<Location> = new BehaviorSubject<Location>(Location.getEmptyLocation());
  public destination : BehaviorSubject<Location> = new BehaviorSubject<Location>(Location.getEmptyLocation());
  public passenger : Subject<boolean> = new Subject<boolean>();
  public rideReceived = false;
  public displayCar = true;
  public denyOpened = false;

  constructor(private notificationService : NotificationService,
              public mapService : MapService) {}

  public sendLocationToMap(location : Location, which : string) : void {
    if(which == 'destination') this.destination.next(location);
    else this.departure.next(location);
  }

  public drawRoute() : void {
    this.passenger.next(false);
  }

  public receiveRide() : void {
    this.rideReceived = true;
    this.notificationService.createNotification("Primili ste vožnju!", 3000);
    this.displayCar = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.receiveRide();
    }, 3000);
  }
}
