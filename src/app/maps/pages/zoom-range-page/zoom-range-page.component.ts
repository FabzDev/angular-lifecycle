import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'maplibre-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: 'zoom-range-page.css'
})
export class ZoomRangePageComponent implements AfterViewInit{

  map?: Map;

  @ViewChild('mapa')
  private mapContainer!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const initialState = { lng: -75.46171, lat: 10.39161, zoom: 14 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=vDOrj6jFitb3t7hjxI2N`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
  }

}
