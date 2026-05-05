import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService, Notification } from '../services/notification.service';

@Component({
  selector: 'app-postlicence-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postlicence-accueil.component.html',
  styleUrl: './postlicence-accueil.component.css'
})
export class PostlicenceAccueilComponent implements OnInit, OnDestroy {
  notifOpen = false;
  notifications: Notification[] = [];
  private pollingInterval: any;

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
    // Polling toutes les 30 secondes
    this.pollingInterval = setInterval(() => this.loadNotifications(), 30000);
  }

  ngOnDestroy(): void {
    if (this.pollingInterval) clearInterval(this.pollingInterval);
  }

  loadNotifications(): void {
    this.notificationService.getAll().subscribe({
      next: (data) => { this.notifications = data; },
      error: (err) => console.error('Erreur notifications', err)
    });
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.lu).length;
  }

  toggleNotif(): void { this.notifOpen = !this.notifOpen; }

  markRead(id: number): void {
    this.notificationService.marquerLu(id).subscribe({
      next: () => this.loadNotifications()
    });
  }

  clearAll(): void {
    const unread = this.notifications.filter(n => !n.lu);
    unread.forEach(n => {
      if (n.id) {
        this.notificationService.marquerLu(n.id).subscribe();
      }
    });
    setTimeout(() => {
      this.loadNotifications();
      this.notifOpen = false;
    }, 500);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const diffMins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return 'Il y a ' + diffMins + ' min';
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return 'Il y a ' + diffHours + 'h';
    return new Date(dateStr).toLocaleDateString('fr-FR');
  }

  goToProgrammes(): void {
    this.router.navigate(['/postlicence/programmes']);
  }
}
