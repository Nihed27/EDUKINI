import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router) {}

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
    this.router.navigate(['/login']);
  }
}