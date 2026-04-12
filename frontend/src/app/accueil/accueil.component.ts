import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  rang = '127e / 4320';
  scoreGlobal = 14.8;

  matieres = [
    { nom: 'Mathématiques',           note: 16 },
    { nom: 'Physique',                note: 15 },
    { nom: 'Chimie',                  note: 14 },
    { nom: 'Français',                note: 12 },
    { nom: 'Anglais',                 note: 14 },
    { nom: "Sciences de l'ingénieur", note: 13 },
  ];

  recommandations = [
    { filiere: 'Réseaux et télécommunications', ecole: "SUP'COM", pct: 80, places: 80,  rangMin: 150 },
    { filiere: 'Intelligence artificielle',     ecole: 'INSAT',   pct: 80, places: 100, rangMin: 200 },
    { filiere: 'Génie logiciel',                ecole: 'ENSIT',   pct: 75, places: 60,  rangMin: 180 },
    { filiere: 'Génie électrique',              ecole: 'ENIT',    pct: 70, places: 90,  rangMin: 300 },
  ];

  constructor(private router: Router) {}

  postuler(r: any) {
    this.router.navigate(['/etudiant/candidatures']);
  }
}