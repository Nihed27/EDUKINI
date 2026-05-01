import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router) {}

  togglePwd() {
    this.showPwd = !this.showPwd;
  }

  goStudent() {
    this.router.navigate(['/statut']);
  }

  goAdmin() {
    this.router.navigate(['/dashboard-admin']);
  }
}