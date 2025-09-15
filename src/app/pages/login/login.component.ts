import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router) { }

  login() {
    this.loading = true;
    this.error = '';

    setTimeout(() => {
      this.loading = false;
      this.error = '';
      if (this.email === 'riteshshuklagem@gmail.com' && this.password === 'admin123') {
        localStorage.setItem('user', this.email);
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Invalid email or password!';
      }
    }, 1200);
  }
}
