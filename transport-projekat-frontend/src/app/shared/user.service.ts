import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChangePassword} from "./model/ChangePassword";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

type ChangePasswordResponse = {
  message: string
} | {
  message: string,
  status: 'error'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public changePassword(id : number, request : ChangePassword) : Observable<ChangePasswordResponse> {
    return this.http.put<ChangePasswordResponse>(environment.apiURL + `user/${id}/changePassword`, request);
  }

  public cutBase64ImageFormat(base64Image: string) : string {
    return base64Image.split(',')[1];
  }
}
