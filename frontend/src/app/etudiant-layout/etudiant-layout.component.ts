import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, ConnectedUser } from '../services/auth.service';
import { ProfilApiService, BackendProfil } from '../services/profil-api.service';

@Component({
  selector: 'app-etudiant-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './etudiant-layout.component.html',
  styleUrl: './etudiant-layout.component.css'
})
export class EtudiantLayoutComponent implements OnInit {
  user: ConnectedUser | null = null;
  profil: BackendProfil | null = null;

  constructor(
    private authService: AuthService,
    private profilApi: ProfilApiService
  ) {}

  ngOnInit(): void {
    this.authService.loadConnectedProfile().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.profilApi.getByEtudiantId(this.user.id).subscribe({
          next: (p) => {
            this.profil = p;
          },
          error: () => {
            this.profil = null;
          }
        });
      }
    });
  }

  get initials(): string {
    if (!this.user) return 'ET';
    const first = this.user.prenom?.charAt(0) || '';
    const last = this.user.nom?.charAt(0) || '';
    return (first + last).toUpperCase() || 'ET';
  }

  get displayRank(): string {
    if (!this.profil || !this.profil.rang) return 'Non renseigné';
    return `${this.profil.rang}e`;
  }

  get displayScore(): string {
    if (!this.profil || !this.profil.score) return 'N/A';
    return String(this.profil.score);
  }
}