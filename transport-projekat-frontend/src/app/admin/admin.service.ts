import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DriverUpdateRequest} from "../shared/model/DriverUpdateRequest";
import {Observable} from "rxjs";

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
export class AdminService {
  url = environment.apiURL + "admin";

  constructor(private http: HttpClient) { }

  sendCreateDriverRequest(newDriver : DriverUpdateRequest) : Observable<Response> {
    return this.http.post<Response>(this.url + "/edit-request", newDriver);
  }
}
