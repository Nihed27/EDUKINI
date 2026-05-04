import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiliereApiService, BackendFiliere } from '../services/filiere-api.service';

export interface Filiere {
  id: number;
  nom: string;
  code: string;
  icon: string;
  couleur: string;
  couleurBg: string;
  description: string;
  debouches: string[];
  competences: string[];
  capacite: number;
  duree: string;
  scoreMin: number;
  actif: boolean;
}

@Component({
  selector: 'app-filieres',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './filieres.html',
  styleUrls: ['./filieres.css']
})
export class FilieresComponent implements OnInit {

  viewMode: 'cards' | 'table' = 'cards';
  searchQuery: string = '';
  filterActif: string = 'tous';

  filieres: Filiere[] = [];

  showModal        = false;
  showDeleteConfirm= false;
  showDetailModal  = false;
  editingFiliere  : Filiere | null = null;
  deletingFiliere : Filiere | null = null;
  selectedFiliere : Filiere | null = null;
  filiereForm!    : FormGroup;
  newDebouche     = '';
  newCompetence   = '';
  debouchesList   : string[] = [];
  competencesList : string[] = [];
  successMessage  = '';

  constructor(private fb: FormBuilder, private filiereApi: FiliereApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFilieres();
  }

  loadFilieres(): void {
    this.filiereApi.getAll().subscribe({
      next: (filieres) => {
        this.filieres = filieres.map((f) => ({
          id: f.id ?? 0,
          nom: f.nom ?? '',
          code: f.code ?? '',
          icon: f.icon ?? '🎓',
          couleur: f.couleur ?? '#1a73e8',
          couleurBg: this.hexToLightBg(f.couleur ?? '#1a73e8'),
          description: f.description ?? '',
          debouches: f.debouches ?? [],
          competences: f.competences ?? [],
          capacite: f.capacite ?? 60,
          duree: f.duree ?? '3 ans',
          scoreMin: f.scoreMin ?? 60,
          actif: f.actif ?? true,
        }));
        this.cdr.detectChanges();
      },
      error: () => {
        this.filieres = [];
      }
    });
  }

  initForm(): void {
    this.filiereForm = this.fb.group({
      nom        : ['', Validators.required],
      code       : ['', Validators.required],
      icon       : ['🎓'],
      couleur    : ['#1a73e8'],
      description: ['', Validators.required],
      capacite   : [60,  [Validators.required, Validators.min(1)]],
      duree      : ['3 ans', Validators.required],
      scoreMin   : [60,  [Validators.required, Validators.min(0), Validators.max(100)]],
      actif      : [true],
    });
  }

  get filieresFiltrees(): Filiere[] {
    return this.filieres.filter(f => {
      const s = f.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
             || f.code.toLowerCase().includes(this.searchQuery.toLowerCase());
      const a = this.filterActif === 'tous'
             || (this.filterActif === 'actif'   &&  f.actif)
             || (this.filterActif === 'inactif' && !f.actif);
      return s && a;
    });
  }

  get totalCapacite() : number { return this.filieres.reduce((s, f) => s + f.capacite, 0); }

  openModal(filiere?: Filiere): void {
    this.editingFiliere  = filiere || null;
    this.debouchesList   = filiere ? [...filiere.debouches]   : [];
    this.competencesList = filiere ? [...filiere.competences] : [];
    this.newDebouche = ''; this.newCompetence = '';
    if (filiere) {
      this.filiereForm.patchValue({ ...filiere });
    } else {
      this.filiereForm.reset({ icon: '🎓', couleur: '#1a73e8', actif: true, capacite: 60, scoreMin: 60, duree: '3 ans' });
    }
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.editingFiliere = null; }

  saveFiliere(): void {
    if (this.filiereForm.invalid) return;
    const val = this.filiereForm.value;

    const payload: BackendFiliere = {
      nom: val.nom,
      code: val.code,
      icon: val.icon,
      couleur: val.couleur,
      description: val.description,
      capacite: val.capacite,
      scoreMin: val.scoreMin,
      duree: val.duree,
      actif: val.actif,
      debouches: this.debouchesList,
      competences: this.competencesList
    };

    if (this.editingFiliere) {
      this.filiereApi.update(this.editingFiliere.id, payload).subscribe({
        next: () => {
          this.showSuccess('Filière modifiée avec succès.');
          this.closeModal();
          this.loadFilieres();
        }
      });
      return;
    }
    this.filiereApi.create(payload).subscribe({
      next: () => {
        this.showSuccess('Filière ajoutée avec succès.');
        this.closeModal();
        this.loadFilieres();
      }
    });
  }

  addDebouche   (): void { if (this.newDebouche.trim())    { this.debouchesList.push(this.newDebouche.trim());       this.newDebouche    = ''; } }
  removeDebouche(i: number): void { this.debouchesList.splice(i, 1); }
  addCompetence (): void { if (this.newCompetence.trim())  { this.competencesList.push(this.newCompetence.trim());   this.newCompetence  = ''; } }
  removeCompetence(i: number): void { this.competencesList.splice(i, 1); }

  confirmDelete(f: Filiere): void { this.deletingFiliere = f; this.showDeleteConfirm = true; }
  cancelDelete  (): void { this.showDeleteConfirm = false; this.deletingFiliere = null; }
  executeDelete (): void {
    if (!this.deletingFiliere) return;
    const id = this.deletingFiliere.id;
    this.filiereApi.delete(id).subscribe({
      next: () => {
        this.showSuccess(`Filière "${this.deletingFiliere!.nom}" supprimée.`);
        this.showDeleteConfirm = false;
        this.deletingFiliere = null;
        this.loadFilieres();
      }
    });
  }

  openDetail (f: Filiere): void { this.selectedFiliere = f; this.showDetailModal = true; }
  closeDetail(): void { this.showDetailModal = false; this.selectedFiliere = null; }
  toggleActif(f: Filiere): void { f.actif = !f.actif; }

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