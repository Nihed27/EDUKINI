import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-enicarthage-profil',
  standalone: true,
imports: [CommonModule, FormsModule, HttpClientModule],

  templateUrl: './enicarthage-profil.component.html',
  styleUrl: './enicarthage-profil.component.css'
})
export class EnicarthageProfilComponent {

  semestre: 'S1' | 'S2' = 'S1';
filiere = 'informatique';

private GROQ_KEY = '';
private GROQ_URL = '';
  semestres = {
    S1: [
      {
        ue: 'UE1.1 — Mathématiques',
        matieres: [
          { matiere: "Mathématiques de l'ingénieur", note: null as number | null },
          { matiere: 'Analyse numérique 1', note: null as number | null },
        ]
      },
      {
        ue: 'UE1.2 — Informatique de base',
        matieres: [
          { matiere: 'Algorithmique', note: null as number | null },
          { matiere: 'Programmation', note: null as number | null },
        ]
      },
      {
        ue: 'UE1.3 — Logique & Génie logiciel',
        matieres: [
          { matiere: 'Logique formelle', note: null as number | null },
          { matiere: 'Génie logiciel', note: null as number | null },
          { matiere: "Technologies de l'information et de la communication", note: null as number | null },
        ]
      },
      {
        ue: 'UE1.4 — Électronique',
        matieres: [
          { matiere: "Circuits numériques et éléments d'architecture", note: null as number | null },
          { matiere: 'Semi-conducteurs et électronique analogique', note: null as number | null },
        ]
      },
      {
        ue: 'UE1.5 — Culture & Langues',
        matieres: [
          { matiere: "Économie de l'entreprise", note: null as number | null },
          { matiere: 'Basic english', note: null as number | null },
          { matiere: 'Culture et communication 1', note: null as number | null },
        ]
      },
    ],
    S2: [
      {
        ue: 'UE1.6 — Mathématiques avancées',
        matieres: [
          { matiere: 'Probabilités & Statistiques', note: null as number | null },
          { matiere: 'Analyse numérique 2', note: null as number | null },
          { matiere: 'Processus Stochastiques', note: null as number | null },
        ]
      },
      {
        ue: 'UE1.7 — Algorithmique avancée',
        matieres: [
          { matiere: 'Algorithmique avancée & Complexité', note: null as number | null },
          { matiere: 'Programmation orientée objet C++', note: null as number | null },
        ]
      },
      {
        ue: 'UE1.8 — Architecture & Réseaux',
        matieres: [
          { matiere: 'Architecture des ordinateurs', note: null as number | null },
          { matiere: 'Réseaux avancés & Routage', note: null as number | null },
        ]
      },
      {
        ue: "UE1.9 — Systèmes d'information",
        matieres: [
          { matiere: 'Base de données relationnelles', note: null as number | null },
          { matiere: "Analyse et conception des systèmes d'information", note: null as number | null },
          { matiere: 'Web Basics', note: null as number | null },
          { matiere: 'Projet fédérateur : Web application Builder', note: null as number | null },
        ]
      },
      {
        ue: 'UE1.10 — Culture & Langues',
        matieres: [
          { matiere: 'Théorie des organisations', note: null as number | null },
          { matiere: 'Professional english', note: null as number | null },
          { matiere: 'Culture et communication 2', note: null as number | null },
        ]
      },
    ]
  };

  iaLoading = false;
  iaResultat: {
    specialite: string;
    explication: string;
    scores: { nom: string; score: number }[];
  } | null = null;
  iaErreur = '';

  messageSucces = '';
  messageErreur = '';

  private iaTimer: any = null;

  constructor(private http: HttpClient) {}

  get notesActuelles() {
    return this.semestres[this.semestre];
  }

  get toutesLesNotes(): { matiere: string; note: number }[] {
    return this.notesActuelles
      .flatMap(ue => ue.matieres)
      .filter((m): m is { matiere: string; note: number } => m.note !== null);
  }

