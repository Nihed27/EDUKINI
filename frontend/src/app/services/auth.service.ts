import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export const EDUKINI_SESSION_EMAIL_KEY = 'edukini.connectedEmail';
export const EDUKINI_SESSION_ROLE_KEY = 'edukini.connectedRole';

export interface ConnectedUser {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  prenom: string;
  nom: string;
  email: string;
  password: string;
  filiereId?: number | null;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  
  private userSubject = new BehaviorSubject<ConnectedUser | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  getStoredEmail(): string | null {
    const v = sessionStorage.getItem(EDUKINI_SESSION_EMAIL_KEY);
    return v?.trim() || null;
  }

  getStoredRole(): string | null {
    return sessionStorage.getItem(EDUKINI_SESSION_ROLE_KEY);
  }

  setSessionAfterLogin(email: string, role: string): void {
    sessionStorage.setItem(EDUKINI_SESSION_EMAIL_KEY, email.trim());
    sessionStorage.setItem(EDUKINI_SESSION_ROLE_KEY, role);
  }

  clearSession(): void {
    sessionStorage.removeItem(EDUKINI_SESSION_EMAIL_KEY);
    sessionStorage.removeItem(EDUKINI_SESSION_ROLE_KEY);
    this.userSubject.next(null);
  }

  loadConnectedProfile(): Observable<ConnectedUser | null> {
    const email = this.getStoredEmail();
    if (!email) {
      this.userSubject.next(null);
      return of(null);
    }
    if (this.userSubject.value?.email === email) {
      return of(this.userSubject.value);
    }
    return this.http.get<ConnectedUser>(`${this.apiUrl}/profile`, { params: { email } }).pipe(
      tap(user => this.userSubject.next(user))
    );
  }

  saveProfileNames(prenom: string, nom: string): Observable<ConnectedUser> {
    const email = this.getStoredEmail();
    if (!email) {
      throw new Error('Aucun utilisateur connecte');
    }
    return this.http.put<ConnectedUser>(`${this.apiUrl}/profile`, { email, prenom, nom });
  }

  login(request: LoginRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, request, { responseType: 'text' });
  }

  register(request: RegisterRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, request, { responseType: 'text' });
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/forgot-password`, request, { responseType: 'text' });
  }

  resetPassword(request: ResetPasswordRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/reset-password`, request, { responseType: 'text' });
  }
}
