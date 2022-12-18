import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PassengerAccountComponent} from "./passenger-account/passenger-account.component";
import {PassengerHomeComponent} from "./passenger-home/passenger-home.component";
import {PassengerSideNavigationComponent} from "./passenger-side-navigation/passenger-side-navigation.component";
import {RideEstimatesComponent} from "./ride-estimates/ride-estimates.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {PassengerService} from "./passenger.service";

@NgModule({
  declarations: [
    PassengerAccountComponent,
    PassengerHomeComponent,
    PassengerSideNavigationComponent,
    RideEstimatesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    SharedModule
  ],
  exports: [
    PassengerAccountComponent,
    PassengerHomeComponent,
    PassengerSideNavigationComponent,
    RideEstimatesComponent
  ],
  providers: [
    PassengerService
  ]
})
export class PassengerModule { }
