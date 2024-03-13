import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Map, Marker } from 'maplibre-gl'

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: `mini-map.component.css`
})
export class MiniMapComponent implements AfterViewInit, OnDestroy{

  public minimap?: Map;
  @ViewChild('minimap')
  public mapContainer!: ElementRef<HTMLElement>;

  @Input() lnglat?: [number, number]

  ngAfterViewInit(): void {
    this.minimap = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=vDOrj6jFitb3t7hjxI2N`,
      center: this.lnglat,
      zoom: 12
    })

    if(!this.minimap) throw Error('El mapa no puede ser null')
    if(!this.lnglat) throw Error('Lnglat no puede ser null')
    const marker = new Marker()
    .setLngLat(this.lnglat)
    .addTo(this.minimap)

  }

  ngOnDestroy(): void {
    this.minimap?.remove()
  }

}
