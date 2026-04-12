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

  recommandations = [
    {
      rang: 1, sigle: 'GL', niveau: 'tres_recommande', score: 88,
      nom: 'Génie Logiciel et Systèmes Informatiques',
      description: 'Conception de logiciels complexes, architecture des systèmes, génie logiciel agile et DevOps.',
      matieresCles: ['Algorithmique', 'POO', 'Bases de données'],
      debouches: ['Développeur logiciel', 'Architecte SI', 'Chef de projet IT'],
      places: 40,
      raison: 'Vos excellentes notes en algorithmique (17/20) et POO (16/20) correspondent parfaitement aux exigences de cette spécialité.'
    },
    {
      rang: 2, sigle: 'RSC', niveau: 'recommande', score: 75,
      nom: 'Réseaux et Systèmes de Communication',
      description: 'Infrastructure réseau, protocoles de communication, sécurité des systèmes et cloud computing.',
      matieresCles: ['Réseaux', 'Systèmes', 'Électronique'],
      debouches: ['Ingénieur réseau', 'Administrateur systèmes', 'Expert cybersécurité'],
      places: 35,
      raison: 'Vos bases solides en systèmes (15/20) et électronique (14/20) vous donnent un bon profil pour cette filière.'
    },
    {
      rang: 3, sigle: 'ESE', niveau: 'peu_recommande', score: 58,
      nom: 'Électronique et Systèmes Embarqués',
      description: 'Conception de circuits électroniques, systèmes temps réel, IoT et systèmes embarqués critiques.',
      matieresCles: ['Électronique analogique', 'Physique', 'Signal'],
      debouches: ['Ingénieur embarqué', 'Concepteur FPGA', 'Ingénieur IoT'],
      places: 30,
      raison: 'Cette spécialité nécessite de fortes bases en électronique et physique. Un renforcement dans ces matières est conseillé.'
    }
  ];

  choisir(spec: any) {
    this.router.navigate(['/enicarthage/mes-choix']);
  }
}