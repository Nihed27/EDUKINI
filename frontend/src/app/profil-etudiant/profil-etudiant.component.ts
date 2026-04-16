import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Matiere {
  id: number;
  nom: string;
  note: number | null;
}

interface InfoPersonnelle {
  id: number;
  label: string;
  valeur: string;
}

@Component({
  selector: 'app-profil-etudiant',
  imports: [CommonModule, FormsModule],
  templateUrl: './profil-etudiant.component.html',
  styleUrl: './profil-etudiant.component.css'
})
export class ProfilEtudiantComponent {

  // ===================== INFOS PERSONNELLES =====================
  infos: InfoPersonnelle[] = [
    { id: 1, label: 'Nom',             valeur: '' },
    { id: 2, label: 'Prénom',          valeur: '' },
    { id: 3, label: 'Email',           valeur: '' },
    { id: 4, label: 'Adresse',         valeur: '' },
    { id: 5, label: 'Nom de la prépa', valeur: '' },
    { id: 6, label: 'Téléphone',       valeur: '' },
  ];

  // Modale unique pour toutes les infos personnelles
  showInfosModal = false;
  // Copie temporaire des infos pendant l'édition
  infosTemp: InfoPersonnelle[] = [];

  ouvrirEditionInfos() {
    // Cloner les infos actuelles pour édition temporaire
    this.infosTemp = this.infos.map(info => ({ ...info }));
    this.showInfosModal = true;
  }

  fermerInfosModal() {
    this.showInfosModal = false;
    this.infosTemp = [];
  }

  validerInfos() {
    // Appliquer les modifications de la copie vers les vraies infos
    this.infos = this.infosTemp.map(info => ({ ...info }));
    this.fermerInfosModal();
  }

  // Plus de méthodes individuelles (ouvrirEditionInfo, supprimerInfo) – supprimées

  // ===================== FILIÈRE & MATIÈRES =====================
  filieres = ['PC', 'PT', 'MP'];
  filiereSelectionnee: string = '';

  matieresCommunes: Matiere[] = [
    { id: 1, nom: 'Mathématiques',           note: null },
    { id: 2, nom: 'Physique',                note: null },
    { id: 3, nom: 'Chimie Générale',         note: null },
    { id: 4, nom: 'Français',                note: null },
    { id: 5, nom: 'Anglais',                 note: null },
    { id: 6, nom: "Sciences de l'ingénieur", note: null },
    { id: 7, nom: 'Informatique',            note: null },
  ];

  matieresPCSpecifiques: Matiere[] = [
    { id: 8, nom: 'Chimie Organique', note: null },
  ];

  matieresPTSpecifiques: Matiere[] = [
    { id: 9, nom: 'Conception de Fabrication Mécanique', note: null },
  ];

  get matieres(): Matiere[] {
    if (this.filiereSelectionnee === 'PC') return [...this.matieresCommunes, ...this.matieresPCSpecifiques];
    if (this.filiereSelectionnee === 'PT') return [...this.matieresCommunes, ...this.matieresPTSpecifiques];
    if (this.filiereSelectionnee === 'MP') return [...this.matieresCommunes];
    return [];
  }

  // ===================== SCORE & RANG (modifiables manuellement) =====================
  scoreEtudiant: string = '';
  rangEtudiant: string = '';

  // Modale pour le score
  showScoreModal = false;
  formScoreValue = '';

  ouvrirEditionScore() {
    this.formScoreValue = this.scoreEtudiant;
    this.showScoreModal = true;
  }

  fermerScoreModal() {
    this.showScoreModal = false;
  }

  validerScore() {
    this.scoreEtudiant = this.formScoreValue.trim();
    this.fermerScoreModal();
  }

  // Modale pour le rang
  showRangModal = false;
  formRangValue = '';

  ouvrirEditionRang() {
    this.formRangValue = this.rangEtudiant;
    this.showRangModal = true;
  }

  fermerRangModal() {
    this.showRangModal = false;
  }

  validerRang() {
    this.rangEtudiant = this.formRangValue.trim();
    this.fermerRangModal();
  }

  // ===================== NOTES (MODAL) =====================
  showModal = false;
  matiereSelectionnee: Matiere | null = null;
  formNote: number | null = null;
  formError = '';

  ouvrirSaisie(m: Matiere) {
    this.matiereSelectionnee = m;
    this.formNote  = m.note;
    this.formError = '';
    this.showModal = true;
  }

  fermerModal() {
    this.showModal = false;
    this.matiereSelectionnee = null;
  }

  enregistrerNote() {
    this.formError = '';
    if (this.formNote === null || this.formNote === undefined || String(this.formNote).trim() === '') {
      this.formError = 'Veuillez saisir une note.';
      return;
    }
    if (this.formNote < 0 || this.formNote > 20) {
      this.formError = 'La note doit être entre 0 et 20.';
      return;
    }
    if (this.matiereSelectionnee) {
      this.matiereSelectionnee.note = this.formNote;
    }
    this.showModal = false;
    this.matiereSelectionnee = null;
  }

  supprimerNote(m: Matiere) {
    m.note = null;
  }
}