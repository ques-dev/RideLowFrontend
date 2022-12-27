import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {Location} from "../../shared/model/Location";
import {BehaviorSubject, Subject} from "rxjs";
import {RouteEstimates} from "../../shared/model/RouteEstimates";
import {MapService} from "../../shared/map/map.service";

@Component({
  selector: 'app-ride-estimates',
  templateUrl: './ride-estimates.component.html',
  styleUrls: ['./ride-estimates.component.css','../../app.component.css']
})
export class RideEstimatesComponent {

  isRegisteredUser = true;
  mapRoutingOnly = false;
  modeButtonText = 'Označi na mapi';
  returnedEstimates = RouteEstimates.getEmptyRouteEstimates();


  searchForm : FormGroup = new FormGroup({
    departure: new FormControl( '',{ validators: [Validators.required]}),
    destination: new FormControl('',{validators: [Validators.required]}),
  });

  estimatesForm : FormGroup = new FormGroup({
    time: new FormControl( ''),
    price: new FormControl(''),
  });

  provider = new OpenStreetMapProvider();
  destinationSuggestions : Location[] = [];
  departureSuggestions : Location[] = [];

  constructor(private mapService : MapService) { }
  ngOnInit() {
    this.estimatesForm.disable();
    this.mapService.estimates$.subscribe(estimates => this.returnedEstimates = estimates);
    this.mapService.returnEstimates$.subscribe(yes => this.fillEstimatesForm());
    this.mapService.clearMap$.subscribe(yes => {
      this.clearEstimatesForm();
      this.clearSearchForm();
    });
  }

  private mapGeoSearchObjectToLocation(geoSearchObj : any) : Location {
    const location = new Location(
      geoSearchObj.label,
      geoSearchObj.x,
      geoSearchObj.y)
    return location;
}

  private filterToTop5Suggestions(suggestions : object[]) : Location[] {
    suggestions = suggestions.slice(0,5);
    const top5 : Location[] = [];
    for(const suggestion of suggestions) {
      top5.push(this.mapGeoSearchObjectToLocation(suggestion));
    }
    return top5;
  }

  public getDepartureSuggestions() {
    setTimeout(() => this.filterDepartureSuggestions(),1000);
  }

  public getDestionationSuggestions() {
    setTimeout(() => this.filterDestinationSuggestions(),1000);
  }

  private async filterDepartureSuggestions(){
    const top5results = await this.provider.search({query: this.searchForm.value.departure})
      .then((results: object[]) => this.filterToTop5Suggestions(results));
    this.departureSuggestions = top5results;
  }

  private async filterDestinationSuggestions()  {
    const top5results = await this.provider.search({query: this.searchForm.value.destination})
      .then((results: object[]) => this.filterToTop5Suggestions(results));
    this.destinationSuggestions = top5results;
  }

  public displayLabel(location : Location) : string { return location.address; }

  public sendLocationInputToParent(value : Location,which : string) {
    if(which == 'departure') this.mapService.setDeparture(value);
    else this.mapService.setDestination(value);
  }

  public drawRoute(){
      if(this.searchForm.valid) {
          this.mapService.setDrawRouteRequest();
      }
  }

  public clearMapMarkersAndRoute() {
    this.mapService.setClearMap();
  }
  toggleMode()
  {
    if(!this.mapRoutingOnly) {
        this.disableSearch();
    }
    else this.enableSearch();
  }
  enableSearch() {
    this.modeButtonText = 'Označi na mapi';
    this.searchForm.enable();
    this.mapRoutingOnly = false;
  }

  disableSearch() {
    this.modeButtonText = 'Unesi u polja';
    this.searchForm.disable();
    this.mapService.setMapRoutingOnly();
    this.mapRoutingOnly = true;
  }

  public fillEstimatesForm() {
    this.estimatesForm.enable();
    this.estimatesForm.controls['time'].setValue(this.returnedEstimates.estimatedTimeInMinutes + " min");
    this.estimatesForm.controls['price'].setValue(this.returnedEstimates.estimatedCost + " din");
    this.estimatesForm.disable();
  }

  public clearEstimatesForm() {
    this.estimatesForm.enable();
    this.estimatesForm.controls['time'].setValue('');
    this.estimatesForm.controls['price'].setValue('');
    this.estimatesForm.disable();
  }

  public clearSearchForm() {
    this.searchForm.controls['destination'].setValue('');
    this.searchForm.controls['departure'].setValue('');
  }

}
