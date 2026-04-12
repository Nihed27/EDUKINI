import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statut',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statut.component.html',
  styleUrl: './statut.component.css'
})
export class StatutComponent {
  selected: string = '';

  constructor(private router: Router) {}

  select(statut: string) {
    this.selected = statut;
  }

  continuer(statut: string) {
    if (statut === 'concours') {
      this.router.navigate(['/etudiant/accueil']);
    } else if (statut === 'enicarthage') {
      this.router.navigate(['/enicarthage/accueil']);
    }
  }
}