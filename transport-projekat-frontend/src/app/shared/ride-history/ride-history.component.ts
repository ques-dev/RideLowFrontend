import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../shared/notification-service/notification.service";
import {UserService} from "../../shared/user.service";

const defaultImage = "../../../assets/images/account.png";

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['../../passenger/passenger-account/passenger-account.component.css', './ride-history.component.css', '../../app.component.css']
})


export class RideHistoryComponent implements OnInit {
  public temp  = ""
  constructor(private notificationService : NotificationService,
              private userService : UserService) { }

  ngOnInit() {
    this.temp = ""
  }
}
