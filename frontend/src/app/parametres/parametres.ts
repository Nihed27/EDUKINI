import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './parametres.html',
  styleUrl: './parametres.css'
})
export class ParametresComponent implements OnInit {
 
  activeSection: string = 'general';
  profilMessage = '';
 
  config = {
    langue: 'fr',
    timezone: 'Africa/Tunis',
    dateFormat: 'DD/MM/YYYY',
    nomPlateforme: 'Edukini'
  };
 

  profil = {
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    motDePasse: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProfilFromApi();
  }

  private loadProfilFromApi(): void {
    this.authService.loadConnectedProfile().subscribe({
      next: (u) => {
        if (!u) {
          this.profil.email = this.authService.getStoredEmail() || '';
          return;
        }
        this.profil.prenom = u.prenom || '';
        this.profil.nom = u.nom || '';
        this.profil.email = u.email || '';
      },
      error: () => {
        this.profil.email = this.authService.getStoredEmail() || '';
      }
    });
  }
 
  setSection(section: string): void {
    this.activeSection = section;
    if (section === 'profil') {
      this.loadProfilFromApi();
    }
  }
 
  saveConfig(): void {
    alert('Configuration enregistrée avec succès !');
  }
 

  saveProfil(): void {
    this.profilMessage = '';
    if (!this.profil.prenom?.trim() || !this.profil.nom?.trim()) {
      this.profilMessage = 'Renseignez le prénom et le nom.';
      return;
    }
    if (!this.authService.getStoredEmail()) {
      this.profilMessage = 'Session invalide: reconnectez-vous.';
      return;
    }
    this.authService.saveProfileNames(this.profil.prenom.trim(), this.profil.nom.trim()).subscribe({
      next: (u) => {
        this.profil.prenom = u.prenom || '';
        this.profil.nom = u.nom || '';
        this.profilMessage = 'Profil enregistré.';
        setTimeout(() => (this.profilMessage = ''), 4000);
      },
      error: () => {
        this.profilMessage = "Impossible d'enregistrer. Vérifiez la connexion au serveur.";
      }
    });
  }
}