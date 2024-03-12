import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'maplibre-gl'

@Component({
  selector: 'maps-page-marks',
  templateUrl: './marks-page.component.html',
  styleUrl: 'marks-page.component.css',
})
export class MarksPageComponent {
  map?: Map;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(){};

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const initialState = { lng: -75.50021, lat: 10.40072, zoom: 15 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=vDOrj6jFitb3t7hjxI2N`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    const marker = new Marker({
      color: 'red'
    })
    .setLngLat(this.map.getCenter())
    .addTo(this.map)

    }

    addMarker(): Marker{
      const markerElementHtml = document.createElement('div');
      markerElementHtml.innerHTML = 'Apto <br> disponible';

      return new Marker({
        color: 'red',
        element: markerElementHtml,
      })
      .setLngLat(this.map!.getCenter())
      .addTo(this.map!)
    }
  }
