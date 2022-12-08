import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";

export interface Passenger {
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  address: string;
  email: string;
  password : string;
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PassengerService {
  url = environment.apiURL + "passenger/1";
  posturl = environment.apiURL + "passenger";

  constructor(private http: HttpClient) { }

  getPassenger(): Observable<Passenger> {
    return this.http.get<Passenger>(this.url);
  }

  updatePassenger(newData : any) : Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.put<Passenger>(this.url,newData,options);
  }

  registerPassenger(newData : any) : Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    console.log(newData);
    return this.http.post<Passenger>(this.posturl,newData,options);
  }
}
