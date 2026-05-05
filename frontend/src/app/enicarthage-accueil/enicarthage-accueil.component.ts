import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService, Notification } from '../services/notification.service';
import { AuthService, ConnectedUser } from '../services/auth.service';

@Component({
  selector: "app-enicarthage-accueil",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./enicarthage-accueil.component.html",
  styleUrl: "./enicarthage-accueil.component.css"
})
export class EnicarthageAccueilComponent implements OnInit, OnDestroy {
  user: ConnectedUser | null = null;
  notifOpen = false;
  notifications: Notification[] = [];
  ouvert: number | null = null;
  onglet: { [key: number]: string } = {};
  private pollingInterval: any;

  specialites = [
    {
      sigle: "GL", couleur: "blue", places: 40, duree: "3 ans",
      langue: "Français / Anglais", compatibilite: 88, niveau: "Bac+5",
      nom: "Génie Logiciel et Systèmes Informatiques",
      description: "Conception et développement de logiciels complexes.",
      matieres: ["Algorithmique avancée","Architecture logicielle","Cloud computing & DevOps"],
      debouches: ["Développeur logiciel senior","Architecte SI","Ingénieur DevOps"],
      competences: ["Java / Spring","Angular / React","Docker / Kubernetes"],
      salaire: "1 500 – 3 500 TND/mois", taux_insertion: "94%",
      partenaires: ["Microsoft","IBM","Vermeg"]
    },
    {
      sigle: "RSC", couleur: "purple", places: 35, duree: "3 ans",
      langue: "Français / Anglais", compatibilite: 72, niveau: "Bac+5",
      nom: "Réseaux et Systèmes de Communication",
      description: "Infrastructure réseau, protocoles de communication.",
      matieres: ["Protocoles réseau avancés","Cybersécurité","Cloud AWS / Azure"],
      debouches: ["Ingénieur réseau","Expert cybersécurité","Consultant cloud"],
      competences: ["Cisco / Juniper","Linux","AWS / Azure"],
      salaire: "1 400 – 3 200 TND/mois", taux_insertion: "91%",
      partenaires: ["Cisco","Orange","Tunisie Telecom"]
    },
    {
      sigle: "ESE", couleur: "orange", places: 30, duree: "3 ans",
      langue: "Français / Anglais", compatibilite: 65, niveau: "Bac+5",
      nom: "Électronique et Systèmes Embarqués",
      description: "Conception de circuits électroniques, IoT.",
      matieres: ["Systèmes embarqués (ARM, STM32)","FPGA & VHDL","IoT"],
      debouches: ["Ingénieur embarqué","Ingénieur IoT","Ingénieur R&D"],
      competences: ["C / C++ embarqué","VHDL / Verilog","Arduino"],
      salaire: "1 600 – 4 000 TND/mois", taux_insertion: "89%",
      partenaires: ["STMicroelectronics","Valeo","Leoni"]
    }
  ];

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.loadConnectedProfile().subscribe();
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.loadNotifications();
    // Polling toutes les 30 secondes
    this.pollingInterval = setInterval(() => this.loadNotifications(), 30000);
  }

  ngOnDestroy(): void {
    if (this.pollingInterval) clearInterval(this.pollingInterval);
  }

  loadNotifications() {
    this.notificationService.getAll().subscribe({
      next: (data) => { this.notifications = data; },
      error: (err) => console.error("Erreur notifications", err)
    });
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.lu).length;
  }

  toggleNotif() { this.notifOpen = !this.notifOpen; }

  markRead(id: number) {
    this.notificationService.marquerLu(id).subscribe({
      next: () => this.loadNotifications()
    });
  }

  clearAll() {
    // Marquer toutes les notifications non lues comme lues
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
    if (diffMins < 60) return "Il y a " + diffMins + " min";
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return "Il y a " + diffHours + "h";
    return new Date(dateStr).toLocaleDateString('fr-FR');
  }

  toggle(i: number) { this.ouvert = this.ouvert === i ? null : i; if (!this.onglet[i]) this.onglet[i] = "programme"; }
  setOnglet(i: number, o: string) { this.onglet[i] = o; }
  navigate(path: string) { this.router.navigate([path]); }
  goTo(path: string) { this.router.navigate([path]); }
}
