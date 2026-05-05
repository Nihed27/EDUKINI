import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, ConnectedUser } from '../services/auth.service';

@Component({
  selector: 'app-postlicence-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './postlicence-layout.component.html',
  styleUrl: './postlicence-layout.component.css'
})
export class PostlicenceLayoutComponent implements OnInit {
  user: ConnectedUser | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loadConnectedProfile().subscribe(profile => {
      this.user = profile;
    });
  }

  get initials(): string {
    if (!this.user) return 'ET';
    const first = this.user.prenom?.charAt(0) || '';
    const last = this.user.nom?.charAt(0) || '';
    return (first + last).toUpperCase() || 'ET';
  }
}
