import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {Location} from "../../shared/model/Location";

@Component({
  selector: 'app-ride-estimates',
  templateUrl: './ride-estimates.component.html',
  styleUrls: ['./ride-estimates.component.css','../../app.component.css']
})
export class RideEstimatesComponent {

  isRegisteredUser = true;

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

  @Output() chosenDeparture = new EventEmitter<Location>();
  @Output() chosenDestination = new EventEmitter<Location>();
  @Output() bothLocationsSelected = new EventEmitter<boolean>;
  @Output() orderIsClicked = new EventEmitter<boolean>;

  ngOnInit() {
    this.estimatesForm.disable();
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


  async getDepartureSuggestions(){
    const top5results = await this.provider.search({query: this.searchForm.value.departure})
     .then((results: object[]) => this.filterToTop5Suggestions(results));
    this.departureSuggestions = top5results;
  }

  async getDestinationSuggestions()  {
    const top5results = await this.provider.search({query: this.searchForm.value.destination})
      .then((results: object[]) => this.filterToTop5Suggestions(results));
    this.destinationSuggestions = top5results;
  }

  public displayLabel(location : Location) : string
  {
    return location.address;
  }

  public sendLocationInputToParent(value : Location,which : string) {
    if(which == 'departure') this.chosenDeparture.emit(value);
    else this.chosenDestination.emit(value);
  }

  public drawRoute(){
      if(this.searchForm.valid) {
          this.bothLocationsSelected.emit(true);
      }
  }

  public showOrderForm() {
    this.orderIsClicked.emit(true);
  }
}
