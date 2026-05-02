import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ecole } from './ecole.model';
import { EcoleService } from './ecole.service';

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

  constructor(private ecoleService: EcoleService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.ecoles = this.ecoleService.getAll();
    this.regions = this.ecoleService.getRegions();
    this.universites = this.ecoleService.getUniversites();
    this.allFilieres = this.ecoleService.getAllFilieres();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredEcoles = this.ecoleService.search(
      this.searchTerm, this.filterRegion, this.filterFiliere
    );
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
    if (this.isEditMode && this.selectedId !== null) {
      this.ecoleService.update(this.selectedId, this.formData);
    } else {
      this.ecoleService.add(this.formData);
    }
    this.closeModal();
    this.loadData();
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
      this.ecoleService.delete(this.ecoleToDelete.id);
      this.ecoleToDelete = null;
      this.showDeleteConfirm = false;
      this.loadData();
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