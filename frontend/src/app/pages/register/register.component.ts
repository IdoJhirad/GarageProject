import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router } from '@angular/router'
@Component({
  selector: 'app-register',
  imports:  [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.name, this.email, this.password)
    .subscribe({
      //on sucsess
      next: (response) => {
        alert('Registration successful! You can now log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'somthing wnt wrong please try again later';
        alert(errorMessage)
      }
    })
  }
}
