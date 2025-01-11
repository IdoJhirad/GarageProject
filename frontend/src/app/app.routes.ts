import { Routes } from '@angular/router';
//omports the castume component
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorComponent } from './pages/error/error.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
/**
 * define the routs for the app
 */
export const routes: Routes = [
   
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
        ],
      },
      {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivate: [authGuard], // Protect dashboard route
        children: [
          { path: '', component: DashboardComponent },
        ],
      },
      { path: '**', component: ErrorComponent },
    ];