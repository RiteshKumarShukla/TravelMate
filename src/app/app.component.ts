import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MessagingService } from './services/messaging.service';

interface Notification {
  title: string;
  body: string;
  id: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TravelMate';
  fcmToken: string | null = null;

  notifications: Notification[] = [];
  nextId = 0;

  constructor(private messagingService: MessagingService) {}

  ngOnInit(): void {
    // Get FCM token
    this.messagingService.requestPermission().then((token) => {
      this.fcmToken = token;
    });

    // Listen for messages
    this.messagingService.listenMessages().then((msg: any) => {
      const notification: Notification = {
        title: msg?.notification?.title || 'No Title',
        body: msg?.notification?.body || 'No Body',
        id: this.nextId++,
      };
      this.showNotification(notification);
    });
  }

  showNotification(notification: Notification) {
    this.notifications.push(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      this.notifications = this.notifications.filter((n) => n.id !== notification.id);
    }, 5000);
  }
}
