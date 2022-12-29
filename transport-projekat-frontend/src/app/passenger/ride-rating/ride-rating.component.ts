import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-ride-rating',
  templateUrl: './ride-rating.component.html',
  styleUrls: ['./ride-rating.component.css','../../app.component.css']
})
export class RideRatingComponent{

  @Input() who = "vozača";
  rating = 0;
  @Input() windowVisible = true;
  @Output() windowClosed = new EventEmitter<boolean>();
  close(){
    this.rating = 0;
    this.windowClosed.emit(true);
  }

  onRatingChanged(rating : number){
    this.rating = rating;
  }
}
