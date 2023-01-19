import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {catchError, Observable} from 'rxjs';
import {environment} from "../environments/environment";
import {User} from "../shared/model/User";
import {UserRetrieved} from "../shared/model/UserRetrieved";
import {UserIdEmail} from "../shared/model/UserIdEmail";
import {RideReservation} from "../shared/model/RideReservation";
import {RideCreated} from "../shared/model/RideCreated";

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PassengerService {
  url = environment.apiURL + "passenger/1";
  postUrl = environment.apiURL + "passenger";
  createRideUrl = environment.apiURL + "ride";

  constructor(private http: HttpClient) { }

  getPassenger(): Observable<UserRetrieved> {
    return this.http.get<UserRetrieved>(this.url);
  }

  getPassengerIdByMail(email : string) : Observable<UserIdEmail> {
    const fullUrl = this.postUrl + "/" + email + "/id";
    return this.http.get<UserIdEmail>(fullUrl);
  }

  updatePassenger(newData : User) : Observable<HttpEvent<UserRetrieved>> {
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
}
