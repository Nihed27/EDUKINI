import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  prenom: string;
  nom: string;
  email: string;
  password: string;
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

  constructor(private http: HttpClient) {}

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
