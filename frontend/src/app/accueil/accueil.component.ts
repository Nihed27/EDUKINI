import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfilApiService, BackendProfil } from '../services/profil-api.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  rang = '—';
  scoreGlobal: string = '—';

  matieres: { nom: string; note: number | null }[] = [
    { nom: 'Mathématiques',           note: null },
    { nom: 'Physique',                note: null },
    { nom: 'Chimie Générale',         note: null },
    { nom: 'Français',                note: null },
    { nom: 'Anglais',                 note: null },
    { nom: "Sciences de l'ingénieur", note: null },
    { nom: 'Informatique',            note: null },
  ];

  recommandations = [
    { filiere: 'Réseaux et télécommunications', ecole: "SUP'COM", pct: 80, places: 80,  rangMin: 150 },
    { filiere: 'Intelligence artificielle',     ecole: 'INSAT',   pct: 80, places: 100, rangMin: 200 },
    { filiere: 'Génie logiciel',                ecole: 'ENSIT',   pct: 75, places: 60,  rangMin: 180 },
    { filiere: 'Génie électrique',              ecole: 'ENIT',    pct: 70, places: 90,  rangMin: 300 },
  ];

  constructor(
    private router: Router,
    private profilApi: ProfilApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProfil();
  }

  loadProfil(): void {
    this.profilApi.getAll().subscribe({
      next: (profils) => {
        if (profils.length > 0) {
          const p = profils[0];

          // Rang
          this.rang = p.rang ? `${p.rang}e` : '—';

          // Score
          this.scoreGlobal = p.score ? String(p.score) : '—';

          // Notes par matière
          if (p.notes) {
            for (const m of this.matieres) {
              m.note = p.notes[m.nom] !== undefined ? p.notes[m.nom] : null;
            }
          }
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.cdr.detectChanges();
      }
    });
  }

  postuler(r: any) {
    this.router.navigate(['/etudiant/candidatures']);
  }
}