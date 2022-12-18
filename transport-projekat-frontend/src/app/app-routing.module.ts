import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PassengerAccountComponent} from "./passenger-account/passenger-account.component";
import {LoginRegisterComponent} from "./login-register/login-register.component";
import {PassengerHomeComponent} from "./passenger-home/passenger-home.component";
import {UnregisteredUserMainComponent} from "./unregistered-user-main/unregistered-user-main.component";

const routes: Routes = [
  {path: "account", component: PassengerAccountComponent },
  {path: "entrance", component: LoginRegisterComponent },
  {path:"home", component: PassengerHomeComponent},
  //{path: '', redirectTo:'/entrance', pathMatch: 'full'},
  {path: "unregistered_main", component: UnregisteredUserMainComponent },
  {path: '', redirectTo:'/unregistered_main', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
