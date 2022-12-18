import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import {LatLngTuple} from "leaflet";

const CIRCLE_FILL_OPACITY = 0.9;
const CIRCLE_RADIUS = 20;
const FREE_CIRCLE_COLOR = '#50B214';
const TAKEN_CIRCLE_COLOR = '#FD1C1C';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css','../app.component.css']
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private takenCars: LatLngTuple[] = [[45.240174, 19.837885], [45.236360, 19.836721], [45.237863, 19.829511], [45.243302, 19.825220]];
  private freeCars: LatLngTuple[] = [[45.237002, 19.829361], [45.240477, 19.847849], [45.244125, 19.842828], [45.246484, 19.840132]];

  private locationIcon = L.icon({
    iconUrl: 'assets/images/place-marker.png',
    shadowUrl: 'assets/images/place-marker.png',
    iconRetinaUrl : 'assets/images/place-marker.png',

    iconSize:     [40, 40], // size of the icon
    shadowSize:   [0,0], // size of the shadow
    iconAnchor:   [20, 35], // point of the icon which will correspond to marker's location
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
    iconAnchor:   [15, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  });

  private startMarker: L.Marker = L.marker([45.245932, 19.850961], {
    draggable: true,
    title: 'Start',
  });
  private endMarker: L.Marker = L.marker([45.238844, 19.838659], {
    draggable: true,
    title: 'End',
  });

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 45.245932, 19.850961 ],
      zoom: 15,
      zoomControl : false,
      attributionControl : false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });

    tiles.addTo(this.map);
  }

  private initRouting(): void {
    L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: `http://router.project-osrm.org/route/v1/`
      }),
      showAlternatives: true,
      lineOptions: {
        styles: [{color: '#CF0A0A', weight: 7}],
        extendToWaypoints: true,
        missingRouteTolerance: 100
      },
      fitSelectedRoutes: false,
      altLineOptions: {
        styles: [{color: '#ed6852', weight: 7}],
        extendToWaypoints: true,
        missingRouteTolerance: 100
      },
      show: false,
      routeWhileDragging: true,
      waypoints: [
        this.startMarker.getLatLng(),
        this.endMarker.getLatLng()
      ]
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

  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = this.locationIcon;
    this.initMap();
    this.initRouting();
    this.initCars();
  }
}
