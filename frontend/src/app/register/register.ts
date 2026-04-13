import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  prenom = '';
  nom = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPwd = false;
  showPwd2 = false;
  errorMsg = '';
  successMsg = '';

  constructor(private router: Router, private http: HttpClient) {}

  togglePwd() { this.showPwd = !this.showPwd; }
  togglePwd2() { this.showPwd2 = !this.showPwd2; }

  register() {
    if (!this.prenom || !this.nom || !this.email || !this.password) {
      this.errorMsg = 'Veuillez remplir tous les champs.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.errorMsg = '';

    const body = {
      prenom: this.prenom,
      nom: this.nom,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:8081/api/auth/register', body, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.successMsg = 'Compte créé avec succès !';
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: (err) => {
          this.errorMsg = err.error || 'Erreur lors de l\'inscription.';
        }
      });
  }
}