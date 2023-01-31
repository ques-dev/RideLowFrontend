import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../shared/notification-service/notification.service";
import {UserService} from "../../shared/user.service";
import {Ride} from "../model/Ride";

export interface RideShort{
  rute:string
  startEnd:string
  price:string
}

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css', '../../app.component.css']
})

export class RideHistoryComponent implements OnInit{

  public selected: RideShort | undefined
  public columns: string[]  = ["rute", "startEnd", "price"]
  public dataSource: RideShort[] = [
    {rute:"fawf", startEnd:"faga", price:"fawfae"},
    {rute:"fawdawff", startEnd:"fagaegaga", price:"faawfae"},
    {rute:"fawawgff", startEnd:"fagagea", price:"fawfdae"},
    {rute:"fawagwwaf", startEnd:"fagagea", price:"fawgfae"}]

  constructor(private notificationService : NotificationService,
              private userService : UserService) { }

  onClick(element:RideShort){
    this.selected = element
  }
  ngOnInit(): void {
    this.dataSource = [
      {rute:"fawf", startEnd:"faga", price:"fawfae"},
      {rute:"fawdawff", startEnd:"fagaegaga", price:"faawfae"},
      {rute:"fawawgff", startEnd:"fagagea", price:"fawfdae"},
      {rute:"fawagwwaf", startEnd:"fagagea", price:"fawgfae"}]
  }

  doclick() {
    alert(this.selected?.rute)
  }
}
