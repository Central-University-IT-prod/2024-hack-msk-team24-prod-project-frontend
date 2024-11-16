import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { SideMenuService } from '../services/side-menu.service';
import { filter } from 'rxjs';

@Component({
  selector: 'HeaderComp',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <div class="container">
      <div class="content">
        <a routerLink="main">
          <div class="logo">
            <p class="text-3xl font-semibold text-accent-color-1">SplitIt</p>
          </div>
        </a>
      </div>
    </div>
  `,
  styleUrl: '../styles/header.component.css',
})
export class HeaderComponent {

  constructor() {
  }
}
