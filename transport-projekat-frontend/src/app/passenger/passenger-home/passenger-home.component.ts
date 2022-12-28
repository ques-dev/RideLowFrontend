import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MapService} from "../../shared/map/map.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css','../../app.component.css']
})
export class PassengerHomeComponent implements OnInit{

  constructor(private mapService: MapService) {}
  orderClicked = false;

  ngOnInit() {
    this.mapService.setIsDriver(false);
  }
  public openRideOrderForm(){
    this.orderClicked = true;
  }

  public closeRideOrderForm(){
    this.orderClicked = false;
  }

}

