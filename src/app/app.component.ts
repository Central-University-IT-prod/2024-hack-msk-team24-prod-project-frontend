import { Component, computed, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header.component';
import { SideMenuComponent } from './core/components/side-menu.component';
import { ProfileApiService } from './features/profile/services/profile-api.service';
import { UserResponse } from '../generated';
import { SideMenuService } from './core/services/side-menu.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SideMenuComponent],
  template: `
    @if (!profile()) {
      <HeaderComp/>
      <div class="container-intro">
        <router-outlet/>
      </div>
    } @else {
      <div class="container">
        <SideMenuComp/>
        <div class="router">
          <div class="content">
            <router-outlet/>
          </div>
        </div>

        <div (click)="Interact()" class="hamburger" #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-panel-left">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
          </svg>
        </div>
      </div>
    }
  `,
  styles: `
    .container-intro {
      width: 100%;
    }
    .container {
      width:          100%;
      display:        flex;
      flex-direction: row;
      position:       relative;

      .router {
        width:      100%;
        height:     100vh;
        overflow-y: scroll;

        @media screen and (max-width: 900px) {
          padding-top: 76px;
        }

        .content {
          width:  100%;
          height: fit-content;
        }
      }

      .hamburger {
        position: absolute;
        top: 15px;
        left: 15px;
        border:        1px solid var(--text-secondary);
        padding:       10px;
        border-radius: 16px;
        display:       none;
        cursor:        pointer;

        @media screen and (max-width: 700px) {
          display: flex;
        }
      }
    }
  `
})
export class AppComponent {
  @ViewChild('icon') icon!: ElementRef<HTMLDivElement>;

  title: string = 'MoscowProdHackFrontend';
  profile;

  constructor(
    private profileService: ProfileApiService,
    private sideMenuService: SideMenuService
  ) {
    this.profile = this.profileService.currentUser;
  }

  ngAfterViewInit() {
    this.sideMenuService.events$.subscribe(() => {
      if (this.sideMenuService.state) this.Open();
      else this.Close();
    });
  }

  Open() {
    this.icon.nativeElement.style.display = 'none';
  }

  Close() {
    if (window.innerWidth <= 700)
      setTimeout(() => this.icon.nativeElement.style.display = 'flex', 300)
  }

  Interact() {
    this.sideMenuService.Interact();
  }
}
