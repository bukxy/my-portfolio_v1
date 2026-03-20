import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;
  isAuthenticated = signal(false);

  public setAccessToken(token: string): void {
    this.accessToken = token;
    this.isAuthenticated.set(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public removeAccessToken(): void {
    this.accessToken = null;
    this.isAuthenticated.set(false);
    localStorage.removeItem('isLoggedIn');
  }
}
