import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserRetrieved} from "../shared/model/UserRetrieved";

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DriverService {
  url = environment.apiURL + "driver/2";
  constructor(private http: HttpClient) { }

  getDriver(): Observable<UserRetrieved> {
    return this.http.get<UserRetrieved>(this.url);
  }
}
