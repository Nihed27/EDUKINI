import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enicarthage-specialites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enicarthage-specialites.component.html',
  styleUrl: './enicarthage-specialites.component.css'
})
export class EnicarthageSpecialitesComponent {
  specialites = [
    {
      sigle: 'GL', couleur: 'blue', places: 40, duree: '3 ans', langue: 'Français / Anglais',
      nom: 'Génie Logiciel et Systèmes Informatiques',
      description: "Conception et développement de logiciels complexes, architecture des systèmes d'information, méthodes agiles et DevOps.",
      matieres: ['Algorithmique avancée', 'Architecture logicielle', 'Bases de données', 'Génie logiciel', 'Cloud computing'],
      debouches: ['Développeur logiciel senior', 'Architecte SI', 'Chef de projet IT', 'Ingénieur DevOps'],
    },
    {
      sigle: 'RSC', couleur: 'purple', places: 35, duree: '3 ans', langue: 'Français / Anglais',
      nom: 'Réseaux et Systèmes de Communication',
      description: 'Infrastructure réseau, protocoles de communication, sécurité des systèmes, cloud et virtualisation.',
      matieres: ['Protocoles réseau', 'Sécurité informatique', 'Virtualisation', 'Administration systèmes', 'Télécommunications'],
      debouches: ['Ingénieur réseau', 'Expert cybersécurité', 'Administrateur systèmes', 'Consultant cloud'],
    },
    {
      sigle: 'ESE', couleur: 'orange', places: 30, duree: '3 ans', langue: 'Français / Anglais',
      nom: 'Électronique et Systèmes Embarqués',
      description: 'Conception de circuits électroniques, programmation embarquée, systèmes temps réel et IoT.',
      matieres: ['Électronique numérique', 'Systèmes embarqués', 'FPGA', 'IoT', 'Traitement du signal'],
      debouches: ['Ingénieur embarqué', 'Concepteur FPGA', 'Ingénieur IoT', 'Ingénieur R&D'],
    }
  ];

  ouvert: number | null = null;
  toggle(i: number) { this.ouvert = this.ouvert === i ? null : i; }
}