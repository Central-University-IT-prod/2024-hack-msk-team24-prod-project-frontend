import { Routes } from '@angular/router';
import { IntroGuard } from './features/intro/guards/intro.guard';
import { inject } from '@angular/core';
import { ProfileApiService } from './features/profile/services/profile-api.service';
import { map } from 'rxjs';

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./features/intro/intro.routes"),
    canActivate: [IntroGuard]
  },
  {
    path: "auth",
    loadChildren: () => import("./features/auth/auth.routes"),
    canActivate: [
      () => inject(ProfileApiService).notAuthenticated(),
    ]
  },
  {
    path: "home",
    loadChildren: () => import("./features/main/main.routes"),
    canActivate: [
      () => inject(ProfileApiService).isAuthenticated(),
    ]
  },
  {
    path: "profile",
    loadChildren: () => import("./features/profile/profile.routes"),
    canActivate: [
      () => inject(ProfileApiService).isAuthenticated(),
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
