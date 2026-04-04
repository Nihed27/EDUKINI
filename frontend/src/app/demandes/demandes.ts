import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

export type StatutDemande = 'en_attente' | 'en_cours' | 'acceptee' | 'refusee';
export type TypeDemande =
  | 'Attestation de scolarité'
  | 'Relevé de notes'
  | 'Attestation de stage'
  | 'Certificat de présence'
  | 'Demande de bourse'
  | 'Demande de transfert'
  | 'Autre';

export interface Demande {
  id: number;
  etudiantNom: string;
  etudiantMatricule: string;
  etudiantEmail: string;
  etudiantFiliere: string;
  type: TypeDemande;
  description: string;
  statut: StatutDemande;
  datesoumission: string;
  dateTraitement?: string;
  adminTraitant?: string;
  commentaire?: string;
  pieceJointe?: string;
  urgent: boolean;
}

@Component({
  selector: 'app-demandes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './demandes.html',
  styleUrls: ['./demandes.css']
})
export class DemandesComponent implements OnInit {

  searchQuery = '';
  filterStatut = 'tous';
  filterType   = 'tous';
  currentPage  = 1;
  pageSize     = 8;

  successMessage = '';

  typesDemande: TypeDemande[] = [
    'Attestation de scolarité',
    'Relevé de notes',
    'Attestation de stage',
    'Certificat de présence',
    'Demande de bourse',
    'Demande de transfert',
    'Autre'
  ];

