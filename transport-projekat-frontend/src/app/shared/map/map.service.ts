import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private rideInProgress = new BehaviorSubject<boolean>(false);
  rideInProgress$ = this.rideInProgress.asObservable();
  private rideDenied = new BehaviorSubject<boolean>(false);
  rideDenied$ = this.rideDenied.asObservable();

  public setRideInProgress(inProgress: boolean) {
    this.rideInProgress.next(inProgress);
  }

  public setRideDenied(denied: boolean) {
    this.rideDenied.next(denied);
  }
}
