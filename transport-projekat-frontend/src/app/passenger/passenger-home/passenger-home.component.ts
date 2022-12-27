import {Component} from '@angular/core';
import {MapService} from "../../shared/map/map.service";

@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css','../../app.component.css']
})
export class PassengerHomeComponent{

  constructor(private mapService: MapService) {}
  rideOrderClicked = false;
  public openRideOrderForm(){
    this.rideOrderClicked = true;
  }

}

