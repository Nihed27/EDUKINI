import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enicarthage-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enicarthage-notifications.component.html',
  styleUrl: './enicarthage-notifications.component.css'
})
export class EnicarthageNotificationsComponent {
  notifications = [
    {
      type: 'info', lu: false, date: "Aujourd'hui",
      titre: 'Période de choix ouverte',
      message: "La période de sélection des spécialités est ouverte jusqu'au 30 juin 2025."
    },
    {
      type: 'success', lu: false, date: 'Hier',
      titre: 'Profil complété',
      message: 'Votre profil académique a été complété. Les recommandations IA sont maintenant disponibles.'
    },
    {
      type: 'warning', lu: true, date: 'Il y a 2 jours',
      titre: 'Date limite approche',
      message: 'Vous avez jusqu\'au 15 juin pour soumettre vos 3 choix de spécialités.'
    },
  ];

  marquerLu(n: any) { n.lu = true; }

  get nonLus() { return this.notifications.filter(n => !n.lu).length; }
}