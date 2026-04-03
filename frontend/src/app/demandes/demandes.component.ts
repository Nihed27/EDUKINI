import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Demande } from './demande.model';
import { DemandeService } from './demande.service';

@Component({
  selector: 'app-demandes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './demandes.component.html',
  styleUrl: './demandes.component.css'
})
export class DemandesComponent implements OnInit {

  demandes: Demande[] = [];
  filteredDemandes: Demande[] = [];
  types: string[] = [];

  searchTerm: string = '';
  filterType: string = '';
  filterStatut: string = '';
  filterDate: string = '';

  showModal: boolean = false;
  isEditMode: boolean = false;
  showDeleteConfirm: boolean = false;
  showStatutModal: boolean = false;

  demandeToDelete: Demande | null = null;
  demandeToStatut: Demande | null = null;
  selectedId: number | null = null;

  newStatut: 'en_attente' | 'approuvee' | 'rejetee' = 'en_attente';
  newCommentaire: string = '';

  formData: Omit<Demande, 'id'> = this.emptyForm();

  constructor(private demandeService: DemandeService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.demandes = this.demandeService.getAll();
    this.types = this.demandeService.getTypes();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredDemandes = this.demandeService.search(
      this.searchTerm, this.filterType, this.filterStatut, this.filterDate
    );
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filterType = '';
    this.filterStatut = '';
    this.filterDate = '';
    this.applyFilters();
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.formData = this.emptyForm();
    this.showModal = true;
  }

  openEditModal(demande: Demande): void {
    this.isEditMode = true;
    this.selectedId = demande.id;
    this.formData = {
      numeroInscription: demande.numeroInscription,
      nomEtudiant: demande.nomEtudiant,
      prenomEtudiant: demande.prenomEtudiant,
      typeDemande: demande.typeDemande,
      dateDemande: demande.dateDemande,
      statut: demande.statut,
      commentaire: demande.commentaire
    };
    this.showModal = true;
  }

  openStatutModal(demande: Demande): void {
    this.demandeToStatut = demande;
    this.newStatut = demande.statut;
    this.newCommentaire = demande.commentaire;
    this.showStatutModal = true;
  }

  saveStatut(): void {
    if (this.demandeToStatut) {
      this.demandeService.updateStatut(this.demandeToStatut.id, this.newStatut, this.newCommentaire);
      this.showStatutModal = false;
      this.demandeToStatut = null;
      this.loadData();
    }
  }

  closeStatutModal(): void {
    this.showStatutModal = false;
    this.demandeToStatut = null;
  }

  saveDemande(): void {
    if (this.isEditMode && this.selectedId !== null) {
      this.demandeService.update(this.selectedId, this.formData);
    } else {
      this.demandeService.add(this.formData);
    }
    this.closeModal();
    this.loadData();
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedId = null;
  }

  confirmDelete(demande: Demande): void {
    this.demandeToDelete = demande;
    this.showDeleteConfirm = true;
  }

  deleteDemande(): void {
    if (this.demandeToDelete) {
      this.demandeService.delete(this.demandeToDelete.id);
      this.demandeToDelete = null;
      this.showDeleteConfirm = false;
      this.loadData();
    }
  }

  cancelDelete(): void {
    this.demandeToDelete = null;
    this.showDeleteConfirm = false;
  }

  getStatutLabel(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'approuvee': return 'Approuvée';
      case 'rejetee': return 'Rejetée';
      default: return statut;
    }
  }

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'tag-attente';
      case 'approuvee': return 'tag-approuvee';
      case 'rejetee': return 'tag-rejetee';
      default: return '';
    }
  }

  countByStatut(statut: string): number {
    return this.demandes.filter(d => d.statut === statut).length;
  }

  private emptyForm(): Omit<Demande, 'id'> {
    return {
      numeroInscription: '',
      nomEtudiant: '',
      prenomEtudiant: '',
      typeDemande: '',
      dateDemande: new Date().toISOString().split('T')[0],
      statut: 'en_attente',
      commentaire: ''
    };
  }
}