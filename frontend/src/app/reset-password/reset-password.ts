import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  token = '';
  newPassword = '';
  confirmPassword = '';
  errorMsg = '';
  successMsg = '';
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    if (!this.token) {
      this.errorMsg = 'Lien invalide: token manquant.';
    }
  }

  submit() {
    if (this.isSubmitting) return;
    if (!this.token) return;

    const passwordError = this.validatePassword(this.newPassword);
    if (passwordError) {
      this.errorMsg = passwordError;
      this.successMsg = '';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMsg = 'Les mots de passe ne correspondent pas.';
      this.successMsg = '';
      return;
    }

    this.isSubmitting = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.authService
      .resetPassword({
        token: this.token,
        newPassword: this.newPassword,
      })
      .subscribe({
        next: (message) => {
          this.isSubmitting = false;
          this.successMsg = message;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMsg =
            typeof err?.error === 'string'
              ? err.error
              : 'Erreur lors de la réinitialisation.';
        },
      });
  }

  private validatePassword(password: string): string | null {
    if (!password || password.length < 8) return 'Minimum 8 caractères.';
    if (!/[A-Z]/.test(password)) return 'Ajoute au moins une majuscule.';
    if (!/[a-z]/.test(password)) return 'Ajoute au moins une minuscule.';
    if (!/[0-9]/.test(password)) return 'Ajoute au moins un chiffre.';
    if (!/[!@#$%^&*]/.test(password)) return 'Ajoute un caractère spécial (!@#$%^&*).';
    return null;
  }
}
