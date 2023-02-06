import {ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {UserService} from "../../shared/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule, By} from "@angular/platform-browser";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoginCredentials} from "../../shared/model/LoginCredentials";
import {Token} from "../../shared/model/Token";
import {BehaviorSubject} from "rxjs";
import {UserMockService} from "../../../tests/user-mock.service";


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginForm : HTMLElement;
  const userService  = new UserMockService();

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: UserService, useClass: UserMockService}
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginForm = fixture.debugElement.nativeElement.querySelectorAll("form")[0];
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate login form', () => {
    expect(loginForm).toBeDefined();
  });

  it("should not call login if fields are empty", async () => {
    spyOn(component,"login");
    const submitButton = fixture.debugElement.query(By.css("#submit")).nativeElement;
    submitButton.click();
    fixture.whenStable().then(() => {
      expect(component.login).toHaveBeenCalled();
    });
    component.loginForm.controls["email"].setValue('');
    component.loginForm.controls["password"].setValue('');

    expect(component.loginForm.valid).toBeFalsy();
  });

  it("should not call login if email field format is not correct", async () => {
    spyOn(component,"login");
    const submitButton = fixture.debugElement.query(By.css("#submit")).nativeElement;
    submitButton.click();
    fixture.whenStable().then(() => {
      expect(component.login).toHaveBeenCalled();
    });
    component.loginForm.controls["email"].setValue('mail.com');
    component.loginForm.controls["password"].setValue('Test1Test');
    //spyOn(userService, "login");
    //expect(userService.login).toHaveBeenCalledTimes(0);
  });

  it("should call login if email field format is not correct", async () => {
    spyOn(component,"login").and.callThrough();
    const submitButton = fixture.debugElement.query(By.css("#submit")).nativeElement;
    submitButton.click();
    fixture.whenStable().then(() => {
      expect(component.login).toHaveBeenCalled();
      component.loginForm.controls["email"].setValue('mail@mail.com');
      component.loginForm.controls["password"].setValue('Test1Test');
      const loginCredentials: LoginCredentials = {
        email: <string>component.loginForm.controls["email"].value,
        password: <string>component.loginForm.controls["password"].value,
      }
      const token :Token = {
        accessToken : "abc",
        refreshToken : "abc"
      }
      const returnVal = new BehaviorSubject(token).asObservable();
      expect(component.loginForm.valid).toBeTruthy();
      //spyOn(sessionStorage, 'setItem');
      //expect(sessionStorage.setItem).toHaveBeenCalled();
      //spyOn(component.userService,'login').withArgs(loginCredentials).and.returnValue(returnVal);
      //expect(component.userService.login).toHaveBeenCalled();
      spyOn(userService, 'login').withArgs(loginCredentials).and.callThrough();
      expect(userService.login).toHaveBeenCalled();
      expect(userService.idk).toBeTruthy();
      //spyOn(Object.getPrototypeOf(sessionStorage), 'setItem').and.returnValue(true);
      //expect(Object.getPrototypeOf(sessionStorage).setItem).toHaveBeenCalled();
      //const obj = spyOn(userService, "login").withArgs(loginCredentials);
      //expect(userService.login).toHaveBeenCalled();
      //expect(router.navigate).toHaveBeenCalled();
    });
  });
});
