import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MapService} from "../../shared/map/map.service";
import {AdminService} from "../admin.service";
import {NotificationService} from "../../shared/notification-service/notification.service";

@Component({
  selector: 'app-admin-side-navigation',
  templateUrl: './admin-side-navigation.component.html',
  styleUrls: ['../../passenger/passenger-side-navigation/passenger-side-navigation.component.css', './admin-side-navigation.component.css', '../../app.component.css']
})
export class AdminSideNavigationComponent {
  constructor(private router: Router,
              private mapService: MapService,
              public adminService: AdminService,
              private notificationService: NotificationService) {
  }

  logout() {
    this.mapService.setRideDenied(false);
    this.mapService.setRideInProgress(false);
    this.router.navigate(['entrance']);
  }
}
