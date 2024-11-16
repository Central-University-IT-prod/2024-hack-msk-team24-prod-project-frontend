import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SideMenuService } from '../services/side-menu.service';
import { ProfileApiService } from '../../features/profile/services/profile-api.service';

@Component({
  selector: 'SideMenuComp',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <div class="container" #container>
      <div class="header" #header>
        <p #title>SplitIt</p>
        <div (click)="Interact()" class="hamburger" #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-panel-left">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
          </svg>
        </div>
      </div>

      <hr>

      <div class="icons" #iconsContainer>
        <a class="icon" routerLinkActive="active" routerLink="/home" [routerLinkActiveOptions]="{ exact: true }">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" focusable="false"
               aria-hidden="true">
            <path clip-rule="evenodd"
                  d="M22.146 11.146a.5.5 0 01-.353.854H20v7.5a1.5 1.5 0 01-1.5 1.5H14v-8h-4v8H5.5A1.5 1.5 0 014 19.5V12H2.207a.5.5 0 01-.353-.854L12 1l10.146 10.146Z"
                  fill-rule="evenodd"></path>
          </svg>
          <p>Домой</p>
        </a>

        <a routerLinkActive="active" class="icon" routerLink="/home/groups" [routerLinkActiveOptions]="{ exact: true }">
          <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.75C0 0.551088 0.0790176 0.360322 0.21967 0.21967C0.360322 0.0790178 0.551088 0 0.75 0H3C3.1673 4.62172e-05 3.32978 0.056026 3.4616 0.159037C3.59342 0.262048 3.68701 0.406176 3.7275 0.5685L4.335 3H21.75C21.8639 3.00003 21.9763 3.02602 22.0787 3.07598C22.1811 3.12594 22.2708 3.19857 22.3409 3.28836C22.411 3.37814 22.4598 3.48272 22.4834 3.59416C22.5071 3.7056 22.5051 3.82096 22.4775 3.9315L20.2275 12.9315C20.187 13.0938 20.0934 13.238 19.9616 13.341C19.8298 13.444 19.6673 13.5 19.5 13.5H6C5.8327 13.5 5.67022 13.444 5.5384 13.341C5.40658 13.238 5.31299 13.0938 5.2725 12.9315L2.415 1.5H0.75C0.551088 1.5 0.360322 1.42098 0.21967 1.28033C0.0790176 1.13968 0 0.948912 0 0.75ZM4.71 4.5L6.585 12H18.915L20.79 4.5H4.71ZM7.5 16.5C7.10218 16.5 6.72064 16.658 6.43934 16.9393C6.15804 17.2206 6 17.6022 6 18C6 18.3978 6.15804 18.7794 6.43934 19.0607C6.72064 19.342 7.10218 19.5 7.5 19.5C7.89782 19.5 8.27936 19.342 8.56066 19.0607C8.84196 18.7794 9 18.3978 9 18C9 17.6022 8.84196 17.2206 8.56066 16.9393C8.27936 16.658 7.89782 16.5 7.5 16.5ZM4.5 18C4.5 17.2044 4.81607 16.4413 5.37868 15.8787C5.94129 15.3161 6.70435 15 7.5 15C8.29565 15 9.05871 15.3161 9.62132 15.8787C10.1839 16.4413 10.5 17.2044 10.5 18C10.5 18.7956 10.1839 19.5587 9.62132 20.1213C9.05871 20.6839 8.29565 21 7.5 21C6.70435 21 5.94129 20.6839 5.37868 20.1213C4.81607 19.5587 4.5 18.7956 4.5 18ZM18 16.5C17.6022 16.5 17.2206 16.658 16.9393 16.9393C16.658 17.2206 16.5 17.6022 16.5 18C16.5 18.3978 16.658 18.7794 16.9393 19.0607C17.2206 19.342 17.6022 19.5 18 19.5C18.3978 19.5 18.7794 19.342 19.0607 19.0607C19.342 18.7794 19.5 18.3978 19.5 18C19.5 17.6022 19.342 17.2206 19.0607 16.9393C18.7794 16.658 18.3978 16.5 18 16.5ZM15 18C15 17.2044 15.3161 16.4413 15.8787 15.8787C16.4413 15.3161 17.2044 15 18 15C18.7956 15 19.5587 15.3161 20.1213 15.8787C20.6839 16.4413 21 17.2044 21 18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21C17.2044 21 16.4413 20.6839 15.8787 20.1213C15.3161 19.5587 15 18.7956 15 18Z" fill="white"/>
          </svg>
          <p>Группы</p>
        </a>

        <a class="icon" routerLinkActive="active" routerLink="/profile" [routerLinkActiveOptions]="{ exact: true }">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" focusable="false"
               aria-hidden="true">
            <path clip-rule="evenodd"
                  d="M12 20.5c1.894 0 3.643-.62 5.055-1.666a5.5 5.5 0 00-10.064-.105.755.755 0 01-.054.099A8.462 8.462 0 0012 20.5Zm4.079-5.189a7 7 0 012.142 2.48 8.5 8.5 0 10-12.443 0 7 7 0 0110.3-2.48ZM12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm2-12.5a2 2 0 11-4 0 2 2 0 014 0Zm1.5 0a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0Z"
                  fill-rule="evenodd"></path>
          </svg>
          <p>Вы</p>
        </a>
      </div>
    </div>
  `,
  styles: `
    .container {
      * { user-select: none; }

      width:               200px;
      height:              calc(100vh);
      background:          var(--background-secondary);
      display:             flex;
      flex-direction:      column;
      transition-duration: .3s;
      overflow:            hidden;

      @media screen and (max-width: 900px) {
        max-width: 70px;
      }

      @media screen and (max-width: 700px) {
        max-width: 0;
      }

      .header {
        height:          fit-content;
        width:           100%;
        display:         flex;
        flex-direction:  row;
        align-items:     center;
        justify-content: space-between;

        @media screen and (max-width: 900px) {
          justify-content: center;
        }

        @media screen and (max-width: 700px) {
          justify-content: space-between;
        }

        p {
          font-size:   30px;
          color:       var(--accent-color-1);
          font-weight: 600;

          @media screen and (max-width: 900px) {
            display: none;
          }

          @media screen and (max-width: 700px) {
            display: block;
          }
        }

        .hamburger {
          width:         fit-content;
          border:        1px solid var(--text-secondary);
          padding:       10px;
          border-radius: 16px;
          cursor:        pointer;
          display:       flex;
        }
      }

      .icons {
        display:        flex;
        flex-direction: column;
        gap:            10px;

        .d-none {
          display: none;
        }

        .icon {
          display:        flex;
          flex-direction: column;
          align-items:    center;
          border-radius:  16px;
          overflow:       hidden;
          padding:        5px;

          svg {
            width:     100%;
            max-width: 30px;
          }
        }

        .active {
          background: rgba(0, 0, 0, .3);
        }
      }
    }

    .container > div {
      padding: 15px;
      width:   100%;
      display: flex;

      @media screen and (max-width: 900px) {
        padding: 15px 0;
      }

      @media screen and (max-width: 700px) {
        padding: 15px;
      }
    }
  `
})
export class SideMenuComponent implements AfterViewInit {
  @ViewChild('iconsContainer') iconsContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @ViewChild('title') title!: ElementRef<HTMLParagraphElement>;
  @ViewChild('header') header!: ElementRef<HTMLDivElement>;

  constructor(
    private router: Router,
    private sideMenuService: SideMenuService,
    private profileService: ProfileApiService
  ) {
  }

  ngAfterViewInit() {
    this.sideMenuService.events$.subscribe(() => {
      if (this.sideMenuService.state) this.Open();
      else this.Close();
    });
  }

  Interact() {
    this.sideMenuService.Interact();
  }

  Open() {
    this.container.nativeElement.style.maxWidth = '100vw';
    this.title.nativeElement.style.display = 'flex';
    this.header.nativeElement.style.padding = '15px';
    this.iconsContainer.nativeElement.style.padding = '15px';
    this.header.nativeElement.style.justifyContent = 'space-between';
    const iconsChildren = this.iconsContainer.nativeElement.children;
    for (let i = 0; i < iconsChildren.length; i++) {
      const iconChildren = iconsChildren.item(i)!.children.item(0)!.children;
      iconChildren.item(1)!.classList.remove('d-none');
    }
  }

  Close() {
    if (window.innerWidth <= 700) {
      this.container.nativeElement.style.maxWidth = '0';
    } else {
      this.header.nativeElement.style.justifyContent = 'center';
      this.container.nativeElement.style.maxWidth = '70px';
      this.title.nativeElement.style.display = 'none';
      this.header.nativeElement.style.padding = '15px 0';
      this.iconsContainer.nativeElement.style.padding = '15px 0';
      const iconsChildren = this.iconsContainer.nativeElement.children;
      for (let i = 0; i < iconsChildren.length; i++) {
        const iconChildren = iconsChildren.item(i)!.children.item(0)!.children;
        iconChildren.item(1)!.classList.add('d-none');
      }
    }
  }
}
