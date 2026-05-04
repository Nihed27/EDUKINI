import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postlicence-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postlicence-accueil.component.html',
  styleUrl: './postlicence-accueil.component.css'
})
export class PostlicenceAccueilComponent {


  constructor(private router: Router) {}

  goToProgrammes() {
    this.router.navigate(['/postlicence/programmes']);
  }
}
