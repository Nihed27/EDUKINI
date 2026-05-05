import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, ConnectedUser } from '../services/auth.service';
import { ProfilApiService, BackendProfil } from '../services/profil-api.service';

@Component({
  selector: "app-accueil",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./accueil.component.html",
  styleUrl: "./accueil.component.css"
})
export class AccueilComponent implements OnInit {
  user: ConnectedUser | null = null;
  profil: BackendProfil | null = null;
  matieres: any[] = [];
  recommandations: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private profilApi: ProfilApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.loadConnectedProfile().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.loadData();
      }
    });
  }

  loadData() {
    if (!this.user || !this.user.id) return;
    this.profilApi.getByEtudiantId(this.user.id).subscribe({
      next: (p) => {
        if (p) {
          this.profil = p;
          if (p.notes) {
            this.matieres = Object.entries(p.notes).map(([nom, note]) => ({
              nom,
              note
            }));
          }
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.warn("Profil non trouvé pour l'accueil.");
        this.cdr.detectChanges();
      }
    });
  }

  get displayRank(): string {
    if (this.profil && (this.profil.rang !== null && this.profil.rang !== undefined)) {
      return `${this.profil.rang}e`;
    }
    return "—";
  }

  get displayScore(): string {
    if (this.profil && (this.profil.score !== null && this.profil.score !== undefined)) {
      return String(this.profil.score);
    }
    return "—";
  }

  postuler(r: any) {
    this.router.navigate(["/etudiant/mes-ecoles"]);
  }
}

