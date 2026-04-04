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

  permissions = [
    { role: 'Admin',    label: 'admin',  accesTotal: true,  gestionEtudiants: true,  gestionEcoles: true,  statistiques: true  },
    { role: 'Éditeur',  label: 'editor', accesTotal: false, gestionEtudiants: true,  gestionEcoles: false, statistiques: true  },
    { role: 'Lecteur',  label: 'viewer', accesTotal: false, gestionEtudiants: false, gestionEcoles: false, statistiques: true  },
  ];

  sauvegardes = [
    { nom: 'Sauvegarde automatique',   date: "Aujourd'hui à 03:00",  statut: 'success' },
    { nom: 'Sauvegarde manuelle',      date: 'Hier à 14:32',         statut: 'success' },
    { nom: 'Sauvegarde hebdomadaire',  date: '28/03/2025 à 03:00',   statut: 'success' },
  ];

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

  lancerSauvegarde(): void {
    const now = new Date();
    const heure = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    this.sauvegardes.unshift({
      nom: 'Sauvegarde manuelle',
      date: `Aujourd'hui à ${heure}`,
      statut: 'success'
    });
    alert('Sauvegarde lancée avec succès !');
  }
}
 