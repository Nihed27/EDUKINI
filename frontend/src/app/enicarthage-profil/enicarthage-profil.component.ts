import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enicarthage-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enicarthage-profil.component.html',
  styleUrl: './enicarthage-profil.component.css'
})
export class EnicarthageProfilComponent {
  notes = [
    { matiere: 'Algorithmique et structures de données', note: 17 },
    { matiere: 'Programmation orientée objet',           note: 16 },
    { matiere: "Systèmes d'exploitation",                note: 15 },
    { matiere: 'Réseaux informatiques',                  note: 14 },
    { matiere: 'Électronique numérique',                 note: 13 },
    { matiere: 'Mathématiques appliquées',               note: 14 },
    { matiere: 'Bases de données',                       note: 15 },
    { matiere: 'Traitement du signal',                   note: 12 },
  ];

  preferences = {
    domainePrefer: 'logiciel',
    travailPrefer: 'conception',
    objectif: 'entreprise'
  };

  messageSucces = '';

  get moyenne() {
    const total = this.notes.reduce((s, n) => s + n.note, 0);
    return (total / this.notes.length).toFixed(1);
  }

  sauvegarder() {
    this.messageSucces = 'Profil mis à jour avec succès !';
    setTimeout(() => this.messageSucces = '', 3000);
  }
}