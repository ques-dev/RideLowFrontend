import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";
import {Passenger} from "../model/Passenger";
import {PassengerRetrieved} from "../model/PassengerRetrieved";

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PassengerService {
  url = environment.apiURL + "passenger/1";
  postUrl = environment.apiURL + "passenger";

  constructor(private http: HttpClient) { }

  getPassenger(): Observable<PassengerRetrieved> {
    return this.http.get<PassengerRetrieved>(this.url);
  }

  updatePassenger(newData : Passenger) : Observable<HttpEvent<PassengerRetrieved>> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.put<PassengerRetrieved>(this.url,newData,options);
  }

  registerPassenger(newData : Passenger) : Observable<HttpEvent<PassengerRetrieved>> {
    const options : any = {
      responseType: 'text',
    };
    return this.http.post<PassengerRetrieved>(this.postUrl,newData,options);
  }
}
