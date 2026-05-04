import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, ConnectedUser } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  sidebarUser: ConnectedUser | null = null;
  displayName = '';
  initials = '?';
  roleLabel = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.loadConnectedProfile().subscribe({
      next: (u) => this.applySidebarUser(u),
      error: () => this.resetSidebarFallback()
    });
  }

  private applySidebarUser(u: ConnectedUser | null): void {
    if (!u) {
      this.resetSidebarFallback();
      return;
    }
    this.sidebarUser = u;
    const pn = (u.prenom || '').trim();
    const nn = (u.nom || '').trim();
    this.displayName = [pn, nn].filter(Boolean).join(' ') || u.email || 'Administrateur';
    const a = pn.charAt(0) || u.email.charAt(0) || '?';
    const b = nn.charAt(0) || (u.email.split('@')[0]?.charAt(0) ?? '');
    this.initials = (a + b).toUpperCase() || '?';
    this.roleLabel =
      u.role === 'ADMIN' ? 'Admin système' : u.role === 'STUDENT' ? 'Étudiant' : u.role || 'Utilisateur';
  }

  private resetSidebarFallback(): void {
    const email = this.authService.getStoredEmail();
    this.sidebarUser = null;
    this.displayName = email || 'Administrateur';
    this.initials = email ? email.substring(0, 2).toUpperCase() : '?';
    this.roleLabel =
      this.authService.getStoredRole() === 'ADMIN'
        ? 'Admin système'
        : this.authService.getStoredRole() === 'STUDENT'
          ? 'Étudiant'
          : '';
  }

  logout(ev: Event): void {
    ev.preventDefault();
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }
}