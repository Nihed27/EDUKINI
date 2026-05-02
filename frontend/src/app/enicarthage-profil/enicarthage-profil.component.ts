import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesApiService, EduNote } from '../services/notes-api.service';

@Component({
  selector: 'app-enicarthage-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enicarthage-profil.component.html',
  styleUrl: './enicarthage-profil.component.css'
})
export class EnicarthageProfilComponent implements OnInit {

  // ID étudiant (à terme depuis auth/localStorage)
  etudiantId: number = 1;

  filiere: 'informatique' | 'infotronique' | 'mecatronique' | 'industriel' = 'informatique';
  semestre: 'S1' | 'S2' = 'S1';

  filieres: any = {
    informatique: {
      S1: [
        {
          ue: 'UE1.1 — Mathématiques',
          matieres: [
            { matiere: "Mathématiques de l'ingénieur", note: null },
            { matiere: 'Analyse numérique 1', note: null },
          ]
        },
        {
          ue: 'UE1.2 — Informatique de base',
          matieres: [
            { matiere: 'Algorithmique', note: null },
            { matiere: 'Programmation', note: null },
          ]
        },
        {
          ue: 'UE1.3 — Logique & Génie logiciel',
          matieres: [
            { matiere: 'Logique formelle', note: null },
            { matiere: 'Génie logiciel', note: null },
            { matiere: "Technologies de l'information et de la communication", note: null },
          ]
        },
        {
          ue: 'UE1.4 — Électronique',
          matieres: [
            { matiere: "Circuits numériques et éléments d'architecture", note: null },
            { matiere: 'Semi-conducteurs et électronique analogique', note: null },
          ]
        },
        {
          ue: 'UE1.5 — Culture & Langues',
          matieres: [
            { matiere: "Économie de l'entreprise", note: null },
            { matiere: 'Basic english', note: null },
            { matiere: 'Culture et communication 1', note: null },
          ]
        },
      ],
      S2: [
        {
          ue: 'UE1.6 — Mathématiques avancées',
          matieres: [
            { matiere: 'Probabilités & Statistiques', note: null },
            { matiere: 'Analyse numérique 2', note: null },
            { matiere: 'Processus Stochastiques', note: null },
          ]
        },
        {
          ue: 'UE1.7 — Algorithmique avancée',
          matieres: [
            { matiere: 'Algorithmique avancée & Complexité', note: null },
            { matiere: 'Programmation orientée objet C++', note: null },
          ]
        },
        {
          ue: 'UE1.8 — Architecture & Réseaux',
          matieres: [
            { matiere: 'Architecture des ordinateurs', note: null },
            { matiere: 'Réseaux avancés & Routage', note: null },
          ]
        },
        {
          ue: "UE1.9 — Systèmes d'information",
          matieres: [
            { matiere: 'Base de données relationnelles', note: null },
            { matiere: "Analyse et conception des systèmes d'information", note: null },
            { matiere: 'Web Basics', note: null },
            { matiere: 'Projet fédérateur : Web application Builder', note: null },
          ]
        },
        {
          ue: 'UE1.10 — Culture & Langues',
          matieres: [
            { matiere: 'Théorie des organisations', note: null },
            { matiere: 'Professional english', note: null },
            { matiere: 'Culture et communication 2', note: null },
          ]
        },
      ]
    },

    infotronique: {
      S1: [
        { ue: 'Maths & systèmes', matieres: [
          { matiere: 'Maths ingénieur', note: null },
          { matiere: 'Analyse numérique', note: null }
        ]},
        { ue: 'Electronique & Info', matieres: [
          { matiere: 'Circuits électriques', note: null },
          { matiere: 'Algorithmique', note: null }
        ]}
      ],
      S2: [
        { ue: 'Systèmes embarqués', matieres: [
          { matiere: 'Systèmes embarqués', note: null },
          { matiere: 'Réseaux', note: null }
        ]}
      ]
    },

    mecatronique: {
      S1: [
        { ue: 'Fondamentaux', matieres: [
          { matiere: 'Maths ingénieur', note: null },
          { matiere: 'Probabilités', note: null }
        ]},
        { ue: 'Mécanique & Electronique', matieres: [
          { matiere: 'Mécanique', note: null },
          { matiere: 'Electronique analogique', note: null }
        ]}
      ],
      S2: [
        { ue: 'Systèmes mécatroniques', matieres: [
          { matiere: 'Robotique', note: null },
          { matiere: 'Systèmes embarqués', note: null }
        ]}
      ]
    },

    industriel: {
      S1: [
        { ue: 'Base scientifique', matieres: [
          { matiere: 'Maths', note: null },
          { matiere: 'Statistiques', note: null }
        ]},
        { ue: 'Gestion industrielle', matieres: [
          { matiere: 'Organisation industrielle', note: null },
          { matiere: 'Gestion', note: null }
        ]}
      ],
      S2: [
        { ue: 'Production', matieres: [
          { matiere: 'Lean manufacturing', note: null },
          { matiere: 'Gestion de production', note: null }
        ]}
      ]
    }
  };

