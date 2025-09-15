import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent {
  showToast = false;
  sidebarActive = false;

  constructor(private router: Router) { }

  logout() {

    localStorage.clear();

    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
      this.router.navigate(['/']);
    }, 1200);
  }

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  closeSidebar() {
    this.sidebarActive = false;
  }

  // Close sidebar when clicking outside on mobile
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.querySelector('.sidebar-toggle');

    if (window.innerWidth <= 768 && this.sidebarActive) {
      if (!sidebar?.contains(target) && !toggle?.contains(target)) {
        this.sidebarActive = false;
      }
    }
  }

  // Close sidebar on window resize to desktop size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 768) {
      this.sidebarActive = false;
    }
  }
}
