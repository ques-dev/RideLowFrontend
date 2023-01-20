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

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PassengerService {
  url = environment.apiURL + "passenger/2";
  postUrl = environment.apiURL + "passenger";
  createRideUrl = environment.apiURL + "ride";
  createFavoriteRideUrl = this.createRideUrl + "/favorites"

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
}
