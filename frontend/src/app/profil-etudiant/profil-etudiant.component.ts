import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilApiService, BackendProfil } from '../services/profil-api.service';

interface Matiere {
  id: number;
  nom: string;
  note: number | null;
}

interface InfoPersonnelle {
  id: number;
  label: string;
  key: string;
  valeur: string;
}

@Component({
  selector: 'app-profil-etudiant',
  imports: [CommonModule, FormsModule],
  templateUrl: './profil-etudiant.component.html',
  styleUrl: './profil-etudiant.component.css'
})
export class ProfilEtudiantComponent implements OnInit {

  profilId: number | null = null;

  // ===================== INFOS PERSONNELLES =====================
  infos: InfoPersonnelle[] = [
    { id: 1, label: 'Nom',             key: 'nom',       valeur: '' },
    { id: 2, label: 'Prénom',          key: 'prenom',    valeur: '' },
    { id: 3, label: 'Email',           key: 'email',     valeur: '' },
    { id: 4, label: 'Adresse',         key: 'adresse',   valeur: '' },
    { id: 5, label: 'Nom de la prépa', key: 'nomPrepa',  valeur: '' },
    { id: 6, label: 'Téléphone',       key: 'telephone', valeur: '' },
  ];

  showInfosModal = false;
  infosTemp: InfoPersonnelle[] = [];

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

  // ===================== SCORE & RANG =====================
  scoreEtudiant: string = '';
  rangEtudiant: string = '';

  showScoreModal = false;
  formScoreValue = '';
  showRangModal = false;
  formRangValue = '';

  // ===================== NOTES MODAL =====================
  showModal = false;
  matiereSelectionnee: Matiere | null = null;
  formNote: number | null = null;
  formError = '';

  constructor(
    private profilApi: ProfilApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProfil();
  }

  // ===================== PROGRESSION =====================
  get progression(): number {
    let filled = 0;
    let total = 0;

    // 6 infos personnelles
    for (const info of this.infos) {
      total++;
      if (info.valeur.trim()) filled++;
    }

    // Score et rang
    total += 2;
    if (this.scoreEtudiant.trim()) filled++;
    if (this.rangEtudiant.trim()) filled++;

    // Filière sélectionnée
    total++;
    if (this.filiereSelectionnee) filled++;

    // Notes des matières (selon filière)
    if (this.filiereSelectionnee) {
      for (const m of this.matieres) {
        total++;
        if (m.note !== null) filled++;
      }
    }

    return total > 0 ? Math.round((filled / total) * 100) : 0;
  }

  // ===================== CHARGEMENT DU PROFIL =====================
  loadProfil(): void {
    this.profilApi.getAll().subscribe({
      next: (profils) => {
        if (profils.length > 0) {
          const p = profils[0];
          this.profilId = p.id ?? null;
          this.applyProfilData(p);
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.cdr.detectChanges();
      }
    });
  }

  private applyProfilData(p: BackendProfil): void {
    this.setInfoValue('nom', p.nom ?? '');
    this.setInfoValue('prenom', p.prenom ?? '');
    this.setInfoValue('email', p.email ?? '');
    this.setInfoValue('adresse', p.adresse ?? '');
    this.setInfoValue('nomPrepa', p.nomPrepa ?? '');
    this.setInfoValue('telephone', p.telephone ?? '');

    this.scoreEtudiant = p.score ? String(p.score) : '';
    this.rangEtudiant = p.rang ? String(p.rang) : '';
    this.filiereSelectionnee = p.filiere ?? '';

    if (p.notes) {
      this.applyNotesFromBackend(p.notes);
    }
  }

  private setInfoValue(key: string, valeur: string): void {
    const info = this.infos.find(i => i.key === key);
    if (info) info.valeur = valeur;
  }

  private getInfoValue(key: string): string {
    return this.infos.find(i => i.key === key)?.valeur ?? '';
  }

  private applyNotesFromBackend(notes: { [matiere: string]: number }): void {
    const allMatieres = [
      ...this.matieresCommunes,
      ...this.matieresPCSpecifiques,
      ...this.matieresPTSpecifiques
    ];
    for (const m of allMatieres) {
      m.note = notes[m.nom] !== undefined ? notes[m.nom] : null;
    }
  }

  private buildNotesMap(): { [matiere: string]: number } {
    const notesMap: { [matiere: string]: number } = {};
    const allMatieres = [
      ...this.matieresCommunes,
      ...this.matieresPCSpecifiques,
      ...this.matieresPTSpecifiques
    ];
    for (const m of allMatieres) {
      if (m.note !== null) {
        notesMap[m.nom] = m.note;
      }
    }
    return notesMap;
  }

  // ===================== SAUVEGARDE =====================
  private saveProfil(): void {
    const payload: BackendProfil = {
      nom: this.getInfoValue('nom'),
      prenom: this.getInfoValue('prenom'),
      email: this.getInfoValue('email'),
      adresse: this.getInfoValue('adresse'),
      nomPrepa: this.getInfoValue('nomPrepa'),
      telephone: this.getInfoValue('telephone'),
      rang: this.rangEtudiant ? parseInt(this.rangEtudiant, 10) : null,
      score: this.scoreEtudiant ? parseFloat(this.scoreEtudiant) : null,
      filiere: this.filiereSelectionnee,
      notes: this.buildNotesMap()
    };

    if (this.profilId !== null) {
      // Update existant
      this.profilApi.update(this.profilId, payload).subscribe({
        next: () => this.cdr.detectChanges()
      });
    } else {
      // Créer nouveau profil
      this.profilApi.create(payload).subscribe({
        next: (created) => {
          this.profilId = created.id ?? null;
          this.cdr.detectChanges();
        }
      });
    }
  }

  // ===================== INFOS PERSONNELLES =====================
  ouvrirEditionInfos() {
    this.infosTemp = this.infos.map(info => ({ ...info }));
    this.showInfosModal = true;
  }

  fermerInfosModal() {
    this.showInfosModal = false;
    this.infosTemp = [];
  }

  validerInfos() {
    this.infos = this.infosTemp.map(info => ({ ...info }));
    this.fermerInfosModal();
    this.saveProfil();
  }

  // ===================== MATIÈRES =====================
  get matieres(): Matiere[] {
    if (this.filiereSelectionnee === 'PC') return [...this.matieresCommunes, ...this.matieresPCSpecifiques];
    if (this.filiereSelectionnee === 'PT') return [...this.matieresCommunes, ...this.matieresPTSpecifiques];
    if (this.filiereSelectionnee === 'MP') return [...this.matieresCommunes];
    return [];
  }

  // ===================== SCORE =====================
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
    this.saveProfil();
  }

  // ===================== RANG =====================
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
    this.saveProfil();
  }

  // ===================== NOTES MODAL =====================
  ouvrirSaisie(m: Matiere) {
    this.matiereSelectionnee = m;
    this.formNote = m.note;
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
    this.saveProfil();
  }

  supprimerNote(m: Matiere) {
    m.note = null;
    this.saveProfil();
  }
}