import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { ProfileApiService } from './features/profile/services/profile-api.service';
import { register } from 'swiper/element/bundle';

export function initAuth(userService: ProfileApiService) {
  register();
  return () => ( userService.getProfile() );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [ProfileApiService],
      multi: true,
    },
  ]
};
