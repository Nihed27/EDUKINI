import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FiliereApiService, BackendFiliere } from '../services/filiere-api.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  prenom = '';
  nom = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPwd = false;
  showPwd2 = false;
  errorMsg = '';
  isSubmitting = false;
  filieresOptions: BackendFiliere[] = [];
  filiereId: number | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private filiereApi: FiliereApiService,
  ) {}

  ngOnInit(): void {
    this.filiereApi.getAll().subscribe({
      next: (list) => {
        this.filieresOptions = list.filter((f) => f.id != null && f.actif !== false);
      },
      error: () => {
        this.filieresOptions = [];
      },
    });
  }

  togglePwd() { this.showPwd = !this.showPwd; }
  togglePwd2() { this.showPwd2 = !this.showPwd2; }

  register() {
    if (this.isSubmitting) return;

    if (!this.prenom || !this.nom || !this.email || !this.password) {
      this.errorMsg = 'Veuillez remplir tous les champs.';
      return;
    }

    const passwordValidationError = this.validatePassword(this.password);
    if (passwordValidationError) {
      this.errorMsg = passwordValidationError;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.errorMsg = '';
    this.isSubmitting = true;

    this.authService
      .register({
        prenom: this.prenom.trim(),
        nom: this.nom.trim(),
        email: this.email.trim().toLowerCase(),
        password: this.password,
        ...(this.filiereId != null ? { filiereId: this.filiereId } : {}),
      })
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMsg =
            typeof err?.error === 'string'
              ? err.error
              : "Erreur lors de l'inscription. Réessaie.";
        },
      });
  }

  loginWithGoogle() {
    // Rediriger vers l'API OAuth2 Google
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  }

  validatePassword(password: string): string | null {
    if (password.length < 8) {
      return 'Mot de passe invalide: minimum 8 caractères.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Mot de passe invalide: ajoute au moins une majuscule.';
    }
    if (!/[a-z]/.test(password)) {
      return 'Mot de passe invalide: ajoute au moins une minuscule.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Mot de passe invalide: ajoute au moins un chiffre.';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Mot de passe invalide: ajoute au moins un caractère spécial (!@#$%^&*).';
    }
    return null;
  }
}