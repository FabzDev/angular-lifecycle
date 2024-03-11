import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'maplibre-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: 'zoom-range-page.css',
})
export class ZoomRangePageComponent implements AfterViewInit {
  public map?: Map;
  public currentZoom: number = 10;

  @ViewChild('mapa')
  private mapContainer!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const initialState = { lng: -75.46171, lat: 10.39161, zoom: 14 };
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=vDOrj6jFitb3t7hjxI2N`,
      center: [initialState.lng, initialState.lat],
      zoom: this.currentZoom,
    });

    this.callMapListeners();
  }

  callMapListeners(): void {
    if (!this.map) {
      throw new Error('No hay Mapa');
    }

    this.map.on('zoom', (ev) => {
      this.currentZoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 1)  {
        this.map!.zoomTo(1);
      }
      if (this.map!.getZoom() > 20)  {
        this.map!.zoomTo(20);
      }
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
