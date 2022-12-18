import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PassengerSideNavigationComponent } from './passenger-side-navigation/passenger-side-navigation.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { PassengerAccountComponent } from './passenger-account/passenger-account.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RegistrationComponent} from "./registration/registration.component";
import { LoginRegisterComponent } from './login-register/login-register.component';
import {LoginComponent} from "./login/login.component";
import { TopBarComponent } from './top-bar/top-bar.component';
import { UnregisteredUserMainComponent } from './unregistered-user-main/unregistered-user-main.component';
import { MapComponent } from './map/map.component';
import { DriverSideNavigationComponent } from './driver-side-navigation/driver-side-navigation.component';
import { DriverAccountComponent } from './driver-account/driver-account.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
    declarations: [
        AppComponent,
        PassengerSideNavigationComponent,
        PassengerAccountComponent,
        RegistrationComponent,
        LoginRegisterComponent,
        LoginComponent,
        TopBarComponent,
        UnregisteredUserMainComponent,
        MapComponent,
        DriverSideNavigationComponent,
        DriverAccountComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
