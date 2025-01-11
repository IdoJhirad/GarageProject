import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, map, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../services/loading.service'; // Import LoadingService
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const authGuard: CanActivateFn = (route, state) => {
  //dependency injection
    const authService = inject(AuthService);
    const router = inject(Router); 
    const snackBar = inject(MatSnackBar); // Inject MatSnackBar
    const loadingService = inject(LoadingService); //loaing spinner

  //show the spinner
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
      
        setTimeout(() => {
          router.navigate(['/login']);
        }, 500); // Delay of 500ms
        return false;
        }
      }),
      catchError((error) => {
        console.error('Error during authentication check:', error);
        snackBar.open('An error occurred. Please log in again.', 'Close', {
          duration: 3000,
        });
        router.navigate(['/login']); 
        return [false];
      }),
      //
      finalize(() => loadingService.hide())
    );
  };
  