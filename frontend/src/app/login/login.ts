import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  loading = false;

  constructor(private router: Router, private authService: AuthService) {}

  togglePwd() {
    this.showPwd = !this.showPwd;
  }

  login() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Veuillez remplir tous les champs.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (role: string) => {
        this.loading = false;
        if (role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'STUDENT') {
          this.router.navigate(['/statut']);
        }
      },
      error: (err) => {
        this.loading = false;
        if (err.error) {
          this.errorMsg = err.error;
        } else {
          this.errorMsg = 'Erreur de connexion au serveur.';
        }
      }
    });
  }
}