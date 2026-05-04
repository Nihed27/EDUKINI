import { Component, OnInit } from '@angular/core';
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
export class EnicarthageAccueilComponent implements OnInit {
  user: ConnectedUser | null = null;
  notifOpen = false;
  notifications: any[] = [];
  ouvert: number | null = null;
  onglet: { [key: number]: string } = {};

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
      if (this.user) {
        this.loadNotifications();
      }
    });
  }

  loadNotifications() {
    if (!this.user) return;
    this.notificationService.getByEtudiant(this.user.id).subscribe({
      next: (data) => { this.notifications = data.map(n => this.mapNotification(n)); },
      error: (err) => console.error("Erreur notifications", err)
    });
  }

  private mapNotification(n: Notification) {
    let icon = "bell", color = "#f59e0b", bg = "rgba(245,158,11,0.1)";
    if (n.type === "COMPATIBILITE") { icon = "user"; color = "#2563eb"; bg = "rgba(37,99,235,0.1)"; }
    else if (n.type === "MATIERE") { icon = "monitor"; color = "#8b5cf6"; bg = "rgba(139,92,246,0.1)"; }
    return { id: n.id, unread: !n.lu, time: this.formatDate(n.dateEnvoi), msg: n.message, color, bg, icon };
  }

  private formatDate(dateStr: string): string {
    const diffMins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (diffMins < 60) return "Il y a " + diffMins + " minutes";
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return "Il y a " + diffHours + " heures";
    return new Date(dateStr).toLocaleDateString();
  }

  get unreadCount(): number { return this.notifications.filter(n => n.unread).length; }
  toggleNotif() { this.notifOpen = !this.notifOpen; }
  
  markRead(id: number) {
    this.notificationService.marquerLu(id).subscribe({ next: () => this.loadNotifications() });
  }

  clearAll() {
    if (!this.user) return;
    this.notificationService.marquerToutLu(this.user.id).subscribe({
      next: () => { this.loadNotifications(); this.notifOpen = false; }
    });
  }

  toggle(i: number) { this.ouvert = this.ouvert === i ? null : i; if (!this.onglet[i]) this.onglet[i] = "programme"; }
  setOnglet(i: number, o: string) { this.onglet[i] = o; }
  navigate(path: string) { this.router.navigate([path]); }
  goTo(path: string) { this.router.navigate([path]); }
}
