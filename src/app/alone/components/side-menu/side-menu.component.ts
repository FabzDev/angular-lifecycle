import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface MenuItems {
  route: string;
  name: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
    public menuItems: MenuItems[] = [
      { route: 'fullscreen', name: 'FullScreen' },
      { route: 'zoom-range', name: 'ZoomRange' },
      { route: 'marks', name: 'Marks' },
      { route: 'properties', name: 'Houses' },
    ]
}
