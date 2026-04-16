import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './parametres.html',
  styleUrl: './parametres.css'
})
export class ParametresComponent {
 
  activeSection: string = 'general';
 
  config = {
    langue: 'fr',
    timezone: 'Africa/Tunis',
    dateFormat: 'DD/MM/YYYY',
    nomPlateforme: 'Edukini'
  };
 
  securite = {
    doubleAuth: false,
    sessionTimeout: '30',
    motDePasseMinLength: '8',
    historiqueMdp: false
  };
 
  notifications = {
    emailNouvelEtudiant: true,
    emailDemande: true,
    emailStatistiques: false,
    smsAlertes: false
  };
 
  profil = {
    prenom: 'Mehdi',
    nom: 'Ben Ali',
    email: 'admin@edukini.tn',
    telephone: '',
    motDePasse: ''
  };
 
  setSection(section: string): void {
    this.activeSection = section;
  }
 
  saveConfig(): void {
    alert('Configuration enregistrée avec succès !');
  }
 
  saveSecurite(): void {
    alert('Paramètres de sécurité enregistrés !');
  }
 
  saveNotifications(): void {
    alert('Préférences de notifications enregistrées !');
  }
 
  saveProfil(): void {
    alert('Profil mis à jour avec succès !');
  }
}