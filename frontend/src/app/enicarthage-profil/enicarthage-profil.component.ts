import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { NotesApiService, EduNote } from '../services/notes-api.service';
import { AuthService, ConnectedUser } from '../services/auth.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-enicarthage-profil',
  standalone: true,
imports: [CommonModule, FormsModule, HttpClientModule],

  templateUrl: './enicarthage-profil.component.html',
  styleUrl: './enicarthage-profil.component.css'
})
export class EnicarthageProfilComponent implements OnInit {

  semestre: 'S1' | 'S2' = 'S1';
filiere = 'informatique';

private GROQ_KEY = environment.groqApiKey;
private GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

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
  user: ConnectedUser | null = null;

  constructor(
    private http: HttpClient, 
    private notesApi: NotesApiService, 
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.loadConnectedProfile().subscribe({
      next: (profile) => {
        this.user = profile;
        if (this.user) {
          this.loadNotes();
        }
      },
      error: (err) => console.error("Erreur profil:", err)
    });
  }

  loadNotes() {
    if (!this.user) return;
    this.notesApi.getNotes(this.user.id).subscribe({
      next: (notes) => {
        notes.forEach(n => {
          const sKey = n.semestre === 1 ? 'S1' : 'S2';
          // Normalisation pour ignorer les différences de tirets/espaces/majuscules
          const normalize = (s: string) => s ? s.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
          
          const ue = this.semestres[sKey]?.find(u => normalize(u.ue) === normalize(n.ueNom));
          if (ue) {
            const mat = ue.matieres.find(m => normalize(m.matiere) === normalize(n.matiereNom));
            if (mat) {
              mat.note = n.note;
            }
          }
        });
        // On force Angular à rafraîchir la vue avec les nouvelles notes
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Erreur chargement notes", err)
    });
  }

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
    if (!this.user) {
      this.messageErreur = "Veuillez vous connecter pour sauvegarder.";
      return;
    }
    this.messageErreur = '';

    const payload: EduNote[] = [];
    ['S1', 'S2'].forEach(s => {
      const semestreNum = s === 'S1' ? 1 : 2;
      this.semestres[s as 'S1'|'S2'].forEach(ue => {
        ue.matieres.forEach(m => {
          if (m.note !== null) {
            payload.push({
              etudiantId: this.user!.id,
              filiere: this.filiere,
              semestre: semestreNum,
              ueNom: ue.ue,
              matiereNom: m.matiere,
              note: m.note
            });
          }
        });
      });
    });

    if (payload.length === 0) {
      this.messageErreur = "Aucune note à sauvegarder.";
      return;
    }

    // On vide l'ancien profil en base pour cet utilisateur avant de sauvegarder le nouveau
    this.notesApi.deleteNotes(this.user.id).subscribe({
      next: () => {
        this.notesApi.saveNotes(payload).subscribe({
          next: () => {
            this.messageSucces = `Profil sauvegardé avec succès !`;
            setTimeout(() => this.messageSucces = '', 3000);
          },
          error: (err) => {
            this.messageErreur = "Erreur de sauvegarde des notes.";
            console.error(err);
          }
        });
      },
      error: (err) => {
        this.messageErreur = "Erreur de mise à jour.";
        console.error(err);
      }
    });
  }

  toutEffacer() {
    if (!this.user) return;
    this.notesApi.deleteNotes(this.user.id).subscribe({
      next: () => {
        Object.values(this.semestres).forEach(sem => sem.forEach(ue => ue.matieres.forEach(m => m.note = null)));
        this.iaResultat = null;
        this.iaErreur = '';
        clearTimeout(this.iaTimer);
      },
      error: () => {
        this.messageErreur = "Erreur lors de la suppression.";
      }
    });
  }

  couleurScore(score: number): string {
    if (score >= 75) return '#16a34a';
    if (score >= 50) return '#2563eb';
    return '#94a3b8';
  }
}