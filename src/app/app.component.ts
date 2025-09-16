import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from "./chat/chat.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ChatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TravelMate';
  showChat = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Show chat only on dashboard and tour-management pages
        const allowedRoutes = ['/dashboard', '/tours'];
        this.showChat = allowedRoutes.some(route => event.url.includes(route));
      }
    });
  }
}
