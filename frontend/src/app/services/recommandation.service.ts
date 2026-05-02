import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recommandation {
  id?: number;
  specialite: string;
  ecole: string;
  score: number;
  placesDisponibles: number;
  rangMinimum: number;
  etudiantId: number;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecommandationService {
  private apiUrl = 'http://localhost:8081/api/recommandations';

  constructor(private http: HttpClient) { }

  getByEtudiant(etudiantId: number): Observable<Recommandation[]> {
    return this.http.get<Recommandation[]>(`${this.apiUrl}/${etudiantId}`);
  }

  calculerRecommandations(etudiantId: number): Observable<Recommandation[]> {
    return this.http.post<Recommandation[]>(`${this.apiUrl}/calculer/${etudiantId}`, {});
  }

  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
