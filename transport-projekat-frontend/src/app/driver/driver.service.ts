import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserRetrieved} from "../shared/model/UserRetrieved";
import {DriverUpdateRequest} from "../shared/model/DriverUpdateRequest";
import {DriversShift} from "./DriversShift";
import * as moment from "moment";

type Response = {
  message: string
} | {
  message: string,
  status: 'error'
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DriverService {
  url = environment.apiURL + "driver";
  shiftId = -1;
  cantStartShift = false;

  constructor(private http: HttpClient) { }

  private changingPassword = new BehaviorSubject<boolean>(false);
  changingPassword$ = this.changingPassword.asObservable();

  public setChangingPassword(changing: boolean) {
    this.changingPassword.next(changing);
  }

  getDriver(): Observable<UserRetrieved> {
    return this.http.get<UserRetrieved>(this.url + "/2");
  }

  sendUpdateDriverRequest(newDriver : DriverUpdateRequest) : Observable<Response> {
    return this.http.post<Response>(this.url + "/edit-request", newDriver);
  }

  startShift(): Observable<DriversShift> {
    const shift = {
      'start': moment().format('YYYY-MM-DDTHH:mm:ss'),
    };
    return this.http.post<DriversShift>(this.url + "/2/working-hour", shift);
  }

  endShift(): Observable<DriversShift> {
    const shift = {
      'end': moment().format('YYYY-MM-DDTHH:mm:ss'),
    };
    return this.http.put<DriversShift>(this.url + "/working-hour/" + this.shiftId, shift);
  }
}
