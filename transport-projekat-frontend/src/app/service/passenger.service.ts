import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";
import {User} from "../model/User";
import {UserRetrieved} from "../model/UserRetrieved";

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PassengerService {
  url = environment.apiURL + "passenger/1";
  postUrl = environment.apiURL + "passenger";

  constructor(private http: HttpClient) { }

  getPassenger(): Observable<UserRetrieved> {
    return this.http.get<UserRetrieved>(this.url);
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
}
