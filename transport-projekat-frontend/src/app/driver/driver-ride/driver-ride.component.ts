import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "../../shared/model/Location";
import {MapService} from "../../shared/map/map.service";
import {DriverService} from "../driver.service";

@Component({
  selector: 'app-driver-ride',
  templateUrl: './driver-ride.component.html',
  styleUrls: ['../../passenger/ride-estimates/ride-estimates.component.css', './driver-ride.component.css', '../../app.component.css']
})
export class DriverRideComponent implements OnInit {
  constructor(public mapService : MapService,
              private driverService : DriverService) {
  }

  searchForm : FormGroup = new FormGroup({
    departure: new FormControl( '',{ validators: [Validators.required]}),
    destination: new FormControl('',{validators: [Validators.required]}),
  });

  @Output() chosenDeparture = new EventEmitter<Location>();
  @Output() chosenDestination = new EventEmitter<Location>();
  @Output() bothLocationsSelected = new EventEmitter<boolean>;

  rideInProgress = false;
  ngOnInit() {
    if (this.driverService.receivedRide) {
      const ride = this.driverService.currentRide;
      if (ride?.driver.id == 4) {
        this.searchForm.disable();
        this.searchForm.controls['departure'].setValue(ride?.locations[0].departure.address);
        this.searchForm.controls['destination'].setValue(ride?.locations[0].destination.address);
        this.mapService.setIsDriver(true);
        this.mapService.setDeparture(<Location>ride?.locations[0].departure);
        this.mapService.setDestination(<Location>ride?.locations[0].destination);
        this.bothLocationsSelected.emit(true);
      }
    } else {
      this.searchForm.disable();
      this.searchForm.controls['departure'].setValue('Ulica Gogoljeva 16-28, 21102, Novi Sad, Južno-Bački Okrug, Vojvodina');
      this.searchForm.controls['destination'].setValue('Ulica Sime Matavulja, 21102, Novi Sad, Južno-Bački Okrug, Vojvodina');
      this.mapService.setIsDriver(true);
      this.mapService.setDeparture(new Location("Ulica Vladimira Perića Valtera 1-3, 21102, Novi Sad, Južno-Bački Okrug, Vojvodina", 19.850956499576572,45.245972209988224));
      this.mapService.setDestination(new Location("Ulica Gogoljeva 16-28, 21102, Novi Sad, Južno-Bački Okrug, Vojvodina", 19.833455085754398, 45.24670303487374));
      this.bothLocationsSelected.emit(true);
      this.mapService.rideInProgress$.subscribe(rideInProgress => {
        this.rideInProgress = rideInProgress;
      });
    }
  }

  public drawRoute() : void{
    if(this.searchForm.valid) {
      this.bothLocationsSelected.emit(true);
    }
  }

  public accept() : void {
    this.driverService.acceptRide().subscribe({
      next: (value) => {
        this.driverService.startRide().subscribe({
          next: (value) => {
            this.mapService.setRideInProgress(true);
            this.chosenDeparture.emit(this.driverService.currentRide?.locations[0].departure);
            this.chosenDestination.emit(this.driverService.currentRide?.locations[0].destination);
            this.bothLocationsSelected.emit(true);
          },
          error: (error) => {
            console.log(error.error.message);
          }
        })
      },
      error: (error) => {
        console.log(error.error.message);
      }
    });
  }

  public deny() : void {
    this.mapService.setRideDenied(true);
  }

  public finish(): void {
    this.driverService.endRide().subscribe({
      next: (value) => {
        this.mapService.setRideInProgress(false);
        this.mapService.setRideReceived(false);
      },
      error: (error) => {
        console.log(error.error.message);
      }
    });
  }
}
