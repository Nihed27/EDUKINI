import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BackendProfilCandidat {
  id?: number;
  etudiantId: number;
  licence: string;
  specialite: string;
  moyenne: number;
  niveauAnglais: string;
  competences: string;
  motivation: string;
}

@Injectable({ providedIn: 'root' })
export class ProfilCandidatApiService {
  private baseUrl = '/api/profil-candidat';

  constructor(private http: HttpClient) {}

  getByEtudiantId(etudiantId: number): Observable<BackendProfilCandidat> {
    return this.http.get<BackendProfilCandidat>(`${this.baseUrl}/${etudiantId}`);
  }

  create(profil: BackendProfilCandidat): Observable<BackendProfilCandidat> {
    return this.http.post<BackendProfilCandidat>(this.baseUrl, profil);
  }

  update(etudiantId: number, profil: BackendProfilCandidat): Observable<BackendProfilCandidat> {
    return this.http.put<BackendProfilCandidat>(`${this.baseUrl}/${etudiantId}`, profil);
  }
}
