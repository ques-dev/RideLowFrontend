import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MapService} from "../../shared/map/map.service";
import {Subject} from "rxjs";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {RideCreated} from "../../shared/model/RideCreated";
import {NotificationService} from "../../shared/notification-service/notification.service";
import * as moment from "moment";
import {UserIdEmail} from "../../shared/model/UserIdEmail";
import {Ride} from "../../shared/model/Ride";

@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css','../../app.component.css']
})
export class PassengerHomeComponent implements OnInit{

  constructor(private mapService: MapService, private notificationService : NotificationService) {
    this.initializeWebSocketConnection();
  }
  orderClicked = false;
  ratingWindowVisible = false;
  stompClient!: Stomp.Client;
  //TODO:dobavi iz JWT-a
  currentUserId = 1;
  rides : RideCreated[] = [];
  openDetails = false;
  rideRoute = '';
  rideTotalCost = '';
  ridePricePerPerson = '';
  rideScheduleTime = '';

  ngOnInit() {
    this.mapService.setIsDriver(false);
  }
  public openRideOrderForm(){
    this.ratingWindowVisible = true;
    this.orderClicked = true;
  }

  public closeRideOrderForm(){
    this.orderClicked = false;
  }

  public closeRatingForm(){
    this.ratingWindowVisible = false;
  }

  public closeRideDetailsForm() {
    this.openDetails = false;
  }

  initializeWebSocketConnection() {
    const ws = new SockJS('http://localhost:8080/socket');
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = f => f;
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/ride-ordered/get-ride', (message: { body: string }) => {
        const ride : RideCreated = JSON.parse(message.body);
        for(const passenger of ride.passengers) {
          if(passenger.id == this.currentUserId){
            this.rides.push(ride);
            if(ride.passengers.indexOf(passenger) == ride.passengers.length - 1) break; //he is the creator of the ride
            const scheduleTime = moment(ride.scheduleTime);
            const notification : string = "Dodati ste kao putnik vožnje u " + scheduleTime.format("HH:mm") + ".";
            this.notificationService.createNotification(notification,3000);
            const departureAddress = ride.locations[0].departure.address.split(",")[0];
            const destinationAddress = ride.locations[0].destination.address.split(",")[0];
            this.rideRoute = departureAddress + " - " + destinationAddress;
            this.rideScheduleTime = scheduleTime.format("HH:mm");
            this.rideTotalCost = ride.totalCost.toString();
            this.ridePricePerPerson = (ride.totalCost / ride.passengers.length).toString();
            this.openDetails = true;
            break;
          }
        }
      });
    });
  }

}

