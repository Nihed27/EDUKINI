import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enicarthage-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enicarthage-accueil.component.html',
  styleUrl: './enicarthage-accueil.component.css'
})
export class EnicarthageAccueilComponent {
  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }
}