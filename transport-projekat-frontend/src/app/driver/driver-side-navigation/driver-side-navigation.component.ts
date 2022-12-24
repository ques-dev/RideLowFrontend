import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MapService} from "../../shared/map/map.service";

@Component({
  selector: 'app-driver-side-navigation',
  templateUrl: './driver-side-navigation.component.html',
  styleUrls: ['../../passenger/passenger-side-navigation/passenger-side-navigation.component.css', './driver-side-navigation.component.css', '../../app.component.css']
})
export class DriverSideNavigationComponent {
  isChecked = true;
  constructor(private router : Router,
              private mapService : MapService) { }

  logout() {
    this.mapService.setRideDenied(false);
    this.mapService.setRideInProgress(false);
    this.router.navigate(['entrance']);
  }
}
