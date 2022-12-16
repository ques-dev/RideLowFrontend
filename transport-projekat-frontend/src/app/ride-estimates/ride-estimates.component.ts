import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-ride-estimates',
  templateUrl: './ride-estimates.component.html',
  styleUrls: ['./ride-estimates.component.css','../app.component.css']
})
export class RideEstimatesComponent {

  isRegisteredUser = true;
  
  searchForm : FormGroup = new FormGroup({
    departure: new FormControl( '',{nonNullable:true, validators: [Validators.required]}),
    destination: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
  });

  estimatesForm : FormGroup = new FormGroup({
    time: new FormControl( ''),
    price: new FormControl(''),
  });

  ngOnInit() {
    this.estimatesForm.disable();
  }
}
