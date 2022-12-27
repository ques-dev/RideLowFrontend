import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, lastValueFrom, Observable, Subject} from "rxjs";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RouteEstimates} from "../model/RouteEstimates";
import {RouteEstimatesRequestBody} from "../model/RouteEstimatesRequestBody";
import {Location} from "../model/Location";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private estimatesUrl = environment.apiURL + "unregisteredUser";

  constructor(private http: HttpClient) {
  }
  private rideInProgress = new BehaviorSubject<boolean>(false);
  rideInProgress$ = this.rideInProgress.asObservable();
  private rideDenied = new BehaviorSubject<boolean>(false);
  rideDenied$ = this.rideDenied.asObservable();
  private departure : BehaviorSubject<Location> = new BehaviorSubject<Location>(Location.getEmptyLocation());
  departure$ = this.departure.asObservable();
  private destination : BehaviorSubject<Location> = new BehaviorSubject<Location>(Location.getEmptyLocation());
  destination$ = this.destination.asObservable();
  private drawRouteRequest : Subject<boolean> = new Subject<boolean>();
  drawRouteRequest$ = this.drawRouteRequest.asObservable();
  private mapRoutingOnly : Subject<boolean> = new Subject<boolean>();
  mapRoutingOnly$ = this.mapRoutingOnly.asObservable();
  private clearMap : Subject<boolean> = new Subject<boolean>();
  clearMap$ = this.clearMap.asObservable();
  private estimates : BehaviorSubject<RouteEstimates> = new BehaviorSubject<RouteEstimates>(RouteEstimates.getEmptyRouteEstimates());
  estimates$ = this.estimates.asObservable();
  private returnEstimates : Subject<boolean>= new Subject<boolean>();
  returnEstimates$ = this.returnEstimates.asObservable();

  public setRideInProgress(inProgress: boolean) {
    this.rideInProgress.next(inProgress);
  }

  public setRideDenied(denied: boolean) {
    this.rideDenied.next(denied);
  }

  private getRouteEstimates() : Promise<RouteEstimates>{
    const rideDetails: RouteEstimatesRequestBody = {
      locations: [this.departure.getValue(), this.destination.getValue()],
      vehicleType: "STANDARDNO",
      babyTransport: false,
      petTransport: false
    }
    return lastValueFrom(this.http.post<RouteEstimates>(this.estimatesUrl, rideDetails));
  }

  public setDeparture(departure : Location) {
    this.departure.next(departure);
  }

  public setDestination(destination : Location) {
    this.destination.next(destination);
  }

  public setClearMap() {
    this.clearMap.next(true);
  }

  public setMapRoutingOnly(status : boolean) {
    this.mapRoutingOnly.next(status);
  }

  public setDrawRouteRequest() {
    this.drawRouteRequest.next(true);
  }

  public async setRideEstimates() {
    await this.getRouteEstimates().then(retrieved => this.estimates.next(retrieved));
    this.returnEstimates.next(true);
  }


}
