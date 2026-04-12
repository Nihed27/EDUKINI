import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-etudiant',
  imports: [CommonModule],
  templateUrl: './profil-etudiant.component.html',
  styleUrl: './profil-etudiant.component.css'
})
export class ProfilEtudiantComponent {
  matieres = [
    { nom: 'Mathématiques', note: 16 },
    { nom: 'Physique',       note: 15 },
    { nom: 'Chimie',         note: 14 },
    { nom: 'Français',       note: 12 },
    { nom: 'Anglais',        note: 14 },
    { nom: "Sciences de l'ingénieur", note: 13 },
  ];
}