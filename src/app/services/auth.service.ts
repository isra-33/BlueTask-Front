import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  // Login method
  login(credentials: { username: string; password: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' });
  }

  // Register method
  signIn(newUser: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, newUser);
  }

  // Store JWT token in session storage
  storeToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }

  // Get JWT token from session storage
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null; // If a token exists, the user is authenticated
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
  }
}
