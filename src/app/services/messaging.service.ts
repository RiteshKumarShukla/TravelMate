import { Injectable, inject } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MessagingService {
  private messaging = inject(Messaging);

  // Request permission & always update localStorage
  async requestPermission(): Promise<string | null> {
    try {
      const token = await getToken(this.messaging, {
        vapidKey: environment.firebase.vapidKey,
      });

      if (token) {
        localStorage.setItem('fcm_token', token); // ✅ store in localStorage
        console.log('✅ FCM Token stored/updated:', token);
      }

      return token;
    } catch (error) {
      console.error('🚫 Permission denied or error getting token:', error);
      return null;
    }
  }

  // Read token from localStorage
  getStoredToken(): string | null {
    return localStorage.getItem('fcm_token');
  }

  // Foreground messages
  listenMessages() {
    return new Promise((resolve) => {
      onMessage(this.messaging, (payload) => {
        console.log('📩 Foreground message:', payload);
        resolve(payload);
      });
    });
  }
}
