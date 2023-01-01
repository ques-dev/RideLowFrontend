import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapComponent} from "./map/map.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { PanicComponent } from './panic/panic.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    MapComponent,
    PanicComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
    exports: [
        MapComponent,
        PanicComponent,
        ChangePasswordComponent
    ]
})
export class SharedModule { }
