import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsRoutingModule } from './maps-routing.module';

import { MapsLayoutComponent } from './layouts/maps-layout/maps-layout.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MarksPageComponent } from './pages/marks-page/marks-page.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    SidebarComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarksPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
  ]
})
export class MapsModule { }
