import { CanActivateFn, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../services/loading.service';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router); 
  const snackBar = inject(MatSnackBar);
  const loadingService = inject(LoadingService);

  // Show the spinner
  loadingService.show();

  return authService.checkAuth().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true; 
      } else {
        // Show Snackbar for access denied
        console.log('Redirecting to login...');
        snackBar.open('Access denied! Please log in to view this page.', 'Close', {
          duration: 3000,
        });
        // Return a UrlTree to redirect to the login page
        return router.createUrlTree(['/login']);
      }
    }),
    catchError((error) => {
      console.error('Error during authentication check:', error);
      snackBar.open('An error occurred. Please log in again.', 'Close', {
        duration: 3000,
      });
      // Return a UrlTree to redirect to the login page on error
      return of(router.createUrlTree(['/login']));
    }),
    finalize(() => loadingService.hide())
  );
};
