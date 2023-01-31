import {Component} from '@angular/core';
import {NotificationService} from "../../shared/notification-service/notification.service";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css', '../../app.component.css']
})


export class RideHistoryComponent {
  constructor(private notificationService : NotificationService,
              private userService : UserService) { }
}
