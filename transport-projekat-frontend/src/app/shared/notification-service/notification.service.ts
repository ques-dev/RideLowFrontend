import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _notificationPopup : MatSnackBar) { }

  horizontalPosition : MatSnackBarHorizontalPosition = 'end';
  verticalPosition : MatSnackBarVerticalPosition = 'top';

  createNotification(message : string, durationMs : number) {
    this._notificationPopup.open(message, '', {
      duration: durationMs,
      horizontalPosition : this.horizontalPosition,
      verticalPosition : this.verticalPosition,
    });
  }

}