  demandes: Demande[] = [
    { id: 1,  etudiantNom: 'Ahmed Ben Salah',    etudiantMatricule: 'ENI-2021-001', etudiantEmail: 'ahmed.bensalah@eni.tn',    etudiantFiliere: 'Génie Informatique',            type: 'Attestation de scolarité', description: 'J\'ai besoin d\'une attestation de scolarité pour mon dossier de visa.',        statut: 'en_attente', datesoumission: '2024-01-15', urgent: true  },
    { id: 2,  etudiantNom: 'Sarra Khelifi',       etudiantMatricule: 'ENI-2021-042', etudiantEmail: 'sarra.khelifi@eni.tn',      etudiantFiliere: 'Génie Mécatronique',            type: 'Relevé de notes',          description: 'Demande de relevé de notes pour candidature master à l\'étranger.',             statut: 'en_cours',   datesoumission: '2024-01-14', urgent: false },
    { id: 3,  etudiantNom: 'Mohamed Trabelsi',    etudiantMatricule: 'ENI-2020-118', etudiantEmail: 'med.trabelsi@eni.tn',       etudiantFiliere: 'Génie Industriel & Logistique', type: 'Attestation de stage',     description: 'Attestation de stage pour valider mon PFE chez Tunisie Télécom.',               statut: 'acceptee',   datesoumission: '2024-01-10', dateTraitement: '2024-01-12', adminTraitant: 'Mehdi Ben Ali', commentaire: 'Attestation générée et envoyée par email.', urgent: false },
    { id: 4,  etudiantNom: 'Yasmine Chaabane',    etudiantMatricule: 'ENI-2022-007', etudiantEmail: 'yasmine.chaabane@eni.tn',   etudiantFiliere: 'Génie Infotronique',            type: 'Demande de bourse',        description: 'Demande de bourse d\'excellence pour l\'année académique 2024-2025.',           statut: 'refusee',    datesoumission: '2024-01-08', dateTraitement: '2024-01-11', adminTraitant: 'Mehdi Ben Ali', commentaire: 'Dossier incomplet, veuillez soumettre les pièces manquantes.', urgent: false },
    { id: 5,  etudiantNom: 'Karim Bouazizi',      etudiantMatricule: 'ENI-2021-089', etudiantEmail: 'karim.bouazizi@eni.tn',     etudiantFiliere: 'Génie Informatique',            type: 'Certificat de présence',   description: 'Certificat de présence pour justifier mon absence à un entretien.',             statut: 'en_attente', datesoumission: '2024-01-16', urgent: true  },
    { id: 6,  etudiantNom: 'Ines Hamrouni',       etudiantMatricule: 'ENI-2020-054', etudiantEmail: 'ines.hamrouni@eni.tn',      etudiantFiliere: 'Génie Mécatronique',            type: 'Relevé de notes',          description: 'Relevé de notes S1 et S2 pour candidature.',                                   statut: 'acceptee',   datesoumission: '2024-01-09', dateTraitement: '2024-01-10', adminTraitant: 'Mehdi Ben Ali', commentaire: 'Documents envoyés.', urgent: false },
    { id: 7,  etudiantNom: 'Bilel Mansouri',      etudiantMatricule: 'ENI-2022-033', etudiantEmail: 'bilel.mansouri@eni.tn',     etudiantFiliere: 'Génie Industriel & Logistique', type: 'Demande de transfert',     description: 'Demande de transfert vers l\'ENIT pour raisons familiales.',                   statut: 'en_cours',   datesoumission: '2024-01-13', urgent: false },
    { id: 8,  etudiantNom: 'Rania Dridi',         etudiantMatricule: 'ENI-2021-076', etudiantEmail: 'rania.dridi@eni.tn',        etudiantFiliere: 'Génie Infotronique',            type: 'Attestation de scolarité', description: 'Attestation urgente pour ambassade France.',                                   statut: 'en_attente', datesoumission: '2024-01-17', urgent: true  },
    { id: 9,  etudiantNom: 'Hedi Jebali',         etudiantMatricule: 'ENI-2020-201', etudiantEmail: 'hedi.jebali@eni.tn',        etudiantFiliere: 'Génie Informatique',            type: 'Attestation de stage',     description: 'Attestation de stage PFE chez Microsoft Tunisie.',                             statut: 'acceptee',   datesoumission: '2024-01-05', dateTraitement: '2024-01-07', adminTraitant: 'Mehdi Ben Ali', commentaire: 'Validé.', urgent: false },
    { id: 10, etudiantNom: 'Amira Souissi',       etudiantMatricule: 'ENI-2022-099', etudiantEmail: 'amira.souissi@eni.tn',      etudiantFiliere: 'Génie Mécatronique',            type: 'Autre',                    description: 'Demande de dérogation pour examen rattrapage.',                                statut: 'en_attente', datesoumission: '2024-01-18', urgent: false },
    { id: 11, etudiantNom: 'Fares Nasri',         etudiantMatricule: 'ENI-2021-144', etudiantEmail: 'fares.nasri@eni.tn',        etudiantFiliere: 'Génie Infotronique',            type: 'Demande de bourse',        description: 'Renouvellement bourse sociale.',                                               statut: 'en_cours',   datesoumission: '2024-01-12', urgent: false },
    { id: 12, etudiantNom: 'Leila Belhaj',        etudiantMatricule: 'ENI-2020-088', etudiantEmail: 'leila.belhaj@eni.tn',       etudiantFiliere: 'Génie Industriel & Logistique', type: 'Relevé de notes',          description: 'Relevé de notes complet du cycle ingénieur.',                                  statut: 'refusee',    datesoumission: '2024-01-06', dateTraitement: '2024-01-09', adminTraitant: 'Mehdi Ben Ali', commentaire: 'Frais de scolarité non réglés.', urgent: false },
  ];

