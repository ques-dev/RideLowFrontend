import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapComponent} from "./map/map.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { PanicComponent } from './panic/panic.component';

@NgModule({
  declarations: [
    MapComponent,
    PanicComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
  exports: [
    MapComponent,
    PanicComponent
  ]
})
export class SharedModule { }
