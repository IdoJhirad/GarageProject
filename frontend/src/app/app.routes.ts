import { Routes } from '@angular/router';
//omports the castume component
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorComponent } from './pages/error/error.component';
/**
 * define the routs for the app
 */
export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    //defult route will be login page 
    {path:'', redirectTo: '/login', pathMatch: 'full'},
    //every other path will be logininsted error//TODO ERROR
    { path: '**',  component:ErrorComponent } 
];
