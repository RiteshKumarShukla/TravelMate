import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;  // Base URL from environment

  constructor(private http: HttpClient) { }

  // Automatically attach FCM token from localStorage
  login(credentials: { email: string; password: string }): Observable<any> {
    const device_id = localStorage.getItem('fcm_token') || ''; // ✅ get token from localStorage

    const payload = {
      ...credentials,
      device_id // ✅ attach to payload
    };

    return this.http.post(`${this.apiUrl}/login`, payload);
  }
}
