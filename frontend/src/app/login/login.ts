import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  showPwd = false;
  errorMsg = '';
  isSubmitting = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private zone: NgZone,
    private authService: AuthService
  ) {}

  togglePwd() {
    this.showPwd = !this.showPwd;
  }

  onSubmit(event?: Event) {
    event?.preventDefault();
    this.login();
  }

login() {
  if (!this.email || !this.password) {
    this.errorMsg = 'Veuillez saisir email et mot de passe.';
    return;
  }

  this.isSubmitting = true;

  this.http.post('http://localhost:8081/api/auth/login',
    { email: this.email, password: this.password },
    { responseType: 'text' }
  ).subscribe({
    next: (role) => {
      this.isSubmitting = false;
      this.authService.setSessionAfterLogin(this.email, role);
      if (role === 'ADMIN') {
        this.router.navigate(['/dashboard-admin']);
      } else if (role === 'STUDENT') {
        this.router.navigate(['/statut']);
      } else {
        this.errorMsg = role;
      }
    },
    error: (err: HttpErrorResponse) => {
      this.isSubmitting = false;
      this.errorMsg = err.error || 'Email ou mot de passe incorrect.';
    }
  });
}

  loginWithGoogle() {
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  }
}