  messageSucces = '';
  messageErreur = '';

  constructor(
    private notesApi: NotesApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  // ===================== CHARGEMENT =====================
  loadNotes(): void {
    this.notesApi.getNotes(this.etudiantId).subscribe({
      next: (notes) => {
        this.applyNotesFromBackend(notes);
        this.cdr.detectChanges();
      },
      error: () => {
        this.cdr.detectChanges();
      }
    });
  }

  private applyNotesFromBackend(notes: EduNote[]): void {
    for (const n of notes) {
      const filiereKey = n.filiere;
      const semestreKey = n.semestre === 1 ? 'S1' : 'S2';

      if (this.filieres[filiereKey] && this.filieres[filiereKey][semestreKey]) {
        const ues = this.filieres[filiereKey][semestreKey];
        for (const ue of ues) {
          if (ue.ue === n.ueNom) {
            const matiere = ue.matieres.find((m: any) => m.matiere === n.matiereNom);
            if (matiere) {
              matiere.note = n.note;
            }
          }
        }
      }
    }
  }

  // ===================== GETTERS =====================
  get notesActuelles() {
    return this.filieres[this.filiere][this.semestre];
  }

  get toutesLesNotes(): number[] {
    return this.notesActuelles
      .flatMap((ue: any) => ue.matieres)
      .map((m: any) => m.note)
      .filter((n: any): n is number => n !== null);
  }

  get moyenne(): string {
    const notes = this.toutesLesNotes;
    if (notes.length === 0) return '—';
    return (notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(2);
  }

  barreWidth(note: number | null): number {
    if (note === null) return 0;
    return (note / 20) * 100;
  }

  couleurBarre(note: number | null): string {
    if (note === null) return '#e2e8f0';
    if (note >= 14) return '#22c55e';
    if (note >= 10) return '#2563eb';
    return '#ef4444';
  }

  validerNote(item: any) {
    if (item.note === null) return;
    if (item.note < 0) item.note = 0;
    if (item.note > 20) item.note = 20;
  }

  supprimerNote(item: any) {
    item.note = null;
  }

  // ===================== SAUVEGARDE =====================
  sauvegarder(): void {
    const notesToSave: EduNote[] = [];

    // Parcourir TOUTES les filières et semestres pour sauvegarder toutes les notes
    for (const filiereKey of Object.keys(this.filieres)) {
      for (const semKey of ['S1', 'S2']) {
        const ues = this.filieres[filiereKey][semKey];
        if (!ues) continue;
        for (const ue of ues) {
          for (const m of ue.matieres) {
            if (m.note !== null) {
              notesToSave.push({
                etudiantId: this.etudiantId,
                filiere: filiereKey,
                semestre: semKey === 'S1' ? 1 : 2,
                ueNom: ue.ue,
                matiereNom: m.matiere,
                note: m.note
              });
            }
          }
        }
      }
    }

    // D'abord supprimer les anciennes notes, puis sauvegarder les nouvelles
    this.notesApi.deleteNotes(this.etudiantId).subscribe({
      next: () => {
        if (notesToSave.length > 0) {
          this.notesApi.saveNotes(notesToSave).subscribe({
            next: () => {
              this.messageSucces = 'Profil sauvegardé ✔️';
              this.messageErreur = '';
              this.cdr.detectChanges();
              setTimeout(() => {
                this.messageSucces = '';
                this.cdr.detectChanges();
              }, 3000);
            },
            error: () => {
              this.messageErreur = 'Erreur lors de la sauvegarde.';
              this.cdr.detectChanges();
            }
          });
        } else {
          this.messageSucces = 'Profil sauvegardé ✔️';
          this.cdr.detectChanges();
          setTimeout(() => {
            this.messageSucces = '';
            this.cdr.detectChanges();
          }, 3000);
        }
      },
      error: () => {
        this.messageErreur = 'Erreur lors de la suppression.';
        this.cdr.detectChanges();
      }
    });
  }

  // ===================== TOUT EFFACER =====================
  toutEffacer(): void {
    // Effacer côté frontend
    for (const filiereKey of Object.keys(this.filieres)) {
      for (const semKey of ['S1', 'S2']) {
        const ues = this.filieres[filiereKey][semKey];
        if (!ues) continue;
        ues.forEach((ue: any) =>
          ue.matieres.forEach((m: any) => m.note = null)
        );
      }
    }

    // Effacer côté backend
    this.notesApi.deleteNotes(this.etudiantId).subscribe({
      next: () => {
        this.messageSucces = 'Notes effacées ✔️';
        this.cdr.detectChanges();
        setTimeout(() => {
          this.messageSucces = '';
          this.cdr.detectChanges();
        }, 3000);
      }
    });
  }
}