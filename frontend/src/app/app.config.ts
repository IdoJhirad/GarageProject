import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), // Improves change detection performance
              provideRouter(routes),// Configures routing for the app using standalone APIs
              provideClientHydration(withEventReplay()),// Adds hydration for server-side rendering (if used)
              provideHttpClient()] 
};
