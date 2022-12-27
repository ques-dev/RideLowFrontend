import { Component } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Location} from "../../shared/model/Location";
import {MapService} from "../../shared/map/map.service";
import {RouteEstimatesRequestBody} from "../../shared/model/RouteEstimatesRequestBody";
import {RouteEstimates} from "../../shared/model/RouteEstimates";
import {HttpEvent, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-unregistered-user-main',
  templateUrl: './unregistered-user-main.component.html',
  styleUrls: ['./unregistered-user-main.component.css','../../app.component.css']
})
export class UnregisteredUserMainComponent {

}
