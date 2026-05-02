import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ecole } from './ecole.model';
import { EcoleApiService, BackendEcole } from '../services/ecole-api.service';

@Component({
  selector: 'app-ecoles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ecoles.component.html',
  styleUrl: './ecoles.component.css'
})
export class EcolesComponent implements OnInit {

  ecoles: Ecole[] = [];
  filteredEcoles: Ecole[] = [];

  searchTerm: string = '';
  filterRegion: string = '';
  filterFiliere: string = '';

  regions: string[] = [];
  universites: string[] = [];
  allFilieres: string[] = [];

  showModal: boolean = false;
  isEditMode: boolean = false;
  showDeleteConfirm: boolean = false;
  ecoleToDelete: Ecole | null = null;
  selectedId: number | null = null;

  expandedId: number | null = null;
  newFiliereInput: string = '';

  formData: Omit<Ecole, 'id'> = this.emptyForm();

  constructor(private ecoleApi: EcoleApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.ecoleApi.getAll().subscribe({
      next: (ecoles) => {
        this.ecoles = ecoles.map((e) => ({
          id: e.id ?? 0,
          nom: e.nom ?? '',
          sigle: e.sigle ?? '',
          universite: e.universite ?? '',
          region: e.region ?? '',
          adresse: e.adresse ?? '',
          filieres: e.filieres ?? []
        }));
        this.regions = [...new Set(this.ecoles.map(e => e.region).filter(r => r))].sort();
        this.universites = [...new Set(this.ecoles.map(e => e.universite).filter(u => u))].sort();
        this.allFilieres = [...new Set(this.ecoles.flatMap(e => e.filieres))].sort();
        this.applyFilters();
        this.cdr.detectChanges();
      },
      error: () => {
        this.ecoles = [];
        this.filteredEcoles = [];
        this.regions = [];
        this.universites = [];
        this.allFilieres = [];
      }
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredEcoles = this.ecoles.filter((e) => {
      const matchTerm = !term ||
        e.nom.toLowerCase().includes(term) ||
        e.sigle.toLowerCase().includes(term) ||
        e.universite.toLowerCase().includes(term);
      const matchRegion = !this.filterRegion || e.region === this.filterRegion;
      const matchFiliere = !this.filterFiliere ||
        e.filieres.some(f => f.toLowerCase().includes(this.filterFiliere.toLowerCase()));
      return matchTerm && matchRegion && matchFiliere;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filterRegion = '';
    this.filterFiliere = '';
    this.applyFilters();
  }

  toggleExpand(id: number): void {
    this.expandedId = this.expandedId === id ? null : id;
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.formData = this.emptyForm();
    this.newFiliereInput = '';
    this.showModal = true;
  }

  openEditModal(ecole: Ecole): void {
    this.isEditMode = true;
    this.selectedId = ecole.id;
    this.formData = {
      nom: ecole.nom,
      sigle: ecole.sigle,
      universite: ecole.universite,
      region: ecole.region,
      adresse: ecole.adresse,
      filieres: [...ecole.filieres]
    };
    this.newFiliereInput = '';
    this.showModal = true;
  }

  addFiliere(): void {
    const f = this.newFiliereInput.trim();
    if (f && !this.formData.filieres.includes(f)) {
      this.formData.filieres.push(f);
    }
    this.newFiliereInput = '';
  }

  removeFiliere(index: number): void {
    this.formData.filieres.splice(index, 1);
  }

  saveEcole(): void {
    const payload: BackendEcole = {
      nom: this.formData.nom,
      sigle: this.formData.sigle,
      universite: this.formData.universite,
      region: this.formData.region,
      adresse: this.formData.adresse,
      filieres: this.formData.filieres
    };

    if (this.isEditMode && this.selectedId !== null) {
      this.ecoleApi.update(this.selectedId, payload).subscribe({
        next: () => {
          this.closeModal();
          this.loadData();
        }
      });
    } else {
      this.ecoleApi.create(payload).subscribe({
        next: () => {
          this.closeModal();
          this.loadData();
        }
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedId = null;
  }

  confirmDelete(ecole: Ecole): void {
    this.ecoleToDelete = ecole;
    this.showDeleteConfirm = true;
  }

  deleteEcole(): void {
    if (this.ecoleToDelete) {
      this.ecoleApi.delete(this.ecoleToDelete.id).subscribe({
        next: () => {
          this.ecoleToDelete = null;
          this.showDeleteConfirm = false;
          this.loadData();
        }
      });
    }
  }

  cancelDelete(): void {
    this.ecoleToDelete = null;
    this.showDeleteConfirm = false;
  }

  private emptyForm(): Omit<Ecole, 'id'> {
    return {
      nom: '',
      sigle: '',
      universite: '',
      region: '',
      adresse: '',
      filieres: []
    };
  }
}