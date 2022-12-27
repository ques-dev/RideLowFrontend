import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-passenger-side-navigation',
  templateUrl: './passenger-side-navigation.component.html',
  styleUrls: ['./passenger-side-navigation.component.css','../../app.component.css']
})
export class PassengerSideNavigationComponent {

  constructor(private router : Router) {}

  logout() {this.router.navigate(['entrance']).then();}
}
