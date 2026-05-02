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

  notifOpen = false;

  notifications = [
    { id: 1, unread: true, time: 'Il y a 30 min',
      msg: 'Nouvelle session d\'inscription ouverte — Master MPSDM 2024/2025',
      color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    { id: 2, unread: true, time: 'Il y a 3 heures',
      msg: 'Journée portes ouvertes ENICarthage — Masters & Doctorat le 15 mai',
      color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
    { id: 3, unread: false, time: 'Hier à 14h00',
      msg: 'Date limite dépôt dossier Master EEA — 30 mai 2025',
      color: '#2563eb', bg: 'rgba(37,99,235,0.1)' }
  ];

  get unreadCount(): number { return this.notifications.filter(n => n.unread).length; }
  toggleNotif() { this.notifOpen = !this.notifOpen; }
  markRead(id: number) { const n = this.notifications.find(n => n.id === id); if (n) n.unread = false; }
  clearAll() { this.notifications.forEach(n => n.unread = false); this.notifOpen = false; }

  constructor(private router: Router) {}

  goToProgrammes() {
    this.router.navigate(['/postlicence/programmes']);
  }
}
