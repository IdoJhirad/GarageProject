import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  
  constructor(private authService: AuthService) {}

  onSubmit() {
    console.log('Login submitted:', this.email, this.password);
    this.authService.login(this.email, this.password)
    //the subscribe allow handle the response
    .subscribe({})
  }
}


