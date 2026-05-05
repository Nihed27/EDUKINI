import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface BackendProfil {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  nomPrepa: string;
  telephone: string;
  rang: number | null;
  score: number | null;
  filiere: string;
  notes: { [matiere: string]: number };
  etudiantId?: number;
}

@Injectable({ providedIn: 'root' })
export class ProfilApiService {
  private baseUrl = `${environment.apiUrl}/api/profil`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<BackendProfil[]> {
    return this.http.get<BackendProfil[]>(this.baseUrl);
  }

  getByEtudiantId(etudiantId: number): Observable<BackendProfil> {
    return this.http.get<BackendProfil>(`${this.baseUrl}/etudiant/${etudiantId}`);
  }

  getById(id: number): Observable<BackendProfil> {
    return this.http.get<BackendProfil>(`${this.baseUrl}/${id}`);
  }

  create(profil: BackendProfil): Observable<BackendProfil> {
    return this.http.post<BackendProfil>(this.baseUrl, profil);
  }

  update(id: number, profil: BackendProfil): Observable<BackendProfil> {
    return this.http.put<BackendProfil>(`${this.baseUrl}/${id}`, profil);
  }

  updateByEtudiantId(etudiantId: number, profil: BackendProfil): Observable<BackendProfil> {
    return this.http.put<BackendProfil>(`${this.baseUrl}/etudiant/${etudiantId}`, profil);
  }
}
