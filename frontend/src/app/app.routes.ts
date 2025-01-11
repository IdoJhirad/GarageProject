import { Routes } from '@angular/router';
//omports the castume component
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorComponent } from './pages/error/error.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
/**
 * define the routs for the app
 */
export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    //TODO protected route
    {path: 'dashboard', component: DashboardComponent},
    //defult route will be login page 
    {path:'', redirectTo: '/login', pathMatch: 'full'},
    //every other path will be logininsted error//TODO ERROR
    { path: '**',  component:ErrorComponent } 
];
