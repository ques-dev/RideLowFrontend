import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PassengerAccountComponent} from "./passenger-account/passenger-account.component";
import {LoginRegisterComponent} from "./login-register/login-register.component";
import {UnregisteredUserMainComponent} from "./unregistered-user-main/unregistered-user-main.component";
import {DriverAccountComponent} from "./driver-account/driver-account.component";

const routes: Routes = [
  {path: "passenger-account", component: PassengerAccountComponent },
  {path: "driver-account", component: DriverAccountComponent },
  {path: "entrance", component: LoginRegisterComponent },
  {path: "unregistered-main", component: UnregisteredUserMainComponent },
  {path: '', redirectTo:'/unregistered-main', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
