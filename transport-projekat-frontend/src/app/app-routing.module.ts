import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PassengerAccountComponent} from "./passenger-account/passenger-account.component";

const routes: Routes = [
  {path: "account", component: PassengerAccountComponent },
  { path: '', redirectTo: '/account', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
