import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidatures',
  imports: [CommonModule],
  templateUrl: './candidatures.component.html',
  styleUrl: './candidatures.component.css'
})
export class CandidaturesComponent {
  candidatures: any[] = [
    // Décommenter pour tester :
    // { filiere: 'Réseaux et télécommunications', ecole: "SUP'COM", date: '10/04/2025', statut: 'en_attente' },
    // { filiere: 'Intelligence artificielle', ecole: 'INSAT', date: '08/04/2025', statut: 'accepte' },
  ];

  getStatutLabel(s: string): string {
    const labels: any = {
      en_attente: 'En attente',
      accepte: 'Accepté',
      refuse: 'Refusé',
    };
    return labels[s] || s;
  }
}