import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "../../shared/model/Location";
import {MapService} from "../../shared/map/map.service";

@Component({
  selector: 'app-driver-ride',
  templateUrl: './driver-ride.component.html',
  styleUrls: ['../../passenger/ride-estimates/ride-estimates.component.css', './driver-ride.component.css', '../../app.component.css']
})
export class DriverRideComponent {
  constructor(public mapService : MapService) {}

  searchForm : FormGroup = new FormGroup({
    departure: new FormControl( '',{ validators: [Validators.required]}),
    destination: new FormControl('',{validators: [Validators.required]}),
  });

  @Output() chosenDeparture = new EventEmitter<Location>();
  @Output() chosenDestination = new EventEmitter<Location>();
  @Output() bothLocationsSelected = new EventEmitter<boolean>;

  rideInProgress = false;

  ngOnInit() {
    this.searchForm.disable();
    this.searchForm.controls['departure'].setValue('Ulica Gogoljeva 16-28, 21102, Novi Sad, Južno-Bački Okrug, Vojvodina');
    this.searchForm.controls['destination'].setValue('Ulica Sime Matavulja, 21102, Novi Sad, Južno-Bački Okrug, Vojvodina');
    this.chosenDeparture.emit(new Location("Ulica Vladimira Perića Valtera 1-3, 21102, Novi Sad, Južno-Bački Okrug, Vojvodina", 19.850956499576572,45.245972209988224));
    this.chosenDestination.emit(new Location("Ulica Gogoljeva 16-28, 21102, Novi Sad, Južno-Bački Okrug, Vojvodina", 19.833455085754398, 45.24670303487374));
    this.bothLocationsSelected.emit(true);
    this.mapService.rideInProgress$.subscribe(rideInProgress => {
      this.rideInProgress = rideInProgress;
    });
  }

  public drawRoute() : void{
    if(this.searchForm.valid) {
      this.bothLocationsSelected.emit(true);
    }
  }

  public accept() : void {
    this.mapService.setRideInProgress(true);
  }

  public finish(): void {
    window.location.reload();
  }
}
