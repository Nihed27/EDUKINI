import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enicarthage-recommandations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enicarthage-recommandations.component.html',
  styleUrl: './enicarthage-recommandations.component.css'
})
export class EnicarthageRecommandationsComponent {
  constructor(private router: Router) {}

  specialites = [
    {
      sigle: 'IA',
      nom: 'Intelligence Artificielle',
      description: 'Formation approfondie en mathématiques, algorithmique, probabilités, machine learning et deep learning.',
      matieresCles: ['Mathématiques', 'Algorithmique', 'Probabilités'],
      debouches: ['Data Scientist', 'Ingénieur IA', 'Chercheur en IA'],
      places: 30
    },
    {
      sigle: 'SI',
      nom: 'Sécurité Informatique',
      description: 'Protection des systèmes d\'information, cryptographie, sécurité des réseaux, hacking éthique et architecture sécurisée.',
      matieresCles: ['Réseaux', 'Logique', 'Architecture'],
      debouches: ['Ingénieur Cybersécurité', 'Auditeur Sécurité', 'Architecte Sécurité'],
      places: 35
    },
    {
      sigle: 'GL',
      nom: 'Génie Logiciel',
      description: 'Conception de logiciels complexes, architecture des systèmes, génie logiciel agile, développement web et mobile.',
      matieresCles: ['Programmation', 'Bases de données', 'Conception'],
      debouches: ['Développeur Full-Stack', 'Architecte Logiciel', 'Chef de Projet IT'],
      places: 40
    }
  ];

  choisir(spec: any) {
    this.router.navigate(['/enicarthage/mes-choix']);
  }
}