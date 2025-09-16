import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isBrowser = typeof window !== 'undefined' && !!window.localStorage;
    const loggedIn = isBrowser ? !!localStorage.getItem('user') : false;

    if (!loggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
