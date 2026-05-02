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

  notifOpen = false;

  notifications = [
    {
      id: 1, unread: true, time: 'Il y a 10 minutes',
      msg: 'Votre compatibilité GL a été mise à jour : 88%',
      color: '#2563eb', bg: 'rgba(37,99,235,0.1)',
      icon: 'user'
    },
    {
      id: 2, unread: true, time: 'Il y a 2 heures',
      msg: 'Nouvelle matière ajoutée en RSC : Cloud AWS / Azure',
      color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)',
      icon: 'monitor'
    },
    {
      id: 3, unread: true, time: 'Hier à 18h30',
      msg: 'Rappel : complétez votre profil pour de meilleures recommandations',
      color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',
      icon: 'bell'
    }
  ];

  specialites = [
    {
      sigle: 'GL', couleur: 'blue', places: 40, duree: '3 ans', langue: 'Français / Anglais',
      compatibilite: 88, niveau: 'Bac+5',
      nom: 'Génie Logiciel et Systèmes Informatiques',
      description: "Conception et développement de logiciels complexes, architecture des systèmes d'information, méthodes agiles et DevOps.",
      matieres: ['Algorithmique avancée','Architecture logicielle','Bases de données avancées','Génie logiciel & méthodes agiles','Cloud computing & DevOps','Intelligence artificielle','Sécurité applicative'],
      debouches: ['Développeur logiciel senior','Architecte SI','Chef de projet IT','Ingénieur DevOps','Lead Developer'],
      competences: ['Java / Spring','Angular / React','Docker / Kubernetes','CI/CD','Microservices'],
      salaire: '1 500 – 3 500 TND/mois', taux_insertion: '94%',
      partenaires: ['Microsoft','IBM','Vermeg','Sopra HR']
    },
    {
      sigle: 'RSC', couleur: 'purple', places: 35, duree: '3 ans', langue: 'Français / Anglais',
      compatibilite: 72, niveau: 'Bac+5',
      nom: 'Réseaux et Systèmes de Communication',
      description: 'Infrastructure réseau, protocoles de communication, sécurité des systèmes, cloud et virtualisation.',
      matieres: ['Protocoles réseau avancés','Sécurité & cryptographie','Virtualisation & SDN','Administration systèmes','Télécommunications & 5G','Cybersécurité','Cloud AWS / Azure'],
      debouches: ['Ingénieur réseau','Expert cybersécurité','Administrateur systèmes','Consultant cloud','Analyste SOC'],
      competences: ['Cisco / Juniper','Linux','Wireshark','AWS / Azure','Firewall / VPN'],
      salaire: '1 400 – 3 200 TND/mois', taux_insertion: '91%',
      partenaires: ['Cisco','Orange','Tunisie Telecom','Palo Alto']
    },
    {
      sigle: 'ESE', couleur: 'orange', places: 30, duree: '3 ans', langue: 'Français / Anglais',
      compatibilite: 65, niveau: 'Bac+5',
      nom: 'Électronique et Systèmes Embarqués',
      description: 'Conception de circuits électroniques, programmation embarquée, systèmes temps réel et IoT.',
      matieres: ['Électronique numérique & analogique','Systèmes embarqués (ARM, STM32)','FPGA & VHDL','IoT & protocoles sans fil','Traitement du signal','Systèmes temps réel (RTOS)','Robotique'],
      debouches: ['Ingénieur embarqué','Concepteur FPGA','Ingénieur IoT','Ingénieur R&D','Ingénieur en robotique'],
      competences: ['C / C++ embarqué','VHDL / Verilog','Arduino / Raspberry Pi','MATLAB','ROS'],
      salaire: '1 600 – 4 000 TND/mois', taux_insertion: '89%',
      partenaires: ['STMicroelectronics','Valeo','Leoni','Texas Instruments']
    }
  ];

  ouvert: number | null = null;
  onglet: { [key: number]: string } = {};

  get unreadCount(): number {
    return this.notifications.filter(n => n.unread).length;
  }

  toggleNotif() {
    this.notifOpen = !this.notifOpen;
  }

  markRead(id: number) {
    const n = this.notifications.find(n => n.id === id);
    if (n) n.unread = false;
  }

  clearAll() {
    this.notifications.forEach(n => n.unread = false);
    this.notifOpen = false;
  }

  toggle(i: number) {
    this.ouvert = this.ouvert === i ? null : i;
    if (!this.onglet[i]) this.onglet[i] = 'programme';
  }

  setOnglet(i: number, o: string) {
    this.onglet[i] = o;
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}