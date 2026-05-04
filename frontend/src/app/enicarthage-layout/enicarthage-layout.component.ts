import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, ConnectedUser } from '../services/auth.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-enicarthage-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './enicarthage-layout.component.html',
  styleUrl: './enicarthage-layout.component.css'
})
export class EnicarthageLayoutComponent implements OnInit {
  user: ConnectedUser | null = null;
  initials: string = 'U';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loadConnectedProfile().subscribe();
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.initials = `${user.prenom.charAt(0)}${user.nom.charAt(0)}`.toUpperCase();
      }
    });
  }
}