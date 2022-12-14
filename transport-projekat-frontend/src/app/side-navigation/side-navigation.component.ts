import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css','../app.component.css']
})
export class SideNavigationComponent {

  constructor(private router : Router) { }

  logout() {
    this.router.navigate(['entrance']);
  }
}
