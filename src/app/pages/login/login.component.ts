import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  login() {
    this.loading = true;
    this.error = '';

    // ✅ Hardcoded admin login (no API call)
    if (
      this.email === 'riteshshuklagem@gmail.com' &&
      this.password === 'admin123'
    ) {
      setTimeout(() => {
        this.loading = false;
        localStorage.setItem('user', this.email);
        this.router.navigate(['/dashboard']);
      }, 1200);
      return;
    }

    // ✅ Else: Make real API call
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Login success:', response);

        // Store token (adjust key if backend sends differently)
        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        localStorage.setItem('user', this.email);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Login failed:', err);
        this.error = err.error?.message || 'Invalid email or password!';
      },
    });
  }
}
