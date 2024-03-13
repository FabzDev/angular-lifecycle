import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Map, Marker } from 'maplibre-gl';


interface MarkerAndColor {
  marker: Marker;
  color: string;
}

interface CoordinateAndColor {
  lnglat: [number, number];
  color: string;
}


@Component({
  selector: 'maps-page-marks',
  templateUrl: './marks-page.component.html',
  styleUrl: 'marks-page.component.css',
})
export class MarksPageComponent implements AfterViewInit, OnDestroy{
  public map?: Map;
  public markersAndColors: MarkerAndColor[] = [];
  public coordinatesAndColors: CoordinateAndColor[] = [];
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor() {}


  ngOnInit(): void {
    this.readCoordsFromLS();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  ngAfterViewInit(): void {
    const initialState = { lng: -75.50021, lat: 10.40072, zoom: 15 };
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=vDOrj6jFitb3t7hjxI2N`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    new Marker({
      color: 'red',
    })
      .setLngLat(this.map.getCenter())
      .addTo(this.map);

    this.buildMarkers();

  }

  addMarker(): void {
    if (!this.map) throw Error('Mapa no encontrado');
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const currentCoordinates = this.map.getCenter().toArray();
    this.createNewMarker({ lnglat: currentCoordinates, color: color });
    this.writeLocalStorage();
  }

  createNewMarker(coordAndColor: CoordinateAndColor): void {
    const newMarker = new Marker({
      color: coordAndColor.color,
      draggable: true,
    })
    .setLngLat(coordAndColor.lnglat)
    .addTo(this.map!);
    newMarker.on('dragend', () => { this.writeLocalStorage(); console.log('action');
     })
    this.markersAndColors.push({marker: newMarker, color: coordAndColor.color})
  }

  writeLocalStorage() {
    this.coordinatesAndColors = [];
    this.markersAndColors.forEach(({ marker, color }) => {
      this.coordinatesAndColors.push({
        lnglat: marker.getLngLat().toArray(),
        color: color,
      });
    });
    localStorage.setItem(
      'coordinatesAndColors',
      JSON.stringify(this.coordinatesAndColors)
    );
    console.log( localStorage.getItem('coordinatesAndColors') );
  }

  deleteMarker(index: number) {
    this.markersAndColors[index].marker.remove();
    this.markersAndColors.splice(index, 1);
    this.writeLocalStorage();
  }

  readCoordsFromLS() {
    this.coordinatesAndColors = JSON.parse(
      localStorage.getItem('coordinatesAndColors') ?? '[]'
    );
  }

  buildMarkers(): void {
    this.coordinatesAndColors.forEach(({ lnglat, color }) => this.createNewMarker({ lnglat, color }));
  }

  moveToMarker(mark: Marker) {
    if (!this.map) return;
    this.map.flyTo({
      zoom: 18,
      center: mark.getLngLat(),
    });
  }
}
