import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProfileApiService } from '../../profile/services/profile-api.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(
    private profileService: ProfileApiService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.profileService.currentUser();
    if (user === null)
      return true;
    else {
      this.router.navigate(['/home']).then();
      return false;
    }
  }
}
