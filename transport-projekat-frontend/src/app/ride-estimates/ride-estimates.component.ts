import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-ride-estimates',
  templateUrl: './ride-estimates.component.html',
  styleUrls: ['./ride-estimates.component.css','../app.component.css']
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
  destinationSuggestions : object[] = [];
  departureSuggestions : object[] = [];

  ngOnInit() {
    this.estimatesForm.disable();
  }

  private filterToTop5Suggestions(suggestions : object[]) : object[] {
    suggestions = suggestions.slice(0,5);
    suggestions = suggestions.map((suggestion : any) => suggestion.label);
    return suggestions;
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
}
