import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

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
  loading = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    console.log('✅ Register component chargé côté client');
  }

  togglePwd() { this.showPwd = !this.showPwd; }
  togglePwd2() { this.showPwd2 = !this.showPwd2; }

  register() {
    console.log('🔵 Bouton cliqué - register() appelé');
    console.log('Données:', this.prenom, this.nom, this.email);
    if (!this.prenom || !this.nom || !this.email || !this.password) {
      this.errorMsg = 'Veuillez remplir tous les champs.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.authService.register({
      prenom: this.prenom,
      nom: this.nom,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response: string) => {
        this.loading = false;
        this.successMsg = response;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
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