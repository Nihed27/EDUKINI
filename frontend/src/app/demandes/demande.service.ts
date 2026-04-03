import { Injectable } from '@angular/core';
import { Demande } from './demande.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private demandes: Demande[] = [
    { id: 1, numeroInscription: 'INS-2024-001', nomEtudiant: 'Ben Ali', prenomEtudiant: 'Amir', typeDemande: 'Attestation de scolarité', dateDemande: '2024-01-10', statut: 'approuvee', commentaire: '' },
    { id: 2, numeroInscription: 'INS-2024-002', nomEtudiant: 'Chaabane', prenomEtudiant: 'Lina', typeDemande: 'Relevé de notes', dateDemande: '2024-01-12', statut: 'en_attente', commentaire: '' },
    { id: 3, numeroInscription: 'INS-2024-003', nomEtudiant: 'Mansouri', prenomEtudiant: 'Yassine', typeDemande: 'Certificat de présence', dateDemande: '2024-01-15', statut: 'rejetee', commentaire: 'Dossier incomplet' },
    { id: 4, numeroInscription: 'INS-2024-004', nomEtudiant: 'Trabelsi', prenomEtudiant: 'Nour', typeDemande: 'Demande de transfert', dateDemande: '2024-01-18', statut: 'en_attente', commentaire: '' },
    { id: 5, numeroInscription: 'INS-2024-005', nomEtudiant: 'Bouaziz', prenomEtudiant: 'Sami', typeDemande: 'Attestation de scolarité', dateDemande: '2024-01-20', statut: 'approuvee', commentaire: '' },
    { id: 6, numeroInscription: 'INS-2024-006', nomEtudiant: 'Hamdi', prenomEtudiant: 'Ines', typeDemande: 'Relevé de notes', dateDemande: '2024-01-22', statut: 'en_attente', commentaire: '' },
    { id: 7, numeroInscription: 'INS-2024-007', nomEtudiant: 'Gharbi', prenomEtudiant: 'Rami', typeDemande: 'Bourse', dateDemande: '2024-01-25', statut: 'rejetee', commentaire: 'Non éligible' },
    { id: 8, numeroInscription: 'INS-2024-008', nomEtudiant: 'Ayari', prenomEtudiant: 'Salma', typeDemande: 'Certificat de présence', dateDemande: '2024-01-28', statut: 'approuvee', commentaire: '' },
  ];

  private nextId = 9;

  getAll(): Demande[] {
    return [...this.demandes];
  }

  getById(id: number): Demande | undefined {
    return this.demandes.find(d => d.id === id);
  }

  add(demande: Omit<Demande, 'id'>): Demande {
    const newDemande: Demande = { ...demande, id: this.nextId++ };
    this.demandes.push(newDemande);
    return newDemande;
  }

  update(id: number, data: Omit<Demande, 'id'>): Demande | null {
    const index = this.demandes.findIndex(d => d.id === id);
    if (index === -1) return null;
    this.demandes[index] = { id, ...data };
    return this.demandes[index];
  }

  updateStatut(id: number, statut: 'en_attente' | 'approuvee' | 'rejetee', commentaire: string): Demande | null {
    const index = this.demandes.findIndex(d => d.id === id);
    if (index === -1) return null;
    this.demandes[index].statut = statut;
    this.demandes[index].commentaire = commentaire;
    return this.demandes[index];
  }

  delete(id: number): boolean {
    const index = this.demandes.findIndex(d => d.id === id);
    if (index === -1) return false;
    this.demandes.splice(index, 1);
    return true;
  }

  search(term: string, type: string, statut: string, date: string): Demande[] {
    return this.demandes.filter(d => {
      const matchTerm = !term.trim() ||
        d.nomEtudiant.toLowerCase().includes(term.toLowerCase()) ||
        d.prenomEtudiant.toLowerCase().includes(term.toLowerCase()) ||
        d.numeroInscription.toLowerCase().includes(term.toLowerCase());
      const matchType = !type || d.typeDemande === type;
      const matchStatut = !statut || d.statut === statut;
      const matchDate = !date || d.dateDemande === date;
      return matchTerm && matchType && matchStatut && matchDate;
    });
  }

  getTypes(): string[] {
    return [...new Set(this.demandes.map(d => d.typeDemande))].sort();
  }
}