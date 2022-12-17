import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: L.Map | undefined;

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

  ngAfterViewInit(): void {
    this.initMap();
  }
}
