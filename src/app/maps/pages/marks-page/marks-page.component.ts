import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'maplibre-gl'

interface MarkerAndColor {
  color: string,
  marker: Marker
}

@Component({
  selector: 'maps-page-marks',
  templateUrl: './marks-page.component.html',
  styleUrl: 'marks-page.component.css',
})
export class MarksPageComponent {
  public map?: Map;
  public markers: MarkerAndColor[] = [];

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

    addMarker(): void {
      // const markerElementHtml = document.createElement('div');
      // markerElementHtml.innerHTML = 'Apto <br> disponible';
      const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16))
      const marker = new Marker({
        // element: markerElementHtml,
        color: color,
        draggable: true,
      })
      .setLngLat(this.map!.getCenter())
      .addTo(this.map!)

      this.markers.push({ color: color, marker: marker });

    }

    deleteMarker(index: number){
      this.markers[index].marker.remove();
      this.markers.splice(index, 1);
    }

    moveToMarker(mark: Marker){
      if (!this.map) return;
      this.map.flyTo({
        zoom: 18,
        center: mark.getLngLat(),

      })
    }
  }
