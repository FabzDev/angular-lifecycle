import { Component } from '@angular/core';

export interface MenuItems {
  route: string;
  name: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles:`li{ cursor: pointer; transition: 0.2s all }`
})
export class SidebarComponent {

  public menuItems: MenuItems[] = [
    { route: 'fullscreen', name: 'FullScreen' },
    { route: 'zoom-range', name: 'ZoomRange' },
    { route: 'marks', name: 'Marks' },
    { route: 'properties', name: 'Houses' },
  ]

}
