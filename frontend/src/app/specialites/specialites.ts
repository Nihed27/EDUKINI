import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpecialiteApiService, BackendSpecialite } from '../services/specialite-api.service';
import { FiliereApiService, BackendFiliere } from '../services/filiere-api.service';

export interface Specialite {
  id: number;
  nom: string;
  code: string;
  icon: string;
  filiereId: number;
  filiereNom: string;
  filiereCouleur: string;
  filiereCouleurBg: string;
  description: string;
  debouches: string[];
  competences: string[];
  capacite: number;
  nbEtudiants: number;
  actif: boolean;
  annee: string;
}

@Component({
  selector: 'app-specialites',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './specialites.component.html',
  styleUrls: ['./specialites.component.css']
})
export class SpecialitesComponent implements OnInit {

  searchQuery = '';
  filterFiliere = 'toutes';
  filterActif = 'tous';

  filieres: { id: number; nom: string; code: string; couleur: string; couleurBg: string }[] = [];

  specialites: Specialite[] = [];

  showModal         = false;
  showDeleteConfirm = false;
  showDetailModal   = false;
  editingSpec       : Specialite | null = null;
  deletingSpec      : Specialite | null = null;
  selectedSpec      : Specialite | null = null;
  specForm!         : FormGroup;
  newDebouche       = '';
  newCompetence     = '';
  debouchesList     : string[] = [];
  competencesList   : string[] = [];
  successMessage    = '';

  constructor(
    private fb: FormBuilder,
    private specialiteApi: SpecialiteApiService,
    private filiereApi: FiliereApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFilieres();
    this.loadSpecialites();
  }

  loadFilieres(): void {
    this.filiereApi.getAll().subscribe({
      next: (filieres) => {
        this.filieres = filieres.map(f => ({
          id: f.id ?? 0,
          nom: f.nom ?? '',
          code: f.code ?? '',
          couleur: f.couleur ?? '#1a73e8',
          couleurBg: this.hexToLightBg(f.couleur ?? '#1a73e8')
        }));
        this.cdr.detectChanges();
      }
    });
  }

  loadSpecialites(): void {
    this.specialiteApi.getAll().subscribe({
      next: (specialites) => {
        this.specialites = specialites.map((s) => {
          const filiere = this.filieres.find(f => f.id === s.filiereId);
          return {
            id: s.id ?? 0,
            nom: s.nom ?? '',
            code: s.code ?? '',
            icon: s.icon ?? '🎓',
            filiereId: s.filiereId ?? 0,
            filiereNom: filiere?.nom ?? '',
            filiereCouleur: filiere?.couleur ?? '#1a73e8',
            filiereCouleurBg: filiere?.couleurBg ?? '#eff6ff',
            description: s.description ?? '',
            debouches: s.debouches ?? [],
            competences: s.competences ?? [],
            capacite: s.capacite ?? 30,
            nbEtudiants: 0,
            actif: s.actif ?? true,
            annee: s.annee ?? '3ème année'
          };
        });
        this.cdr.detectChanges();
      },
      error: () => {
        this.specialites = [];
      }
    });
  }

  initForm(): void {
    this.specForm = this.fb.group({
      nom        : ['', Validators.required],
      code       : ['', Validators.required],
      icon       : ['🎓'],
      filiereId  : ['', Validators.required],
      description: ['', Validators.required],
      capacite   : [30, [Validators.required, Validators.min(1)]],
      annee      : ['3ème année'],
      actif      : [true],
    });
  }

  /* ---- Filtres ---- */
  get specsFiltrees(): Specialite[] {
    return this.specialites.filter(s => {
      const q = s.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
             || s.code.toLowerCase().includes(this.searchQuery.toLowerCase())
             || s.filiereNom.toLowerCase().includes(this.searchQuery.toLowerCase());
      const f = this.filterFiliere === 'toutes' || s.filiereId === +this.filterFiliere;
      const a = this.filterActif === 'tous'
             || (this.filterActif === 'actif'   &&  s.actif)
             || (this.filterActif === 'inactif' && !s.actif);
      return q && f && a;
    });
  }

