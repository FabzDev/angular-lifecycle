import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarksPageComponent } from './pages/marks-page/marks-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { MapsLayoutComponent } from './layouts/maps-layout/maps-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MapsLayoutComponent,
    children: [
      { path: 'fullscreen', component: FullScreenPageComponent},
      { path: 'marks', component: MarksPageComponent},
      { path: 'properties', component: PropertiesPageComponent},
      { path: 'zoom-range', component: ZoomRangePageComponent},
      { path: '**', redirectTo: 'fullscreen'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
