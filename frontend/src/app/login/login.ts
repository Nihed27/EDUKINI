import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

  constructor(private router: Router, private http: HttpClient) {}

  togglePwd() { this.showPwd = !this.showPwd; }

  goStudent() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Veuillez remplir tous les champs.';
      return;
    }
    this.http.post('http://localhost:8081/api/auth/login', 
      { email: this.email, password: this.password }, 
      { responseType: 'text' }
    ).subscribe({
      next: (role) => {
        if (role === 'STUDENT') this.router.navigate(['/statut']);
        else this.errorMsg = 'Accès refusé.';
      },
      error: (err) => this.errorMsg = err.error || 'Erreur de connexion.'
    });
  }

  goAdmin() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Veuillez remplir tous les champs.';
      return;
    }
    this.http.post('http://localhost:8081/api/auth/login',
      { email: this.email, password: this.password },
      { responseType: 'text' }
    ).subscribe({
      next: (role) => {
        if (role === 'ADMIN') this.router.navigate(['/dashboard-admin']);
        else this.errorMsg = 'Accès refusé.';
      },
      error: (err) => this.errorMsg = err.error || 'Erreur de connexion.'
    });
  }
}