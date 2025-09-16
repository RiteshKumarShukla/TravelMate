import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule],
})
export class DashboardComponent {
  showToast = false;

  constructor(private router: Router) {}

  logout() {
    if (typeof window !== 'undefined' && !!window.localStorage) {
      localStorage.clear();
    }

    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
      this.router.navigate(['/']);
    }, 600);
  }
}
