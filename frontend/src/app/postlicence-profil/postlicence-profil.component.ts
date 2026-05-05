import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecommandationIaService, ProfilCandidat, RecommandationResult, RecommandationProgramme } from '../services/recommandation-ia.service';
import { ProfilCandidatApiService, BackendProfilCandidat } from '../services/profil-candidat-api.service';
import { AuthService, ConnectedUser } from '../services/auth.service';

interface ConditionCheck {
  label: string;
  status: 'ok' | 'ko' | 'warn';
}

@Component({
  selector: 'app-postlicence-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postlicence-profil.component.html',
  styleUrl: './postlicence-profil.component.css'
})
export class PostlicenceProfilComponent implements OnInit {

  etudiantId: number | null = null;
  user: ConnectedUser | null = null;
  profilExiste = false;
  saveMessage = '';

  profil: ProfilCandidat = {
    licence: '',
    specialite: '',
    moyenne: 0,
    niveauAnglais: '',
    competences: [],
    motivation: ''
  };

  allCompetences = [
    'Informatique', 'Réseaux', 'Électronique', 'Automatique',
    'Data Science', 'Génie Électrique', 'Télécommunications',
    'Mathématiques', 'Physique'
  ];

  niveauxAnglais = ['Débutant', 'Intermédiaire', 'Avancé', 'Courant'];

  conditionsTIC: ConditionCheck[] = [];
  conditionsARTI: ConditionCheck[] = [];
  conditionsMPSDM: ConditionCheck[] = [];
  conditionsDoctorat: ConditionCheck[] = [];

  loading = false;
  errorMessage = '';
  result: RecommandationResult | null = null;

  constructor(
    private iaService: RecommandationIaService,
    private profilApi: ProfilCandidatApiService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.loadConnectedProfile().subscribe({
      next: (profile) => {
        this.user = profile;
        if (this.user) {
          this.etudiantId = this.user.id;
          this.loadFromBackend();
        }
      }
    });
  }

  // ======= PERSISTANCE BACKEND =======
  private loadFromBackend(): void {
    if (!this.etudiantId) return;
    this.profilApi.getByEtudiantId(this.etudiantId).subscribe({
      next: (data) => {
        this.profilExiste = true;
        this.profil = {
          licence: data.licence || '',
          specialite: data.specialite || '',
          moyenne: data.moyenne || 0,
          niveauAnglais: data.niveauAnglais || '',
          competences: data.competences ? JSON.parse(data.competences) : [],
          motivation: data.motivation || ''
        };
        this.updateConditions();
        this.cdr.detectChanges();
      },
      error: () => {
        this.profilExiste = false;
        this.updateConditions();
        this.cdr.detectChanges();
      }
    });
  }

  sauvegarder(): void {
    if (!this.etudiantId) {
      this.saveMessage = "Veuillez vous connecter.";
      return;
    }

    const payload: BackendProfilCandidat = {
      etudiantId: this.etudiantId,
      licence: this.profil.licence,
      specialite: this.profil.specialite,
      moyenne: this.profil.moyenne,
      niveauAnglais: this.profil.niveauAnglais,
      competences: JSON.stringify(this.profil.competences),
      motivation: this.profil.motivation
    };

    const obs = this.profilExiste
      ? this.profilApi.update(this.etudiantId, payload)
      : this.profilApi.create(payload);

    obs.subscribe({
      next: () => {
        this.profilExiste = true;
        this.saveMessage = 'Profil sauvegardé ✔️';
        this.cdr.detectChanges();
        setTimeout(() => { this.saveMessage = ''; this.cdr.detectChanges(); }, 3000);
      },
      error: () => {
        this.saveMessage = 'Erreur lors de la sauvegarde.';
        this.cdr.detectChanges();
      }
    });
  }

  onFieldChange(): void {
    this.updateConditions();
  }

  // ======= COMPÉTENCES =======
  toggleCompetence(comp: string): void {
    const idx = this.profil.competences.indexOf(comp);
    if (idx >= 0) {
      this.profil.competences.splice(idx, 1);
    } else {
      this.profil.competences.push(comp);
    }
    this.updateConditions();
  }

  isSelected(comp: string): boolean {
    return this.profil.competences.includes(comp);
  }

  // ======= CONDITIONS CHECKER =======
  updateConditions(): void {
    const p = this.profil;
    const licLower = (p.licence + ' ' + p.specialite).toLowerCase();
    const anglaisLevel = this.niveauxAnglais.indexOf(p.niveauAnglais);
    const hasComp = (list: string[]) => list.some(c => p.competences.includes(c));

    const ticLicence = /informatique|réseau|génie logiciel|télécom/i.test(licLower);
    const ticAnglais = anglaisLevel >= 1;
    const ticMoyenne = p.moyenne >= 12;
    this.conditionsTIC = [
      { label: 'Licence en Informatique, Réseaux, GL ou Télécoms', status: ticLicence ? 'ok' : 'ko' },
      { label: 'Anglais ≥ Intermédiaire', status: ticAnglais ? 'ok' : (anglaisLevel === 0 ? 'ko' : 'warn') },
      { label: 'Moyenne ≥ 12/20', status: ticMoyenne ? 'ok' : (p.moyenne >= 10 ? 'warn' : 'ko') }
    ];

    const artiLicence = /eea|électrique|automatique|électronique/i.test(licLower);
    const artiComp = hasComp(['Automatique', 'Électronique']);
    const artiMoyenne = p.moyenne >= 12;
    this.conditionsARTI = [
      { label: 'Licence en EEA ou Génie Électrique', status: artiLicence ? 'ok' : 'ko' },
      { label: 'Compétences en Automatique ou Électronique', status: artiComp ? 'ok' : 'ko' },
      { label: 'Moyenne ≥ 12/20', status: artiMoyenne ? 'ok' : (p.moyenne >= 10 ? 'warn' : 'ko') }
    ];

    const mpsdmComp = hasComp(['Data Science', 'Informatique', 'Mathématiques']);
    this.conditionsMPSDM = [
      { label: 'Compétences Data Science, Informatique ou Mathématiques', status: mpsdmComp ? 'ok' : 'ko' }
    ];

    const docLicence = /électrique|eea/i.test(licLower);
    const docMoyenne = p.moyenne >= 14;
    this.conditionsDoctorat = [
      { label: 'Licence/Master en Génie Électrique', status: docLicence ? 'ok' : 'ko' },
      { label: 'Moyenne ≥ 14/20', status: docMoyenne ? 'ok' : (p.moyenne >= 12 ? 'warn' : 'ko') },
      { label: 'Motivation pour la recherche', status: p.motivation.length > 20 ? 'ok' : (p.motivation.length > 0 ? 'warn' : 'ko') }
    ];
  }

  getStatusIcon(status: string): string {
    if (status === 'ok') return '✅';
    if (status === 'warn') return '⚠️';
    return '❌';
  }

  // ======= ANALYSE IA =======
  analyser(): void {
    this.loading = true;
    this.errorMessage = '';
    this.result = null;
    this.cdr.detectChanges();

    this.iaService.analyserProfil(this.profil).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.error?.message || err?.message || 'Erreur lors de l\'appel IA. Vérifiez votre clé API.';
        this.cdr.detectChanges();
      }
    });
  }

  getBarColor(pct: number): string {
    if (pct >= 70) return '#22c55e';
    if (pct >= 40) return '#f59e0b';
    return '#ef4444';
  }

  isMeilleurChoix(prog: RecommandationProgramme): boolean {
    return this.result?.meilleur_choix === prog.programme;
  }
}
