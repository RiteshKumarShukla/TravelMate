import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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

  dropdownOpen = false;
  isEditProfileOpen = false;

  editUser = {
    id: 0,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  constructor(private router: Router, private userService: UserService) { }

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
          this.editUser = {
            id: user?.id || 0,
            name: user?.name || '',
            email: user?.email || '',
            password: '',
            password_confirmation: ''
          };
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

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  openEditProfile() {
    this.isEditProfileOpen = true;
    this.dropdownOpen = false;
  }

  closeEditProfile() {
    this.isEditProfileOpen = false;
  }

  saveProfile() {
    this.userService.updateUserProfile(this.editUser).subscribe({
      next: (res) => {
        this.logout();
        console.log('Profile updated:', res);
      },
      error: (err) => {
        console.error('Update failed:', err);
      }
    });

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
