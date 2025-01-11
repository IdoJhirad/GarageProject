import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  //dependency injection
    const authService = inject(AuthService);
    const router = inject(Router); 
    const snackBar = inject(MatSnackBar); // Inject MatSnackBar
   
    return authService.checkAuth().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true; 
        } else {
          // Show Snackbar for access denied
        snackBar.open('Access denied! Please log in to view this page.', 'Close', {
          duration: 3000,
        });
      
          router.navigate(['/login']); // Redirect to login if not authenticated
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
      })
    );
  };
  