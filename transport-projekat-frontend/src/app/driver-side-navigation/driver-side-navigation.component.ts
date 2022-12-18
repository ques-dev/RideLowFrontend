import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-side-navigation',
  templateUrl: './driver-side-navigation.component.html',
  styleUrls: ['../passenger-side-navigation/passenger-side-navigation.component.css', './driver-side-navigation.component.css', '../app.component.css']
})
export class DriverSideNavigationComponent {
  isChecked = true;
  constructor(private router : Router) { }

  logout() {
    this.router.navigate(['entrance']);
  }
}
