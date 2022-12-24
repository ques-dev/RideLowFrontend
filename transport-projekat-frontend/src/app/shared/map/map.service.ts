import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private rideInProgress = new BehaviorSubject<boolean>(false);
  rideInProgress$ = this.rideInProgress.asObservable();

  public setRideInProgress(inProgress: boolean) {
    this.rideInProgress.next(inProgress);
  }
}
