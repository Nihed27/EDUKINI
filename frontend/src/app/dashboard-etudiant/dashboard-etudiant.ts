import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-etudiant',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-etudiant.html',
  styleUrl: './dashboard-etudiant.css'
})
export class DashboardEtudiantComponent implements OnInit {
  sidebarOpen = false;
  userName = 'Amira Khaled';
  userInitials = 'AK';

  stats = {
    ecoles: 12,
    candidatures: 5,
    acceptees: 2,
    entretiens: 1
  };

  ecolesRecommandees = [
    { nom: 'ENICarthage', specialite: 'Génie Informatique', ville: 'Tunis', rating: 4.8, color: '#1a73e8' },
    { nom: 'INSAT', specialite: 'Génie Logiciel', ville: 'Tunis', rating: 4.6, color: '#34a853' },
    { nom: 'ENIT', specialite: 'Génie Civil', ville: 'Tunis', rating: 4.5, color: '#f9ab00' }
  ];

  candidatures = [
    { ecole: 'ENICarthage', filiere: 'Génie Informatique', date: '2026-04-28', statut: 'en_cours' },
    { ecole: 'INSAT', filiere: 'Génie Logiciel', date: '2026-04-25', statut: 'acceptee' },
    { ecole: 'ENIT', filiere: 'Génie Civil', date: '2026-04-20', statut: 'refusee' },
    { ecole: 'ENSI', filiere: 'Informatique', date: '2026-04-18', statut: 'en_cours' }
  ];

  private apiUrl = 'http://localhost:8081/api';

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Load real data from API if available
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getStatutLabel(statut: string): string {
    const map: Record<string, string> = {
      en_cours: 'En cours',
      acceptee: 'Acceptée',
      refusee: 'Refusée'
    };
    return map[statut] || statut;
  }

  getStatutClass(statut: string): string {
    const map: Record<string, string> = {
      en_cours: 'status-pending',
      acceptee: 'status-accepted',
      refusee: 'status-rejected'
    };
    return map[statut] || '';
  }

  logout() {
    this.router.navigate(['/']);
  }
}
