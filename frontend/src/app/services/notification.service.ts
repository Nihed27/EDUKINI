import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notification {
  id?: number;
  message: string;
  type: 'COMPATIBILITE' | 'MATIERE' | 'RAPPEL';
  lu: boolean;
  dateEnvoi: string;
  etudiantId: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8081/api/notifications';

  constructor(private http: HttpClient) { }

  getByEtudiant(etudiantId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/${etudiantId}`);
  }

  marquerLu(id: number): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrl}/${id}/lu`, {});
  }

  marquerToutLu(etudiantId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/tout-marquer-lu/${etudiantId}`, {});
  }

  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
