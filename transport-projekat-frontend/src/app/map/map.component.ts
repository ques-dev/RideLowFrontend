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
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private takenCars: LatLngTuple[] = [[45.240174, 19.837885], [45.236360, 19.836721], [45.237863, 19.829511], [45.243302, 19.825220]];
  private freeCars: LatLngTuple[] = [[45.237002, 19.829361], [45.240477, 19.847849], [45.244125, 19.842828], [45.246484, 19.840132]];

  private startMarker: L.Marker = L.marker([45.245932, 19.850961], {
    draggable: true,
    title: 'Start'
  });
  private endMarker: L.Marker = L.marker([45.238844, 19.838659], {
    draggable: true,
    title: 'End'
  });

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 45.245932, 19.850961 ],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
        styles: [{color: '#242c81', weight: 7}],
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
      L.circle(car, {
        color: TAKEN_CIRCLE_COLOR,
        fillColor: TAKEN_CIRCLE_COLOR,
        fillOpacity: CIRCLE_FILL_OPACITY,
        radius: CIRCLE_RADIUS
      }).addTo(this.map);
    }
  }

  private initFreeCars(): void {
    for (const car of this.freeCars) {
      L.circle(car, {
        color: FREE_CIRCLE_COLOR,
        fillColor: FREE_CIRCLE_COLOR,
        fillOpacity: CIRCLE_FILL_OPACITY,
        radius: CIRCLE_RADIUS
      }).addTo(this.map);
    }
  }

  private initCars(): void {
    this.initTakenCars();
    this.initFreeCars();
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.initRouting();
    this.initCars();
  }
}
