import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PassengerService} from "../passenger.service";
import {Review} from "../../shared/model/Review";
import {NotificationService} from "../../shared/notification-service/notification.service";

@Component({
  selector: 'app-ride-rating',
  templateUrl: './ride-rating.component.html',
  styleUrls: ['./ride-rating.component.css','../../app.component.css']
})
export class RideRatingComponent implements OnInit{

  @Input() isDriver = true;
  who = "vozača";
  rating = 0;
  @Input() windowVisible = true;
  @Output() windowClosed = new EventEmitter<boolean>();
  @Input() rideId = -1;

  reviewForm : FormGroup = new FormGroup({
    comment: new FormControl( '',{nonNullable:true, validators: [Validators.required, Validators.maxLength(500)]}),
  });

  constructor(private passengerService : PassengerService, private notificationService : NotificationService) {

  }
  ngOnInit() {
    if(this.isDriver) this.who = "vozača";
    else this.who = "vozilo";
  }
  close(){
    this.rating = 0;
    this.windowClosed.emit(true);
    this.windowVisible = false;
  }

  onRatingChanged(rating : number){
    this.rating = rating;
  }

  review() {
    if(!this.reviewForm.valid || this.rating == 0) return;
    const review : Review = {
      rating : this.rating,
      comment : this.reviewForm.controls["comment"].value
    };
    if(this.isDriver) this.passengerService.reviewDriver(review,this.rideId).subscribe();
    else this.passengerService.reviewVehicle(review,this.rideId).subscribe();
    this.notificationService.createNotification("Ocena je uspešno poslata!",3000);
    this.close();
  }
}