  get specsByFiliere(): { filiere: any; specs: Specialite[] }[] {
    return this.filieres
      .map(f => ({ filiere: f, specs: this.specsFiltrees.filter(s => s.filiereId === f.id) }))
      .filter(g => g.specs.length > 0);
  }

  /* ---- Stats ---- */
  get totalEtudiants(): number { return this.specialites.reduce((s, sp) => s + sp.nbEtudiants, 0); }
  get nbActives()     : number { return this.specialites.filter(s => s.actif).length; }

  getTaux(s: Specialite): number { return Math.round((s.nbEtudiants / s.capacite) * 100); }
  getFiliereById(id: number) { return this.filieres.find(f => f.id === id); }

  /* ---- Modal ajouter/modifier ---- */
  openModal(spec?: Specialite): void {
    this.editingSpec     = spec || null;
    this.debouchesList   = spec ? [...spec.debouches]   : [];
    this.competencesList = spec ? [...spec.competences] : [];
    this.newDebouche = ''; this.newCompetence = '';
    spec
      ? this.specForm.patchValue({ ...spec })
      : this.specForm.reset({ icon: '🎓', actif: true, capacite: 30, annee: '3ème année' });
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.editingSpec = null; }

  saveSpec(): void {
    if (this.specForm.invalid) return;
    const val = this.specForm.value;

    const payload: BackendSpecialite = {
      nom: val.nom,
      code: val.code,
      icon: val.icon,
      filiereId: +val.filiereId,
      description: val.description,
      capacite: val.capacite,
      annee: val.annee,
      actif: val.actif,
      debouches: this.debouchesList,
      competences: this.competencesList
    };

    if (this.editingSpec) {
      this.specialiteApi.update(this.editingSpec.id, payload).subscribe({
        next: () => {
          this.showSuccess('Spécialité modifiée avec succès.');
          this.closeModal();
          this.loadSpecialites();
        }
      });
      return;
    }
    this.specialiteApi.create(payload).subscribe({
      next: () => {
        this.showSuccess('Spécialité ajoutée avec succès.');
        this.closeModal();
        this.loadSpecialites();
      }
    });
  }

  /* ---- Débouchés & Compétences ---- */
  addDebouche()              : void { if (this.newDebouche.trim())   { this.debouchesList.push(this.newDebouche.trim());    this.newDebouche = '';    } }
  removeDebouche(i: number)  : void { this.debouchesList.splice(i, 1); }
  addCompetence()            : void { if (this.newCompetence.trim()) { this.competencesList.push(this.newCompetence.trim()); this.newCompetence = ''; } }
  removeCompetence(i: number): void { this.competencesList.splice(i, 1); }

  /* ---- Suppression ---- */
  confirmDelete(s: Specialite): void { this.deletingSpec = s; this.showDeleteConfirm = true; }
  cancelDelete()              : void { this.showDeleteConfirm = false; this.deletingSpec = null; }
  executeDelete()             : void {
    if (!this.deletingSpec) return;
    const id = this.deletingSpec.id;
    this.specialiteApi.delete(id).subscribe({
      next: () => {
        this.showSuccess(`Spécialité "${this.deletingSpec!.nom}" supprimée.`);
        this.showDeleteConfirm = false;
        this.deletingSpec = null;
        this.loadSpecialites();
      }
    });
  }

  /* ---- Détail ---- */
  openDetail (s: Specialite): void { this.selectedSpec = s; this.showDetailModal = true; }
  closeDetail()             : void { this.showDetailModal = false; this.selectedSpec = null; }

  hexToLightBg(hex: string): string {
    const m: Record<string, string> = {
      '#1a73e8':'#eff6ff','#0ea5e9':'#f0f9ff','#f59e0b':'#fffbeb',
      '#8b5cf6':'#f5f3ff','#10b981':'#ecfdf5','#ef4444':'#fef2f2',
      '#f97316':'#fff7ed','#06b6d4':'#ecfeff',
    };
    return m[hex] || '#f9fafb';
  }

  showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 4000);
  }
}