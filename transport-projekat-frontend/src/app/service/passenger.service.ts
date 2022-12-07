import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";

export interface Passenger {
  id: number;
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  address: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PassengerService {
  url = environment.apiURL + "passenger/1";

  constructor(private http: HttpClient) { }

  getPassenger(): Observable<Passenger> {
    return this.http.get<Passenger>(this.url);
  }

  updatePassenger(newData : Passenger) : Observable<Passenger> {
    return this.http.put<Passenger>(this.url,newData);
  }
}
