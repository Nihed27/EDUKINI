import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environements/environement';

const GROQ_API_KEY = environment.groqApiKey;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface IAResultat {
  specialite: string;
  explication: string;
  scores: { nom: string; score: number }[];
}

@Component({
  selector: 'app-enicarthage-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enicarthage-profil.component.html',
  styleUrl: './enicarthage-profil.component.css'
})
export class EnicarthageProfilComponent {

  constructor(private http: HttpClient) {}

  filiere: 'informatique' | 'infotronique' | 'mecathronique' | 'industriel' = 'informatique';
  semestre: 'S1' | 'S2' = 'S1';

  filieres: any = {
    informatique: {
      S1: [
        { ue: 'UE1.1 — Mathématiques', matieres: [
          { matiere: "Mathématiques de l'ingénieur", note: null },
          { matiere: 'Analyse numérique 1', note: null },
        ]},
        { ue: 'UE1.2 — Informatique de base', matieres: [
          { matiere: 'Algorithmique', note: null },
          { matiere: 'Programmation', note: null },
        ]},
        { ue: 'UE1.3 — Logique & Génie logiciel', matieres: [
          { matiere: 'Logique formelle', note: null },
          { matiere: 'Génie logiciel', note: null },
          { matiere: "Technologies de l'information et de la communication", note: null },
        ]},
        { ue: 'UE1.4 — Électronique', matieres: [
          { matiere: "Circuits numériques et éléments d'architecture", note: null },
          { matiere: 'Semi-conducteurs et électronique analogique', note: null },
        ]},
        { ue: 'UE1.5 — Culture & Langues', matieres: [
          { matiere: "Économie de l'entreprise", note: null },
          { matiere: 'Basic english', note: null },
          { matiere: 'Culture et communication 1', note: null },
        ]},
      ],
      S2: [
        { ue: 'UE1.6 — Mathématiques avancées', matieres: [
          { matiere: 'Probabilités & Statistiques', note: null },
          { matiere: 'Analyse numérique 2', note: null },
          { matiere: 'Processus Stochastiques', note: null },
        ]},
        { ue: 'UE1.7 — Algorithmique avancée', matieres: [
          { matiere: 'Algorithmique avancée & Complexité', note: null },
          { matiere: 'Programmation orientée objet C++', note: null },
        ]},
        { ue: 'UE1.8 — Architecture & Réseaux', matieres: [
          { matiere: 'Architecture des ordinateurs', note: null },
          { matiere: 'Réseaux avancés & Routage', note: null },
        ]},
        { ue: "UE1.9 — Systèmes d'information", matieres: [
          { matiere: 'Base de données relationnelles', note: null },
          { matiere: "Analyse et conception des systèmes d'information", note: null },
          { matiere: 'Web Basics', note: null },
          { matiere: 'Projet fédérateur : Web application Builder', note: null },
        ]},
        { ue: 'UE1.10 — Culture & Langues', matieres: [
          { matiere: 'Théorie des organisations', note: null },
          { matiere: 'Professional english', note: null },
          { matiere: 'Culture et communication 2', note: null },
        ]},
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

    mecathronique: {
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

  specialitesParFiliere: Record<string, string[]> = {
    informatique:  ['Intelligence Artificielle', 'Sécurité informatique', 'Génie logiciel'],
    infotronique:  ['Systèmes embarqués', 'Électronique avancée', 'IoT & Connectivité'],
    mecathronique: ['Robotique', 'Automatisme industriel', 'Systèmes mécatroniques'],
    industriel:    ['Gestion de production', 'Lean & Qualité', 'Logistique industrielle'],
  };

  // ── IA State ──
  iaLoading  = false;
  iaResultat: IAResultat | null = null;
  iaErreur   = '';
  private iaTimer: any = null;

  messageSucces = '';
  messageErreur = '';

  // ── Getters ──
  get notesActuelles() {
    return this.filieres[this.filiere][this.semestre];
  }

  get toutesLesNotesAvecMatiere(): { matiere: string; note: number }[] {
    return this.notesActuelles
      .flatMap((ue: any) => ue.matieres)
      .filter((m: any): m is { matiere: string; note: number } => m.note !== null);
  }

  get notesRemplies(): number {
    return this.toutesLesNotesAvecMatiere.length;
  }

  get totalMatieres(): number {
    return this.notesActuelles.flatMap((ue: any) => ue.matieres).length;
  }

  get moyenne(): string {
    const notes = this.toutesLesNotesAvecMatiere.map(m => m.note);
    if (notes.length === 0) return '—';
    return (notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(2);
  }

  get progressionPct(): number {
    return this.totalMatieres === 0 ? 0 : (this.notesRemplies / this.totalMatieres) * 100;
  }

  // ── Helpers visuels ──
  barreWidth(note: number | null): number {
    return note === null ? 0 : (note / 20) * 100;
  }

  couleurBarre(note: number | null): string {
    if (note === null) return '#e2e8f0';
    if (note >= 14) return '#22c55e';
    if (note >= 10) return '#2563eb';
    return '#ef4444';
  }

  couleurScore(score: number): string {
    if (score >= 75) return '#16a34a';
    if (score >= 50) return '#2563eb';
    return '#94a3b8';
  }

  // ── CRUD ──
  validerNote(item: any) {
    if (item.note === null) return;
    if (item.note < 0)  item.note = 0;
    if (item.note > 20) item.note = 20;
    this.declencherIA();
  }

  supprimerNote(item: any) {
    item.note = null;
    this.iaResultat = null;
    this.iaErreur = '';
    if (this.notesRemplies >= 5) this.declencherIA();
  }

  toutEffacer() {
    this.notesActuelles.forEach((ue: any) =>
      ue.matieres.forEach((m: any) => m.note = null)
    );
    this.iaResultat = null;
    this.iaErreur = '';
  }

  changerFiliere() {
    this.iaResultat = null;
    this.iaErreur = '';
  }

  sauvegarder() {
    this.messageSucces = `✅ ${this.notesRemplies} note(s) sauvegardée(s) pour le ${this.semestre} !`;
    setTimeout(() => this.messageSucces = '', 3000);
  }

  // ── IA : debounce 800ms ──
  declencherIA() {
    if (this.iaTimer) clearTimeout(this.iaTimer);
    if (this.notesRemplies < 5) {
      this.iaResultat = null;
      return;
    }
    this.iaLoading = true;
    this.iaResultat = null;
    this.iaErreur = '';
    this.iaTimer = setTimeout(() => this.appelGemini(), 800);
  }

private appelGemini() {
  const specialites = this.specialitesParFiliere[this.filiere];

  const notesTexte = this.toutesLesNotesAvecMatiere
    .map(m => `- ${m.matiere} : ${m.note}/20`)
    .join('\n');

  const prompt = `
Tu es un conseiller d'orientation à l'ENICarthage.

Un étudiant de filière ${this.filiere} a :

${notesTexte}

Moyenne : ${this.moyenne}/20

Spécialités :
${specialites.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Réponds UNIQUEMENT en JSON valide :

{
  "specialite": "",
  "explication": "",
  "scores": [
    ${specialites.map(s => `{ "nom": "${s}", "score": 0 }`).join(',\n    ')}
  ]
}
`;

  const body = {
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.3
  };

  this.http.post<any>(GROQ_URL, body, {
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    }
  }).subscribe({
    next: (res) => {
      const raw = res.choices?.[0]?.message?.content || '';

      console.log("RAW GROQ:", raw);

      try {
        const cleaned = raw
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();

        const match = cleaned.match(/\{[\s\S]*\}/);

        if (!match) throw new Error("No JSON found");

        this.iaResultat = JSON.parse(match[0]);
        this.iaErreur = '';
      } catch (e) {
        console.error(e);
        this.iaErreur = "Réponse IA invalide";
      }

      this.iaLoading = false;
    },

    error: (err) => {
      console.error("GROQ ERROR:", err);
      this.iaErreur = "Erreur API Groq";
      this.iaLoading = false;
    }
  });
}
}