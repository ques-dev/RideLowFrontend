import {AfterViewInit, Component, Input} from '@angular/core';
import * as L from 'leaflet';
import {LatLngTuple} from 'leaflet';
import 'leaflet-routing-machine';
import {Location} from "../model/Location";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {MapService} from "./map.service";

const reverseGeocodeUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css','../../app.component.css'],
  providers: [MapService]
})

export class MapComponent implements AfterViewInit {

  constructor(private http: HttpClient) {}
  private map!: L.Map;
  private takenCars: LatLngTuple[] = [[45.240174, 19.837885], [45.236360, 19.836721], [45.237863, 19.829511], [45.243302, 19.825220]];
  private freeCars: LatLngTuple[] = [[45.237002, 19.829361], [45.240477, 19.847849], [45.244125, 19.842828], [45.246484, 19.840132]];
  private carMarker!: L.Marker;

  @Input()  departure : BehaviorSubject<Location> = new BehaviorSubject<Location>(Location.getEmptyLocation());
  @Input()  destination : BehaviorSubject<Location> = new BehaviorSubject<Location>(Location.getEmptyLocation());
  @Input() passenger : Subject<boolean> = new Subject<boolean>();
  @Input() displayCar = false;

  private locationIcon = L.icon({
    iconUrl: 'assets/images/place-marker.png',
    shadowUrl: 'assets/images/place-marker.png',
    iconRetinaUrl : 'assets/images/place-marker.png',

    iconSize:     [40, 40], // size of the icon
    shadowSize:   [0,0], // size of the shadow
    iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  });

  private vehicleFreeIcon = L.icon({
    iconUrl: 'assets/images/vehicle-green.png',
    shadowUrl: 'assets/images/vehicle-green.png',
    iconRetinaUrl : 'assets/images/vehicle-green.png',

    iconSize:     [25, 25], // size of the icon
    shadowSize:   [0,0], // size of the shadow
    iconAnchor:   [15, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  });

  private vehicleReservedIcon = L.icon({
    iconUrl:'assets/images/vehicle-red.png',
    shadowUrl: 'assets/images/vehicle-red.png',
    iconRetinaUrl : 'assets/images/vehicle-red.png',

    iconSize:     [25, 25], // size of the icon
    shadowSize:   [0,0], // size of the shadow
    iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  });

  private driverIcon = L.icon({
    iconUrl: 'assets/images/car.png',
    shadowUrl: 'assets/images/car.png',
    iconRetinaUrl : 'assets/images/car.png',

    iconSize:     [35, 35], // size of the icon
    shadowSize:   [0,0], // size of the shadow
    iconAnchor:   [35, 35], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 45.245932, 19.850961 ],
      zoom: 15,
      zoomControl : false,
      attributionControl : false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3,
    });

    tiles.addTo(this.map);
  }

  private makeMarker(location : Location) : L.Marker {
    return L.marker([location.latitude, location.longitude], {
    draggable: true,
  });
  }

  private drawRoute(departure : Location, destination : Location, passenger : boolean) : void {
    L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: `http://router.project-osrm.org/route/v1/`
      }),
      showAlternatives: false,
      lineOptions: {
        styles: [{color: '#CF0A0A', weight: 7}],
        extendToWaypoints: true,
        missingRouteTolerance: 100
      },
      fitSelectedRoutes: false,
      show: true,
      routeWhileDragging: true,
      // waypoints: [
      //   this.makeMarker(departure).getLatLng(),
      //   this.makeMarker(destination).getLatLng()
      // ],
      plan: L.Routing.plan([
          this.makeMarker(departure).getLatLng(),
          this.makeMarker(destination).getLatLng()
      ], {
        draggableWaypoints: passenger,
        createMarker: function(i: number, waypoint: any, n: number) {
          if (i == 0 && !passenger) {
            return L.marker(waypoint.latLng, {
              icon: L.icon({
                iconUrl: 'assets/images/car.png',
                shadowUrl: 'assets/images/car.png',
                iconRetinaUrl: 'assets/images/car.png',

                iconSize: [35, 35], // size of the icon
                shadowSize: [0, 0], // size of the shadow
                iconAnchor: [35, 35], // point of the icon which will correspond to marker's location
                shadowAnchor: [0, 0],  // the same for the shadow
                popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
              }),
            });
          }
          return L.marker(waypoint.latLng);
        }
      })
    }).addTo(this.map);
  }

  private initTakenCars(): void {
    for (const car of this.takenCars) {
      L.marker(car, {
        draggable: false,
        icon: this.vehicleReservedIcon
      }).addTo(this.map);
    }
  }

  private initFreeCars(): void {
    for (const car of this.freeCars) {
      L.marker(car, {
        draggable: false,
        icon: this.vehicleFreeIcon
      }).addTo(this.map);
    }
  }

  private initCars(): void {
    this.initTakenCars();
    this.initFreeCars();
  }

  private initReverseGeocoding(): void {
    this.map.on('click', (ev) => {
      const latlng = this.map.mouseEventToLatLng(ev.originalEvent);
      console.log(latlng.lat + ', ' + latlng.lng);
      const locationUrl = reverseGeocodeUrl + latlng.lng + "," + latlng.lat + "&f=pjson";
      this.http.get(locationUrl).subscribe((response: any) => {
        console.log(response.address);
      });
    });
  }

  private initDriverCar(): void {
    this.carMarker = L.marker(this.map.getCenter(), {
      draggable: false,
      icon: this.driverIcon
    }).addTo(this.map);
  }

  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = this.locationIcon;
    this.initMap();
    this.initCars();
    this.initReverseGeocoding();
    if (this.displayCar) {
      this.initDriverCar();
    }
    // this.destination.subscribe(location => {
    //   this.drawMarker(location);
    // });
    // this.departure.subscribe(location => {
    //   this.drawMarker(location);
    // });
    this.passenger.subscribe(yes => {
      this.drawRouteBetweenSelectedLocations(yes);
    });
  }
  // public drawMarker(location : Location)
  // {
  //   this.makeMarker(location, true).addTo(this.map);
  // }

  public drawRouteBetweenSelectedLocations(passenger : boolean)
  {
    if (this.carMarker != null) {
      this.carMarker.remove();
    }
    this.drawRoute(this.departure.getValue(), this.destination.getValue(), passenger);
  }
}
