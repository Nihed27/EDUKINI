import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postlicence-programmes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postlicence-programmes.component.html',
  styleUrl: './postlicence-programmes.component.css'
})
export class PostlicenceProgrammesComponent {

  activeTab = 'master';

  masters = [
    {
      id: 'tic', sigle: 'TIC', couleur: 'blue', type: 'Recherche', duree: '2 ans',
      nom: 'Master TIC — Réseaux et Multimédia',
      shortDesc: 'Formation de haut niveau en réseaux informatiques, systèmes multimédias et technologies de l\'information.'
    },
    {
      id: 'eea', sigle: 'EEA', couleur: 'violet', type: 'Recherche', duree: '2 ans',
      nom: 'Master ARTI/WESET — Automatique, Robotique & Wind Energy',
      shortDesc: 'Deux parcours : ARTI (Automatique & Robotique) et WESET (Wind Energy Sciences & Technologies).'
    },
    {
      id: 'mpsdm', sigle: 'SDM', couleur: 'orange', type: 'Professionnel', duree: '2 semestres',
      nom: 'Master MPSDM — Sciences des Données & Mobiquité',
      shortDesc: 'Master co-construit avec IBM et l\'UVT. Formation Big Data, IA, Cloud et applications mobiles.'
    }
  ];

  doctorats = [
    {
      id: 'doctorat', sigle: 'PhD', couleur: 'indigo', type: 'Doctorat', duree: '3 à 5 ans',
      nom: 'Doctorat en Génie Électrique',
      shortDesc: 'Unique programme doctoral d\'ENICarthage : Traitement du Signal, Systèmes Électriques, Automatique et Microélectronique.'
    }
  ];

  constructor(private router: Router) {}

  goToDetail(id: string) {
    this.router.navigate(['/postlicence/programme', id]);
  }
}
