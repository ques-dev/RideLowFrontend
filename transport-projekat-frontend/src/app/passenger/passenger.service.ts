import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {environment} from "../environments/environment";
import {User} from "../shared/model/User";
import {UserRetrieved} from "../shared/model/UserRetrieved";
import {UserIdEmail} from "../shared/model/UserIdEmail";
import {RideReservation} from "../shared/model/RideReservation";
import {RideCreated} from "../shared/model/RideCreated";
import {UserUpdateInfo} from "../shared/model/UserUpdateInfo";
import {Observable} from "rxjs";
import {FavoriteRideCreation} from "../shared/model/FavoriteRideCreation";
import {FavoriteRideCreated} from "../shared/model/FavoriteRideCreated";
import {Review} from "../shared/model/Review";
import {ReviewReturned} from "../shared/model/ReviewReturned";

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PassengerService {
  url = environment.apiURL + "passenger/2";
  postUrl = environment.apiURL + "passenger";
  createRideUrl = environment.apiURL + "ride";
  createFavoriteRideUrl = this.createRideUrl + "/favorites";
  reviewUrl = environment.apiURL + "review/"
  currentRideId?: number = 0;

  constructor(private http: HttpClient) { }

  getPassenger(): Observable<UserRetrieved> {
    return this.http.get<UserRetrieved>(this.url);
  }

  getPassengerIdByMail(email : string) : Observable<UserIdEmail> {
    const fullUrl = this.postUrl + "/" + email + "/id";
    return this.http.get<UserIdEmail>(fullUrl);
  }

  updatePassenger(newData : UserUpdateInfo) : Observable<HttpEvent<UserRetrieved>> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.put<UserRetrieved>(this.url,newData,options);
  }

  registerPassenger(newData : User) : Observable<HttpEvent<UserRetrieved>> {
    const options : any = {
      responseType: 'text',
    };
    return this.http.post<UserRetrieved>(this.postUrl,newData,options);
  }

  reserveRide(ride : RideReservation) : Observable<HttpEvent<RideCreated>> {
    const options : any = {
      responseType: 'text',
    };
    return this.http.post<RideCreated>(this.createRideUrl,ride,options);
  }

  addFavorite(favorite : FavoriteRideCreation) : Observable<HttpEvent<FavoriteRideCreated>> {
    const options : any = {
      responseType: 'text',
    };
    return this.http.post<FavoriteRideCreated>(this.createFavoriteRideUrl,favorite,options);
  }

  reviewDriver(review : Review, rideId: number) : Observable<HttpEvent<ReviewReturned>> {
    const options : any = {
      responseType: 'text',
    };
    const url = this.reviewUrl  + rideId.toString() + "/driver";
    return this.http.post<ReviewReturned>(url,review,options);
  }

  reviewVehicle(review : Review, rideId: number) : Observable<HttpEvent<ReviewReturned>> {
    const options : any = {
      responseType: 'text',
    };
    const url = this.reviewUrl + rideId.toString() + "/vehicle";
    return this.http.post<ReviewReturned>(url,review,options);
  }

  getActiveRide() : Observable<RideCreated> {
    const url = this.createRideUrl + "/passenger/1/active";
    return this.http.get<RideCreated>(url);
  }
}
