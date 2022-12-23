import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PassengerAccountComponent} from "./passenger/passenger-account/passenger-account.component";
import {LoginRegisterComponent} from "./unregistered-user/login-register/login-register.component";
import {PassengerHomeComponent} from "./passenger/passenger-home/passenger-home.component";
import {UnregisteredUserMainComponent} from "./unregistered-user/unregistered-user-main/unregistered-user-main.component";
import {DriverAccountComponent} from "./driver/driver-account/driver-account.component";
import {DriverHomeComponent} from "./driver/driver-home/driver-home.component";

const routes: Routes = [
  {path: "passenger-account", component: PassengerAccountComponent },
  {path: "driver-account", component: DriverAccountComponent },
  {path: "entrance", component: LoginRegisterComponent },
  {path: "passenger-home", component: PassengerHomeComponent},
  {path: "driver-home", component: DriverHomeComponent},
  {path: "unregistered-main", component: UnregisteredUserMainComponent },
  {path: '', redirectTo:'/unregistered-main', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