  get moyenneAffichee(): string {
    const notes = this.toutesLesNotes.map(m => m.note);
    if (notes.length === 0) return '—';
    return (notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(2);
  }

  get couleurMoyenne(): string {
    const m = parseFloat(this.moyenneAffichee);
    if (isNaN(m)) return '#64748b';
    if (m >= 14) return '#16a34a';
    if (m >= 10) return '#2563eb';
    return '#ef4444';
  }

  get notesRemplies(): number {
    return this.notesActuelles.flatMap(ue => ue.matieres).filter(m => m.note !== null).length;
  }

  get totalMatieres(): number {
    return this.notesActuelles.flatMap(ue => ue.matieres).length;
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

  validerNote(item: { note: number | null }) {
    if (item.note === null) return;
    if (item.note < 0) item.note = 0;
    if (item.note > 20) item.note = 20;
    this.iaResultat = null;
    // Debounce : on attend 1.5s après la dernière frappe avant d'appeler l'IA
    clearTimeout(this.iaTimer);
    if (this.notesRemplies >= 5) {
      this.iaTimer = setTimeout(() => this.demanderRecommandationIA(), 1500);
    }
  }

  supprimerNote(item: { note: number | null }) {
    item.note = null;
    this.iaResultat = null;
    clearTimeout(this.iaTimer);
    if (this.notesRemplies >= 5) {
      this.iaTimer = setTimeout(() => this.demanderRecommandationIA(), 1500);
    }
  }

 demanderRecommandationIA() {
  if (this.notesRemplies < 5) return;

  this.iaLoading = true;
  this.iaErreur = '';

  const notesTexte = this.toutesLesNotes
    .map(m => `- ${m.matiere} : ${m.note}/20`)
    .join('\n');

  const prompt = `Tu es un conseiller d'orientation pour des étudiants en 1ère année de cycle ingénieur à l'ENICarthage (Tunisie), filière Informatique.

L'étudiant a les notes suivantes au ${this.semestre} :
${notesTexte}

Moyenne générale : ${this.moyenneAffichee}/20

Les 3 spécialités disponibles sont :
1. Intelligence Artificielle — fort en maths, algorithmique, probabilités.
2. Sécurité informatique — fort en réseaux, logique, architecture.
3. Génie logiciel — fort en programmation, bases de données, conception.

Réponds UNIQUEMENT en JSON valide, sans texte avant ou après, sans markdown :
{
  "specialite": "Nom de la spécialité recommandée",
  "explication": "2-3 phrases expliquant pourquoi.",
  "scores": [
    { "nom": "Intelligence Artificielle", "score": 85 },
    { "nom": "Sécurité informatique", "score": 60 },
    { "nom": "Génie logiciel", "score": 72 }
  ]
}`;

  const body = {
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    max_tokens: 500
  };

  this.http.post<any>(this.GROQ_URL, body, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.GROQ_KEY}`
    })
  }).subscribe({
    next: (res) => {
      try {
        const text = res.choices?.[0]?.message?.content || '';
        const clean = text.replace(/```json|```/g, '').trim();
        const jsonMatch = clean.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('Pas de JSON');
        this.iaResultat = JSON.parse(jsonMatch[0]);
      } catch (e) {
        this.iaErreur = "Erreur lors de l'analyse IA. Réessayez.";
      }
      this.iaLoading = false;
    },
    error: (err) => {
      this.iaErreur = err.status === 401
        ? 'Clé API invalide.'
        : "Impossible de contacter l'IA. Réessayez.";
      this.iaLoading = false;
    }
  });
}

  sauvegarder() {
    this.messageErreur = '';
    const invalides = this.notesActuelles
      .flatMap(ue => ue.matieres)
      .filter(m => m.note !== null && (m.note < 0 || m.note > 20));

    if (invalides.length > 0) {
      this.messageErreur = 'Certaines notes sont invalides (0–20 requis).';
      return;
    }

    this.messageSucces = `Profil ${this.semestre} sauvegardé avec succès !`;
    setTimeout(() => this.messageSucces = '', 3000);
  }

  toutEffacer() {
    this.notesActuelles.forEach(ue => ue.matieres.forEach(m => m.note = null));
    this.iaResultat = null;
    this.iaErreur = '';
    clearTimeout(this.iaTimer);
  }

  couleurScore(score: number): string {
    if (score >= 75) return '#16a34a';
    if (score >= 50) return '#2563eb';
    return '#94a3b8';
  }
}