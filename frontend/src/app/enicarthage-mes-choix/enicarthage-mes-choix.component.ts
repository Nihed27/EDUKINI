import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enicarthage-mes-choix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enicarthage-mes-choix.component.html',
  styleUrl: './enicarthage-mes-choix.component.css'
})
export class EnicarthageMesChoixComponent {
  constructor(private router: Router) {}

  choix = [
    { rang: 1, sigle: 'GL',  nom: 'Génie Logiciel et Systèmes Informatiques', score: 88, statut: 'en_attente' },
    { rang: 2, sigle: 'RSC', nom: 'Réseaux et Systèmes de Communication',     score: 75, statut: 'en_attente' },
  ];

  getStatutLabel(s: string) {
    const map: any = { en_attente: 'En attente', confirme: 'Confirmé', refuse: 'Refusé' };
    return map[s] || s;
  }

  ajouterChoix() {
    this.router.navigate(['/enicarthage/recommandations']);
  }
}