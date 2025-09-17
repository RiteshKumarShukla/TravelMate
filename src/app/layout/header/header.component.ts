import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [FormsModule, CommonModule]
})
export class HeaderComponent implements OnInit {
  showToast = false;
  userName: string = 'Agent';
  greeting: string = '';
  timeEmoji: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUser();
    this.setGreeting();
  }

  private loadUser() {
    if (typeof window !== 'undefined' && !!window.localStorage) {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          this.userName = user?.name || 'Agent';
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }

  private setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Good Morning';
      this.timeEmoji = '🌅';
    } else if (hour < 18) {
      this.greeting = 'Good Afternoon';
      this.timeEmoji = '☀️';
    } else {
      this.greeting = 'Good Evening';
      this.timeEmoji = '🌙';
    }
  }

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
