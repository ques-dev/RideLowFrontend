import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PassengerAccountComponent} from "./passenger-account/passenger-account.component";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginRegisterComponent} from "./login-register/login-register.component";
import {PassengerHomeComponent} from "./passenger-home/passenger-home.component";

const routes: Routes = [
  {path: "account", component: PassengerAccountComponent },
  {path: "entrance", component: LoginRegisterComponent },
  {path:"home", component: PassengerHomeComponent},
  {path: '', redirectTo:'/entrance', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
