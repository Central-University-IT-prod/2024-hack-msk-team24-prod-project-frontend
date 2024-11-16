import { Injectable } from '@angular/core';
import { filter, Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  public observer = new Subject();
  public events$ = this.observer.asObservable();
  public state: boolean = window.innerWidth>900;

  constructor(
    private router: Router
  ) {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
    });
  }

  Interact() {
    this.state = !this.state;
    this.observer.next({});
  }
}
