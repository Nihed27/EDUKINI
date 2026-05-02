import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  email = '';
  errorMsg = '';
  successMsg = '';
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  submit() {
    if (this.isSubmitting) return;

    if (!this.email || !this.email.includes('@')) {
      this.errorMsg = 'Veuillez entrer un email valide.';
      this.successMsg = '';
      return;
    }

    this.isSubmitting = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.authService
      .forgotPassword({ email: this.email.trim().toLowerCase() })
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
              : "Erreur lors de l'envoi de l'email.";
        },
      });
  }
}
