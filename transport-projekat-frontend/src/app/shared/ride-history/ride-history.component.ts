import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../shared/notification-service/notification.service";
import {UserService} from "../../shared/user.service";
import {MatDialog} from "@angular/material/dialog";
import {RideHistoryDialogComponent} from "../ride-history-dialog/ride-history-dialog.component";
import {DateStartEnd} from "../model/DateStartEnd";

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

  public dates: DateStartEnd | undefined
  public selected: RideShort | undefined
  public columns: string[]  = ["rute", "startEnd", "price"]
  public dataSource: RideShort[] = [
    {rute:"fawf", startEnd:"faga", price:"fawfae"},
    {rute:"fawdawff", startEnd:"fagaegaga", price:"faawfae"},
    {rute:"fawawgff", startEnd:"fagagea", price:"fawfdae"},
    {rute:"fawagwwaf", startEnd:"fagagea", price:"fawgfae"}]

  constructor(private notificationService : NotificationService,
              private userService : UserService,
              private dialog: MatDialog) { }

  generateReport(): void{
    const dialogRef = this.dialog.open(RideHistoryDialogComponent, {data: this.dates})
  }

  ngOnInit(): void {
    this.dates = new DateStartEnd(new Date(), new Date())
    this.dataSource = [
      {rute:"fawf", startEnd:"faga", price:"fawfae"},
      {rute:"fawdawff", startEnd:"fagaegaga", price:"faawfae"},
      {rute:"fawawgff", startEnd:"fagagea", price:"fawfdae"},
      {rute:"fawagwwaf", startEnd:"fagagea", price:"fawgfae"}]
  }
}
