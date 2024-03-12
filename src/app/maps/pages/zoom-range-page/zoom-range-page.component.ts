import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Map } from 'maplibre-gl';

@Component({
  selector: 'maps-zoom-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: 'zoom-range-page.css',
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  public map?: Map;
  public currentState: {lng: number, lat: number, zoom: number};

  constructor(){ this.currentState = { lng: -75.46171, lat: 10.39161, zoom: 14 }; }

  @ViewChild('mapa')
  private mapContainer!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=vDOrj6jFitb3t7hjxI2N`,
      center: [this.currentState.lng, this.currentState.lat],
      zoom: this.currentState.zoom,
    });

    this.callMapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  callMapListeners(): void {
    if (!this.map) throw new Error('No hay Mapa');

    this.map.on('zoom', (ev) => {
      this.currentState.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 1)  this.map!.zoomTo(1);
      if (this.map!.getZoom() > 20)  this.map!.zoomTo(20);
    });

    this.map.on('move', (ev) => {
      this.currentState.lat = this.map!.getCenter().lat;
      this.currentState.lng = this.map!.getCenter().lng;

    });
  }

  zoomIn(): void {
    this.map!.zoomIn();
  }

  zoomOut(): void {
    this.map!.zoomOut();
  }

  changeZoomWithBar(barZoomValue: string) {
    if (!this.map) throw new Error('No hay mapa de nuevo');
    this.map.setZoom(Number(barZoomValue));
  }
}
