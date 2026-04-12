import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demarches',
  imports: [CommonModule, FormsModule],
  templateUrl: './demarches.component.html',
  styleUrl: './demarches.component.css'
})
export class DemarchesComponent {
  types = [
    'Attestation de scolarité',
    'Relevé de notes',
    'Certificat de résidence',
    'Demande de bourse',
    'Autre',
  ];

  typeChoisi = '';
  fichierNom = '';
  messageSucces = '';

  demandes = [
    { type: 'Attestation de scolarité', date: '01/04/2025', statut: 'valide' },
    { type: 'Relevé de notes',          date: '15/03/2025', statut: 'en_attente' },
  ];

  onFile(event: any) {
    const file = event.target.files[0];
    if (file) this.fichierNom = file.name;
  }

  envoyer() {
    if (!this.typeChoisi) return;
    this.demandes.unshift({
      type: this.typeChoisi,
      date: new Date().toLocaleDateString('fr-FR'),
      statut: 'en_attente',
    });
    this.messageSucces = 'Votre demande a été envoyée avec succès !';
    this.typeChoisi = '';
    this.fichierNom = '';
    setTimeout(() => this.messageSucces = '', 3000);
  }

  getStatutLabel(s: string): string {
    const labels: any = { en_attente: 'En attente', valide: 'Validé', refuse: 'Refusé' };
    return labels[s] || s;
  }
}