import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notification {
  id?: number;
  titre: string;
  message: string;
  cible: string;
  lu: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8081/api/notifications';

  constructor(private http: HttpClient) {}

  /** POST /api/notifications — Créer une notification (admin) */
  creer(notification: { titre: string; message: string }): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, notification);
  }

  /** GET /api/notifications — Récupérer toutes les notifications */
  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  /** PUT /api/notifications/{id}/lu — Marquer comme lue */
  marquerLu(id: number): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrl}/${id}/lu`, {});
  }

  /** GET /api/notifications/count — Nombre de non lues */
  countNonLues(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}
