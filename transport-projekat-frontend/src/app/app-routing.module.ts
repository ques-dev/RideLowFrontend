import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PassengerAccountComponent} from "./passenger-account/passenger-account.component";
import {RegistrationComponent} from "./registration/registration.component";

const routes: Routes = [
  {path: "account", component: PassengerAccountComponent },
  {path: "register", component: RegistrationComponent },
  {path: '', redirectTo:'/account', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
