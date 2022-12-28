import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {DriverModule} from "./driver/driver.module";
import {PassengerModule} from "./passenger/passenger.module";
import {UnregisteredUserModule} from "./unregistered-user/unregistered-user.module";
import {SharedModule} from "./shared/shared.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
    declarations: [
        AppComponent
    ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    DriverModule,
    PassengerModule,
    UnregisteredUserModule,
    SharedModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
