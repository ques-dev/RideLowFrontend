import { Injectable } from '@angular/core';
import {LoginCredentials} from "../app/shared/model/LoginCredentials";
import {BehaviorSubject, Observable} from "rxjs";
import {Token} from "../app/shared/model/Token";
import {UserService} from "../app/shared/user.service";
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "../app/shared/notification-service/notification.service";

@Injectable()
export class UserMockService {

  idk = false;
  public login(auth: LoginCredentials): Observable<Token> {

    const token :Token = {
      accessToken : "abc",
      refreshToken : "abc"
    }
    this.idk = true;
    return new BehaviorSubject(token).asObservable();
  }
}