  showDetailModal  = false;
  showTraitModal   = false;
  showTypeModal    = false;
  selectedDemande  : Demande | null = null;
  traitingDemande  : Demande | null = null;
  newStatut        : StatutDemande = 'en_attente';
  newCommentaire   = '';
  traitForm!       : FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.traitForm = this.fb.group({
      statut     : ['', Validators.required],
      commentaire: [''],
    });
  }

  /* ---- Stats ---- */
  get total()      { return this.demandes.length; }
  get enAttente()  { return this.demandes.filter(d => d.statut === 'en_attente').length; }
  get enCours()    { return this.demandes.filter(d => d.statut === 'en_cours').length; }
  get acceptees()  { return this.demandes.filter(d => d.statut === 'acceptee').length; }
  get refusees()   { return this.demandes.filter(d => d.statut === 'refusee').length; }
  get urgentes()   { return this.demandes.filter(d => d.statut === 'en_attente' && d.urgent).length; }

  /* ---- Filtres ---- */
  get demandesFiltrees(): Demande[] {
    return this.demandes.filter(d => {
      const q = d.etudiantNom.toLowerCase().includes(this.searchQuery.toLowerCase())
             || d.etudiantMatricule.toLowerCase().includes(this.searchQuery.toLowerCase())
             || d.type.toLowerCase().includes(this.searchQuery.toLowerCase());
      const s = this.filterStatut === 'tous' || d.statut === this.filterStatut;
      const t = this.filterType   === 'tous' || d.type   === this.filterType;
      return q && s && t;
    });
  }

  get totalPages(): number { return Math.ceil(this.demandesFiltrees.length / this.pageSize); }

  get demandesPaged(): Demande[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.demandesFiltrees.slice(start, start + this.pageSize);
  }

  get pages(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }

  goToPage(p: number) { if (p >= 1 && p <= this.totalPages) this.currentPage = p; }

  onFilterChange() { this.currentPage = 1; }

  /* ---- Détail ---- */
  openDetail(d: Demande)  { this.selectedDemande = d; this.showDetailModal = true; }
  closeDetail()           { this.showDetailModal = false; this.selectedDemande = null; }

  /* ---- Traitement ---- */
  openTrait(d: Demande) {
    this.traitingDemande = d;
    this.traitForm.reset({ statut: d.statut, commentaire: d.commentaire || '' });
    this.showTraitModal = true;
  }
  closeTrait() { this.showTraitModal = false; this.traitingDemande = null; }

  saveTrait() {
    if (!this.traitingDemande || this.traitForm.invalid) return;
    const val = this.traitForm.value;
    const idx = this.demandes.findIndex(d => d.id === this.traitingDemande!.id);
    this.demandes[idx] = {
      ...this.demandes[idx],
      statut        : val.statut,
      commentaire   : val.commentaire,
      dateTraitement: new Date().toISOString().split('T')[0],
      adminTraitant : 'Mehdi Ben Ali',
    };
    this.showSuccess(`Demande de ${this.traitingDemande.etudiantNom} mise à jour.`);
    this.closeTrait();
    if (this.selectedDemande?.id === this.traitingDemande?.id) {
      this.selectedDemande = this.demandes[idx];
    }
  }

  /* ---- Raccourcis statut ---- */
  accepter(d: Demande) {
    const idx = this.demandes.findIndex(x => x.id === d.id);
    this.demandes[idx] = { ...this.demandes[idx], statut: 'acceptee', dateTraitement: new Date().toISOString().split('T')[0], adminTraitant: 'Mehdi Ben Ali' };
    this.showSuccess(`Demande acceptée.`);
  }
  refuser(d: Demande) {
    const idx = this.demandes.findIndex(x => x.id === d.id);
    this.demandes[idx] = { ...this.demandes[idx], statut: 'refusee', dateTraitement: new Date().toISOString().split('T')[0], adminTraitant: 'Mehdi Ben Ali' };
    this.showSuccess(`Demande refusée.`);
  }

  /* ---- Helpers ---- */
  statutLabel(s: StatutDemande): string {
    const map: Record<StatutDemande, string> = {
      en_attente: 'En attente', en_cours: 'En cours', acceptee: 'Acceptée', refusee: 'Refusée'
    };
    return map[s];
  }

  statutClass(s: StatutDemande): string {
    const map: Record<StatutDemande, string> = {
      en_attente: 'badge-attente', en_cours: 'badge-cours', acceptee: 'badge-acceptee', refusee: 'badge-refusee'
    };
    return map[s];
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  showSuccess(msg: string) {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 4000);
  }
}