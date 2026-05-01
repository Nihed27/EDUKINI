import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statut-etudiant',
  imports: [CommonModule],
  templateUrl: './statut-etudiant.html',
  styleUrl: './statut-etudiant.css',
})
export class StatutEtudiant {
  constructor(private router: Router) {}

  goConcours() {
    this.router.navigate(['/dashboard-etudiant']);
  }

  goEnicarthage() {
    this.router.navigate(['/enicarthage']);
  }
}