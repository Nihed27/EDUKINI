import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfilApiService, BackendProfil } from '../services/profil-api.service';
import { AuthService, ConnectedUser } from '../services/auth.service';
import { environment } from '../../environments/environment';
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
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil-etudiant.component.html',
  styleUrl: './profil-etudiant.component.css'
})
export class ProfilEtudiantComponent implements OnInit {

  profilId: number | null = null;
  user: ConnectedUser | null = null;
  etudiantId: number | null = null;
  saveMessage: string = '';
  loading = false;
  iaErreur = '';
  recommandations: any[] = [];
  private GROQ_KEY = environment.groqApiKey;
  private GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

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
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.authService.loadConnectedProfile().subscribe({
      next: (profile) => {
        this.user = profile;
        if (this.user) {
          this.etudiantId = this.user.id;
          this.loadProfil();
        }
      }
    });
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
    if (this.etudiantId === null || this.etudiantId === undefined) return;
    this.profilApi.getByEtudiantId(this.etudiantId).subscribe({
      next: (p) => {
        if (p) {
          console.log("Profil chargé:", p);
          this.profilId = p.id ?? null;
          this.applyProfilData(p);
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.warn("Aucun profil trouvé pour cet étudiant, affichage vide.");
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

    this.scoreEtudiant = (p.score !== null && p.score !== undefined) ? String(p.score) : '';
    this.rangEtudiant = (p.rang !== null && p.rang !== undefined) ? String(p.rang) : '';
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

  // ===================== SAUVEGARDE MANUELLE =====================
  public saveProfil(): void {
    if (!this.etudiantId) {
      this.saveMessage = "Veuillez vous connecter.";
      return;
    }

    const payload: BackendProfil = {
      etudiantId: this.etudiantId,
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

    const obs = (this.profilId !== null)
      ? this.profilApi.updateByEtudiantId(this.etudiantId, payload)
      : this.profilApi.create(payload);

    obs.subscribe({
      next: (res) => {
        console.log("Sauvegarde réussie:", res);
        this.profilId = res.id ?? this.profilId;
        this.saveMessage = "Profil enregistré avec succès ! ✔️";
        this.cdr.detectChanges();
        setTimeout(() => { this.saveMessage = ''; this.cdr.detectChanges(); }, 3000);
      },
      error: (err) => {
        console.error("Erreur sauvegarde:", err);
        this.saveMessage = "Erreur lors de la sauvegarde.";
        this.cdr.detectChanges();
      }
    });
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
    // Plus de sauvegarde auto
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
    // Plus de sauvegarde auto
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
    // Plus de sauvegarde auto
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
    // Plus de sauvegarde auto
  }

  supprimerNote(m: Matiere) {
    m.note = null;
    // Plus de sauvegarde auto
  }

  // ===================== IA GROQ =====================
  calculerIA() {
    this.loading = true;
    this.iaErreur = '';
    
    const notesTexte = this.matieres
      .filter(m => m.note !== null)
      .map(m => `- ${m.nom} : ${m.note}/20`)
      .join('\n');

    const prompt = `Tu es un conseiller d'orientation pour un étudiant tunisien qui vient de passer le concours national d'ingénieurs en filière ${this.filiereSelectionnee || 'non précisée'}.
L'étudiant a les notes suivantes :
${notesTexte}

Score global (Moyenne) : ${this.scoreEtudiant || 'Non renseigné'}
Rang au concours : ${this.rangEtudiant || 'Non renseigné'}

Recommande 3 écoles d'ingénieurs tunisiennes appropriées pour son profil (exemples : SUP'COM, ENIT, ENSI, ENICarthage, INSAT, etc.).
Pour chaque école, précise la filière ou spécialité recommandée.

Réponds UNIQUEMENT en JSON valide, sans texte avant ou après, sous forme de tableau strict :
[
  {
    "specialite": "Génie Logiciel",
    "ecole": "ENSI",
    "pct": 95,
    "places": 120,
    "rangMin": 800,
    "label": "Recommandé"
  },
  {
    "specialite": "Télécommunications",
    "ecole": "SUP'COM",
    "pct": 70,
    "places": 80,
    "rangMin": 150,
    "label": "Accessible avec effort"
  }
]`;

    const body = {
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 600
    };

    this.http.post<any>(this.GROQ_URL, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.GROQ_KEY}`
      })
    }).subscribe({
      next: (res: any) => {
        try {
          const text = res.choices?.[0]?.message?.content || '';
          const clean = text.replace(/\`\`\`json|\`\`\`/g, '').trim();
          const jsonMatch = clean.match(/\\[[\\s\\S]*\\]/);
          if (!jsonMatch) throw new Error('Pas de JSON valide trouvé');
          this.recommandations = JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error("Erreur parsing JSON IA", e);
          this.iaErreur = "Erreur de lecture de l'IA (JSON invalide).";
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error("Erreur requête Groq", err);
        this.iaErreur = "Erreur de connexion à l'IA Groq : " + (err.message || err.statusText || "Vérifiez la console.");
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}