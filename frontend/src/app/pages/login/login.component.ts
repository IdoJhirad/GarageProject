import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
//import the auth service fot auth realted api calls
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email='';
  password = '';
  
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Login submitted:', this.email, this.password);
    this.authService.login(this.email, this.password)
    //the subscribe allow handle the response thats start the hhtp request
    .subscribe({
      //if sucsess
      next: (response) => {
        console.log('Login successful:', response);
        //save the name on local storage
        localStorage.setItem('userName', response.user.name);
        //navigate to dashbord
        this.router.navigate(['/dashboard']);
      },
      //if fail
      error: (err)=>{
        //TOFIX
        const errorMessage = err.error?.message || 'Login failed. Please try again.';
        alert(errorMessage);
        this.router.navigate(['/login']);
      }
    })
  }
}


