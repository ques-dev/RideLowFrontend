import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-ride-reserved-popup',
  templateUrl: './ride-reserved-popup.component.html',
  styleUrls: ['./ride-reserved-popup.component.css','../../app.component.css']
})
export class RideReservedPopupComponent {

  @Input() popupOpened = true;
  @Output() popupClosed = new EventEmitter<boolean>();

  close(){
    this.popupOpened = false;
    this.popupClosed.emit(true);
  }
}
